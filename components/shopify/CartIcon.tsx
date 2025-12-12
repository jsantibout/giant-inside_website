'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { cart, openCart } = useCart();
  const itemCount = cart?.totalQuantity || 0;

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
}
