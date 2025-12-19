'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/shopify';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateItem, removeItem, isLoading } = useCart();

  if (!isCartOpen) return null;

  const lines = cart?.lines.edges.map((edge) => edge.node) || [];
  const subtotal = cart?.cost.subtotalAmount
    ? formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)
    : '$0.00';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-bebas text-2xl">Shopping Cart ({cart?.totalQuantity || 0})</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-sm font-montserrat font-bold uppercase hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {lines.map((line) => {
                const product = line.merchandise.product;
                const image = product.featuredImage;
                const lineTotal = formatPrice(
                  line.cost.totalAmount.amount,
                  line.cost.totalAmount.currencyCode
                );

                return (
                  <div key={line.id} className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={closeCart}
                      className="flex-shrink-0"
                    >
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                        {image ? (
                          <Image
                            src={image.url}
                            alt={image.altText || product.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${product.handle}`}
                        onClick={closeCart}
                        className="font-montserrat font-bold hover:text-purple-600 transition-colors line-clamp-2"
                      >
                        {product.title}
                      </Link>

                      {line.merchandise.selectedOptions.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          {line.merchandise.selectedOptions
                            .map((option) => option.value)
                            .join(' / ')}
                        </p>
                      )}

                      <p className="font-bold mt-2">{lineTotal}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                            disabled={isLoading}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-medium">{line.quantity}</span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(line.id)}
                          disabled={isLoading}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold">Subtotal:</span>
              <span className="font-bold">{subtotal}</span>
            </div>
            <p className="text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href={cart?.checkoutUrl}
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-sm font-montserrat font-bold uppercase text-center hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Checkout
            </a>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full text-center px-8 py-4 rounded-sm font-montserrat font-bold uppercase border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

function ShoppingBag({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}
