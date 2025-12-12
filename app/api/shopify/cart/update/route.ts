import { NextRequest, NextResponse } from 'next/server';
import { updateCart } from '@/lib/shopify';
import { validateRequest, updateCartSchema } from '@/lib/validations';

/**
 * POST /api/shopify/cart/update
 *
 * Body:
 * - cartId: ID of the cart
 * - lines: Array of CartLineUpdateInput with line IDs and quantities
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validateRequest(updateCartSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { cartId, lines } = validation.data;
    const cart = await updateCart(cartId, lines);

    return NextResponse.json({ cart });

  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}
