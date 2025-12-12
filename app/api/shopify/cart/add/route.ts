import { NextRequest, NextResponse } from 'next/server';
import { addToCart } from '@/lib/shopify';
import { validateRequest, addToCartSchema } from '@/lib/validations';

/**
 * POST /api/shopify/cart/add
 *
 * Body:
 * - cartId: ID of the cart
 * - lines: Array of CartLineInput to add
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validateRequest(addToCartSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { cartId, lines } = validation.data;
    const cart = await addToCart(cartId, lines);

    return NextResponse.json({ cart });

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add items to cart' },
      { status: 500 }
    );
  }
}
