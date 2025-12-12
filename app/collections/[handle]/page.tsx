import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollectionByHandle } from '@/lib/shopify';
import ProductCard from '@/components/shopify/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CollectionPageProps {
  params: {
    handle: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const collection = await getCollectionByHandle(params.handle);

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
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = await getCollectionByHandle(params.handle);

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
