import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify';
import ProductDisplay from '@/components/shopify/ProductDisplay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;

  try {
    const product = await getProductByHandle(handle);

    if (!product) {
      return {
        title: 'Product Not Found',
      };
    }

    const firstImage = product.images.edges[0]?.node;

    return {
      title: `${product.title} | Giant Inside`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: firstImage ? [{ url: firstImage.url, alt: firstImage.altText || product.title }] : [],
      },
    };
  } catch (error) {
    console.error('Error generating product metadata:', error);
    return {
      title: 'Product | Giant Inside',
      description: 'Shop premium athletic apparel from Giant Inside',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  let product;
  try {
    product = await getProductByHandle(handle);
  } catch (error) {
    console.error('Error fetching product:', error);
    // Return error page instead of crashing
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <h1 className="font-bebas text-4xl md:text-5xl mb-6">
                PRODUCT UNAVAILABLE
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We&apos;re having trouble loading this product. Please try again later.
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

  if (!product) {
    notFound();
  }

  const firstVariant = product.variants.edges[0]?.node;

  // If product has no variants, show not found
  if (!firstVariant) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProductDisplay product={product} />
        </div>
      </main>
      <Footer />
    </>
  );
}
