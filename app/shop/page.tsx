import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop Collection | Giant Inside',
  description: 'Shop premium athletic apparel designed for resilience. T-shirts, hoodies, hats, and more from Giant Inside.',
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-80 bg-black text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-charcoal opacity-80"></div>
          <div className="relative z-10 text-center">
            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-shadow">
              SHOP THE COLLECTION
            </h1>
          </div>
        </section>

        {/* Filter Buttons (Future Feature) */}
        <section className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-2 border-2 border-gold bg-gold text-black font-montserrat font-bold uppercase text-sm rounded-sm">
                ALL
              </button>
              <button className="px-6 py-2 border-2 border-gold text-gold font-montserrat font-bold uppercase text-sm rounded-sm hover:bg-gold hover:text-black transition-colors">
                T-SHIRTS
              </button>
              <button className="px-6 py-2 border-2 border-gold text-gold font-montserrat font-bold uppercase text-sm rounded-sm hover:bg-gold hover:text-black transition-colors">
                HOODIES
              </button>
              <button className="px-6 py-2 border-2 border-gold text-gold font-montserrat font-bold uppercase text-sm rounded-sm hover:bg-gold hover:text-black transition-colors">
                HATS
              </button>
            </div>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-12">
              <h2 className="font-bebas text-4xl md:text-5xl mb-6">PRODUCTS COMING SOON</h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                We're putting the final touches on our collection. Follow us on Instagram for launch
                updates and exclusive previews.
              </p>

              <Link
                href="https://instagram.com/giantinside"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-sm font-montserrat font-bold uppercase hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <Instagram size={24} />
                <span>Follow @giantinside</span>
              </Link>
            </div>

            {/* Product Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <ProductCard name="Classic Tee" price={29.99} comingSoon={true} />
              <ProductCard name="Performance Hoodie" price={59.99} comingSoon={true} />
              <ProductCard name="Snapback Hat" price={24.99} comingSoon={true} />
              <ProductCard name="Crewneck Sweatshirt" price={49.99} comingSoon={true} />
              <ProductCard name="Training Tank" price={24.99} comingSoon={true} />
              <ProductCard name="Dad Hat" price={22.99} comingSoon={true} />
            </div>

            <p className="text-sm text-gray-500 italic mt-12">
              Note: Shopify Buy Buttons will be integrated here when products are ready
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
