import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Heart, Brain, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story | Giant Inside',
  description: 'Learn about the Giant Inside story, our mission to inspire resilience, and the values that drive us.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-black text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-charcoal opacity-80"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-shadow">
              THE STORY BEHIND THE BRAND
            </h1>
          </div>
        </section>

        {/* Founder Story */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Founder Photo Placeholder */}
              <div className="aspect-square bg-gray-300 rounded-sm flex items-center justify-center">
                <span className="font-bebas text-4xl text-gray-500">FOUNDER PHOTO</span>
              </div>

              {/* Story Content */}
              <div>
                <h2 className="font-bebas text-3xl md:text-4xl mb-6 text-gold">
                  FROM SETBACKS TO STRENGTH
                </h2>
                <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>
                    Every great brand starts with a personal story. Giant Inside was founded by someone
                    who knows what it means to face adversity and choose to rise anyway.
                  </p>
                  <p>
                    Through personal struggles, athletic challenges, and life's inevitable setbacks, the
                    vision for Giant Inside was born—a brand that doesn't just sell apparel, but inspires
                    a movement of resilience.
                  </p>
                  <p>
                    The journey wasn't easy. There were moments of doubt, times of questioning, and seasons
                    of struggle. But through faith, determination, and an unwavering belief in something
                    greater, Giant Inside emerged as more than just an idea—it became a mission.
                  </p>
                  <p>
                    This brand exists to remind every person that no matter how many times life knocks you
                    down, you have a giant inside you—a force powerful enough to overcome any obstacle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-gold py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl mb-6 text-black">
              OUR MISSION: TO EQUIP AND INSPIRE THOSE WHO REFUSE TO GIVE UP
            </h2>
            <p className="text-lg md:text-xl text-black leading-relaxed">
              At Giant Inside, we believe that every person carries within them an untapped strength—a
              giant waiting to be unleashed. Our mission is to create more than apparel; we create armor
              for the everyday warrior. Through premium athletic wear infused with purpose, we empower
              individuals to embrace resilience, stand firm in faith, cultivate a champion's mindset, and
              build community with others who refuse to settle for average.
            </p>
            <p className="mt-6 text-lg md:text-xl text-black leading-relaxed">
              Whether you're an athlete pushing through the final rep, a student overcoming obstacles, or
              someone simply refusing to let life break you—Giant Inside is your uniform for victory.
            </p>
          </div>
        </section>

        {/* Brand Values Deep Dive */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
            {/* Resilience */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-video bg-gray-300 rounded-sm flex items-center justify-center">
                <Target size={80} className="text-gray-500" />
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <Target size={40} className="text-gold" />
                  <h3 className="font-bebas text-3xl md:text-4xl">RESILIENCE</h3>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Life will knock you down. That's not a question—it's a guarantee. But resilience isn't
                  about avoiding the fall; it's about the choice to rise. Every time. No matter what. We
                  celebrate the grind, the struggle, and the relentless pursuit of becoming stronger than
                  yesterday.
                </p>
              </div>
            </div>

            {/* Faith */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center space-x-4 mb-4">
                  <Heart size={40} className="text-gold" />
                  <h3 className="font-bebas text-3xl md:text-4xl">FAITH</h3>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  True strength comes from something greater than ourselves. Faith is the foundation that
                  holds us steady when everything else shakes. It's the quiet confidence that even in the
                  darkest moments, there's a purpose, a plan, and a power that's bigger than any challenge
                  we face.
                </p>
              </div>
              <div className="aspect-video bg-gray-300 rounded-sm flex items-center justify-center order-1 md:order-2">
                <Heart size={80} className="text-gray-500" />
              </div>
            </div>

            {/* Mindset */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-video bg-gray-300 rounded-sm flex items-center justify-center">
                <Brain size={80} className="text-gray-500" />
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <Brain size={40} className="text-gold" />
                  <h3 className="font-bebas text-3xl md:text-4xl">MINDSET</h3>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Your mind is your greatest weapon or your worst enemy—you decide. Champions aren't born
                  with perfect circumstances; they're built through disciplined thinking, positive
                  self-talk, and an unshakeable belief that they're destined for more. Mindset is
                  everything.
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center space-x-4 mb-4">
                  <Users size={40} className="text-gold" />
                  <h3 className="font-bebas text-3xl md:text-4xl">COMMUNITY</h3>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  You weren't meant to fight alone. Community is where strength multiplies, where
                  encouragement fuels action, and where shared purpose creates movements. At Giant Inside,
                  we're building a tribe of warriors who lift each other up, celebrate wins together, and
                  refuse to let anyone quit.
                </p>
              </div>
              <div className="aspect-video bg-gray-300 rounded-sm flex items-center justify-center order-1 md:order-2">
                <Users size={80} className="text-gray-500" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
