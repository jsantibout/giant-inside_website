import { NextRequest, NextResponse } from 'next/server';
import { createCart, getCart } from '@/lib/shopify';
import { validateRequest, getCartSchema, createCartSchema } from '@/lib/validations';

/**
 * GET /api/shopify/cart
 *
 * Query params:
 * - cartId: ID of the cart to retrieve
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cartId = searchParams.get('cartId');

    // Validate query params
    const validation = validateRequest(getCartSchema, { cartId });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const cart = await getCart(validation.data.cartId);

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ cart });

  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/shopify/cart
 *
 * Body:
 * - lines: (optional) Array of CartLineInput to add to new cart
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = validateRequest(createCartSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const cart = await createCart(validation.data.lines);

    return NextResponse.json({ cart });

  } catch (error) {
    console.error('Error creating cart:', error);
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}
