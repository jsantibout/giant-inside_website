import { NextRequest, NextResponse } from 'next/server';
import { getCollections, getCollectionByHandle } from '@/lib/shopify';

/**
 * GET /api/shopify/collections
 *
 * Query params:
 * - handle: (optional) Get a specific collection by handle
 * - limit: (optional) Number of collections to return (default: 20)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const handle = searchParams.get('handle');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Get specific collection by handle
    if (handle) {
      const collection = await getCollectionByHandle(handle, limit);

      if (!collection) {
        return NextResponse.json(
          { error: 'Collection not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ collection });
    }

    // Get all collections
    const collections = await getCollections(limit);
    return NextResponse.json({ collections });

  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}
