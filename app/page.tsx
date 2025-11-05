import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import { Target, Heart, Brain, Users } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-black text-white">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"></div>

          {/* Placeholder background image effect */}
          <div className="absolute inset-0 bg-charcoal opacity-80"></div>

          {/* Content */}
          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
            <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl mb-6 text-shadow">
              GIANT INSIDE
            </h1>
            <p className="font-montserrat text-xl md:text-2xl lg:text-3xl text-gold mb-10">
              Built for those who rise after every setback
            </p>
            <Button href="/shop" variant="primary" className="text-lg px-12 py-4">
              SHOP NOW
            </Button>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="aspect-square bg-gray-300 rounded-sm flex items-center justify-center">
                <span className="font-bebas text-4xl text-gray-500">ATHLETE IMAGE</span>
              </div>

              {/* Text Content */}
              <div>
                <h2 className="font-bebas text-4xl md:text-5xl mb-6">THE GIANT INSIDE</h2>
                <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>
                    Every champion has a moment where they wanted to quit. Every leader has faced
                    rejection. Every success story begins with struggle.
                  </p>
                  <p>
                    Giant Inside was born from the belief that greatness isn't measured by the number
                    of times you fall—it's defined by your refusal to stay down. We create apparel for
                    the fighters, the believers, the ones who know that setbacks are just setups for
                    something greater.
                  </p>
                  <p>
                    This isn't just clothing. It's a reminder that you have a giant inside—a force that's
                    stronger than any obstacle, deeper than any fear, and more powerful than any doubt.
                    When you wear Giant Inside, you're declaring to the world: "I refuse to quit."
                  </p>
                </div>
                <blockquote className="font-bebas text-2xl md:text-3xl text-green-forest mt-8 italic">
                  "Every setback is a setup for a comeback"
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="bg-gray-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bebas text-4xl md:text-5xl text-center mb-12">LATEST DROPS</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProductCard name="Classic Tee" price={29.99} comingSoon={true} />
              <ProductCard name="Performance Hoodie" price={59.99} comingSoon={true} />
              <ProductCard name="Snapback Hat" price={24.99} comingSoon={true} />
            </div>

            <p className="text-center mt-12 text-gray-600 italic">
              Shopify Buy Buttons will be embedded here when products are ready
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-black text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bebas text-4xl md:text-5xl text-center mb-4">
              <span className="text-gold">BUILT ON</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {/* Resilience */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target size={48} className="text-gold" />
                </div>
                <h3 className="font-bebas text-2xl mb-3 text-gold">RESILIENCE</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Life will knock you down. But resilience isn't about avoiding the fall; it's about
                  the choice to rise. Every time. No matter what.
                </p>
              </div>

              {/* Faith */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart size={48} className="text-gold" />
                </div>
                <h3 className="font-bebas text-2xl mb-3 text-gold">FAITH</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  True strength comes from something greater than ourselves. Faith is the foundation
                  that holds us steady when everything else shakes.
                </p>
              </div>

              {/* Mindset */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Brain size={48} className="text-gold" />
                </div>
                <h3 className="font-bebas text-2xl mb-3 text-gold">MINDSET</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Your mind is your greatest weapon or your worst enemy—you decide. Champions are
                  built through disciplined thinking and unshakeable belief.
                </p>
              </div>

              {/* Community */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users size={48} className="text-gold" />
                </div>
                <h3 className="font-bebas text-2xl mb-3 text-gold">COMMUNITY</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  You weren't meant to fight alone. Community is where strength multiplies and
                  shared purpose creates movements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-forest py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-bebas text-5xl md:text-6xl text-white mb-4">
              JOIN THE MOVEMENT
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Gear for those who refuse to quit
            </p>
            <Button href="/shop" variant="primary" className="text-lg px-12 py-4">
              EXPLORE COLLECTION
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
