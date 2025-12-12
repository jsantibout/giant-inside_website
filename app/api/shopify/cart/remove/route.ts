import { NextRequest, NextResponse } from 'next/server';
import { removeFromCart } from '@/lib/shopify';
import { validateRequest, removeFromCartSchema } from '@/lib/validations';

/**
 * POST /api/shopify/cart/remove
 *
 * Body:
 * - cartId: ID of the cart
 * - lineIds: Array of line IDs to remove
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validateRequest(removeFromCartSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { cartId, lineIds } = validation.data;
    const cart = await removeFromCart(cartId, lineIds);

    return NextResponse.json({ cart });

  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove items from cart' },
      { status: 500 }
    );
  }
}
