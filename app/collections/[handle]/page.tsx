import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollectionByHandle } from '@/lib/shopify';
import ProductCard from '@/components/shopify/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;

  try {
    const collection = await getCollectionByHandle(handle);

    if (!collection) {
      return {
        title: 'Collection Not Found',
      };
    }

    return {
      title: `${collection.title} | Giant Inside`,
      description: collection.description,
      openGraph: {
        title: collection.title,
        description: collection.description,
        images: collection.image ? [{ url: collection.image.url, alt: collection.image.altText || collection.title }] : [],
      },
    };
  } catch (error) {
    console.error('Error generating collection metadata:', error);
    return {
      title: 'Collection | Giant Inside',
      description: 'Shop premium athletic apparel from Giant Inside',
    };
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;

  let collection;
  try {
    collection = await getCollectionByHandle(handle);
  } catch (error) {
    console.error('Error fetching collection:', error);
    // Return error page instead of crashing
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <h1 className="font-bebas text-4xl md:text-5xl mb-6">
                COLLECTION UNAVAILABLE
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We&apos;re having trouble loading this collection. Please try again later.
              </p>
              <a
                href="/shop"
                className="inline-block bg-black text-white px-8 py-3 font-bold hover:bg-gray-800 transition-colors"
              >
                BACK TO SHOP
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!collection) {
    notFound();
  }

  const products = collection.products.edges.map((edge) => edge.node);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Collection Header */}
        <section className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl mb-4">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {collection.description}
              </p>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found in this collection.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
