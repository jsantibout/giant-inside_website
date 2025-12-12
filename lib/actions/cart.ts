'use server';

import { createCart, getCart, addToCart, updateCart, removeFromCart } from '@/lib/shopify';
import { validateRequest, addToCartSchema, updateCartSchema, removeFromCartSchema, createCartSchema } from '@/lib/validations';

/**
 * Server action to create a new cart
 */
export async function createCartAction(lines: Array<{ merchandiseId: string; quantity: number }> = []) {
  try {
    const validation = validateRequest(createCartSchema, { lines });
    if (!validation.success) {
      return { success: false, error: validation.error };
    }

    const cart = await createCart(validation.data.lines);
    return { success: true, cart };
  } catch (error: unknown) {
    console.error('Error creating cart:', error);
    return { success: false, error: 'Failed to create cart' };
  }
}

/**
 * Server action to get cart by ID
 */
export async function getCartAction(cartId: string) {
  try {
    if (!cartId) {
      return { success: false, error: 'Cart ID is required' };
    }

    const cart = await getCart(cartId);
    if (!cart) {
      return { success: false, error: 'Cart not found' };
    }

    return { success: true, cart };
  } catch (error: unknown) {
    console.error('Error fetching cart:', error);
    return { success: false, error: 'Failed to fetch cart' };
  }
}

/**
 * Server action to add items to cart
 */
export async function addToCartAction(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
) {
  try {
    const validation = validateRequest(addToCartSchema, { cartId, lines });
    if (!validation.success) {
      return { success: false, error: validation.error };
    }

    const cart = await addToCart(validation.data.cartId, validation.data.lines);

    return { success: true, cart };
  } catch (error: unknown) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add items to cart' };
  }
}

/**
 * Server action to update cart line quantities
 */
export async function updateCartAction(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
) {
  try {
    const validation = validateRequest(updateCartSchema, { cartId, lines });
    if (!validation.success) {
      return { success: false, error: validation.error };
    }

    const cart = await updateCart(validation.data.cartId, validation.data.lines);

    return { success: true, cart };
  } catch (error: unknown) {
    console.error('Error updating cart:', error);
    return { success: false, error: 'Failed to update cart' };
  }
}

/**
 * Server action to remove items from cart
 */
export async function removeFromCartAction(cartId: string, lineIds: string[]) {
  try {
    const validation = validateRequest(removeFromCartSchema, { cartId, lineIds });
    if (!validation.success) {
      return { success: false, error: validation.error };
    }

    const cart = await removeFromCart(validation.data.cartId, validation.data.lineIds);

    return { success: true, cart };
  } catch (error: unknown) {
    console.error('Error removing from cart:', error);
    return { success: false, error: 'Failed to remove items from cart' };
  }
}
