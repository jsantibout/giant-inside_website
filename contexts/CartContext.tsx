'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from 'react';
import { ShopifyCart } from '@/lib/types/shopify';
import {
  createCartAction,
  getCartAction,
  addToCartAction,
  updateCartAction,
  removeFromCartAction,
} from '@/lib/actions/cart';

interface CartContextType {
  cart: ShopifyCart | null;
  cartId: string | null;
  isLoading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
  addItem: (merchandiseId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_STORAGE_KEY = 'shopify_cart_id';
const CART_EXPIRY_STORAGE_KEY = 'shopify_cart_expiry';

// Cart expires after 7 days (Shopify default)
const CART_EXPIRY_DAYS = 7;

interface StoredCartData {
  cartId: string;
  expiresAt: number; // Unix timestamp in milliseconds
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Load cart ID from localStorage on mount
  useEffect(() => {
    const storedCartId = localStorage.getItem(CART_ID_STORAGE_KEY);
    const storedExpiry = localStorage.getItem(CART_EXPIRY_STORAGE_KEY);

    if (storedCartId && storedExpiry) {
      const expiresAt = parseInt(storedExpiry, 10);
      const now = Date.now();

      // Check if cart has expired
      if (now > expiresAt) {
        // Cart expired, clear it
        clearStoredCart();
        setIsLoading(false);
      } else {
        // Cart still valid, load it
        setCartId(storedCartId);
        loadCart(storedCartId);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  // Helper to clear stored cart data
  const clearStoredCart = () => {
    localStorage.removeItem(CART_ID_STORAGE_KEY);
    localStorage.removeItem(CART_EXPIRY_STORAGE_KEY);
    setCartId(null);
    setCart(null);
  };

  // Helper to save cart with expiration
  const saveCartWithExpiry = (newCartId: string) => {
    const expiresAt = Date.now() + (CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    localStorage.setItem(CART_ID_STORAGE_KEY, newCartId);
    localStorage.setItem(CART_EXPIRY_STORAGE_KEY, expiresAt.toString());
  };

  // Load cart data using server action
  const loadCart = async (id: string) => {
    try {
      const result = await getCartAction(id);
      if (result.success && result.cart) {
        setCart(result.cart);
      } else {
        // Cart not found or expired on server, clear it
        clearStoredCart();
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // On error, clear potentially corrupted cart data
      clearStoredCart();
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh cart data
  const refreshCart = useCallback(async (id?: string) => {
    const currentCartId = id || cartId;
    if (!currentCartId) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await getCartAction(currentCartId);
      if (result.success && result.cart) {
        setCart(result.cart);
      } else {
        clearStoredCart();
      }
    } catch (error) {
      console.error('Error refreshing cart:', error);
      clearStoredCart();
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  // Create a new cart if needed
  const ensureCart = async (): Promise<string> => {
    if (cartId) return cartId;

    try {
      const result = await createCartAction();
      if (!result.success || !result.cart) {
        throw new Error(result.error || 'Failed to create cart');
      }

      const newCartId = result.cart.id;
      setCartId(newCartId);
      setCart(result.cart);

      // Save cart with expiration timestamp
      saveCartWithExpiry(newCartId);

      return newCartId;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  };

  // Add item to cart with optimistic update
  const addItem = async (merchandiseId: string, quantity: number) => {
    const currentCartId = await ensureCart();

    // Optimistic update - immediately open cart and show loading
    setIsCartOpen(true);

    startTransition(async () => {
      try {
        const result = await addToCartAction(currentCartId, [{ merchandiseId, quantity }]);

        if (!result.success || !result.cart) {
          throw new Error(result.error || 'Failed to add item to cart');
        }

        setCart(result.cart);
      } catch (error) {
        console.error('Error adding item to cart:', error);
        // Revert optimistic update by refreshing cart
        await refreshCart();
        throw error;
      }
    });
  };

  // Update cart item quantity with optimistic update
  const updateItem = async (lineId: string, quantity: number) => {
    if (!cartId || !cart) return;

    // Optimistic update - immediately update UI
    const previousCart = cart;
    const optimisticCart = {
      ...cart,
      lines: {
        ...cart.lines,
        edges: cart.lines.edges.map((edge) =>
          edge.node.id === lineId
            ? { ...edge, node: { ...edge.node, quantity } }
            : edge
        ),
      },
    };
    setCart(optimisticCart);

    startTransition(async () => {
      try {
        const result = await updateCartAction(cartId, [{ id: lineId, quantity }]);

        if (!result.success || !result.cart) {
          throw new Error(result.error || 'Failed to update cart item');
        }

        setCart(result.cart);
      } catch (error) {
        console.error('Error updating cart item:', error);
        // Revert to previous state
        setCart(previousCart);
        throw error;
      }
    });
  };

  // Remove item from cart with optimistic update
  const removeItem = async (lineId: string) => {
    if (!cartId || !cart) return;

    // Optimistic update - immediately remove from UI
    const previousCart = cart;
    const optimisticCart = {
      ...cart,
      lines: {
        ...cart.lines,
        edges: cart.lines.edges.filter((edge) => edge.node.id !== lineId),
      },
    };
    setCart(optimisticCart);

    startTransition(async () => {
      try {
        const result = await removeFromCartAction(cartId, [lineId]);

        if (!result.success || !result.cart) {
          throw new Error(result.error || 'Failed to remove cart item');
        }

        setCart(result.cart);
      } catch (error) {
        console.error('Error removing cart item:', error);
        // Revert to previous state
        setCart(previousCart);
        throw error;
      }
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isLoading: isLoading || isPending,
        isCartOpen,
        openCart,
        closeCart,
        refreshCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
