import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartPageContent from '@/components/shopify/CartPageContent';

export const metadata: Metadata = {
  title: 'Shopping Cart | Giant Inside',
  description: 'View and manage your shopping cart',
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-bebas text-4xl md:text-5xl mb-8">Shopping Cart</h1>
          <CartPageContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
