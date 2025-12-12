'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/shopify';

export default function CartPageContent() {
  const { cart, updateItem, removeItem, isLoading } = useCart();

  const lines = cart?.lines.edges.map((edge) => edge.node) || [];
  const subtotal = cart?.cost.subtotalAmount
    ? formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)
    : '$0.00';

  if (lines.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <h2 className="font-bebas text-3xl mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-sm font-montserrat font-bold uppercase hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="space-y-6">
          {lines.map((line) => {
            const product = line.merchandise.product;
            const image = product.featuredImage;
            const lineTotal = formatPrice(
              line.cost.totalAmount.amount,
              line.cost.totalAmount.currencyCode
            );

            return (
              <div
                key={line.id}
                className="flex gap-6 p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <Link
                  href={`/products/${product.handle}`}
                  className="flex-shrink-0"
                >
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${product.handle}`}
                    className="font-montserrat font-bold text-xl hover:text-purple-600 transition-colors line-clamp-2"
                  >
                    {product.title}
                  </Link>

                  {line.merchandise.selectedOptions.length > 0 && (
                    <p className="text-gray-500 mt-2">
                      {line.merchandise.selectedOptions
                        .map((option) => `${option.name}: ${option.value}`)
                        .join(' • ')}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                          disabled={isLoading}
                          className="p-3 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-6 font-medium text-lg">{line.quantity}</span>
                        <button
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          className="p-3 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-right">
                      <p className="font-bold text-xl">{lineTotal}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
          <h2 className="font-bebas text-2xl mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-lg">
              <span>Subtotal ({cart?.totalQuantity} items)</span>
              <span>{subtotal}</span>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                Shipping, taxes, and discount codes calculated at checkout.
              </p>
            </div>
          </div>

          <a
            href={cart?.checkoutUrl}
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-sm font-montserrat font-bold uppercase text-center hover:from-purple-700 hover:to-pink-700 transition-all mb-4"
          >
            Proceed to Checkout
          </a>

          <Link
            href="/shop"
            className="block w-full text-center px-8 py-4 rounded-sm font-montserrat font-bold uppercase border-2 border-gray-300 hover:border-gray-400 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
