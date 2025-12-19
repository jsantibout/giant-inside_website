import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/shopify/ProductCard';
import { getProducts } from '@/lib/shopify';
import { ShopifyProduct } from '@/lib/types/shopify';

export const metadata: Metadata = {
  title: 'Shop Collection | Giant Inside',
  description: 'Shop premium athletic apparel designed for resilience. T-shirts, hoodies, hats, and more from Giant Inside.',
};

// Use dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  // Fetch all products from Shopify with error handling
  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  try {
    products = await getProducts(50);
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-80 bg-black text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"></div>
          <div className="absolute inset-0 bg-charcoal opacity-80"></div>
          <div className="relative z-20 text-center">
            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-shadow">
              SHOP THE COLLECTION
            </h1>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error ? (
              <div className="text-center py-12">
                <h2 className="font-bebas text-4xl md:text-5xl mb-6">
                  STORE SETUP IN PROGRESS
                </h2>
                <p className="text-lg text-gray-600">
                  We&apos;re currently configuring our store. Please check back soon!
                </p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="font-bebas text-4xl md:text-5xl mb-6">
                  PRODUCTS COMING SOON
                </h2>
                <p className="text-lg text-gray-600">
                  No products available yet. Check back soon!
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
