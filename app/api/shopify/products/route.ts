import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductByHandle } from '@/lib/shopify';

/**
 * GET /api/shopify/products
 *
 * Query params:
 * - handle: (optional) Get a specific product by handle
 * - limit: (optional) Number of products to return (default: 20)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const handle = searchParams.get('handle');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Get specific product by handle
    if (handle) {
      const product = await getProductByHandle(handle);

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ product });
    }

    // Get all products
    const products = await getProducts(limit);
    return NextResponse.json({ products });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
