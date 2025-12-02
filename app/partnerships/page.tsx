import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ui/ContactForm';
import { Palette, DollarSign, CheckCircle, Clock, School, Users, Heart, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Team Partnerships | Giant Inside',
  description: 'Custom apparel partnerships for schools, teams, and youth programs. Get custom designs with bulk pricing.',
};

export default function PartnershipsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-black text-white flex items-center justify-center">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"></div>
          {/* Placeholder background image effect */}
          <div className="absolute inset-0 bg-charcoal opacity-80"></div>
          <div className="relative z-20 text-center px-4">
            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-shadow mb-4">
              GEAR YOUR TEAM
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Custom apparel partnerships for schools, teams, and youth programs
            </p>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bebas text-4xl md:text-5xl text-center mb-12">
              WHY PARTNER WITH US
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Custom Designs */}
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Palette size={48} className="text-gold" />
                </div>
                <h3 className="font-bebas text-2xl mb-3">Custom Designs</h3>
                <p className="text-gray-600">
                  Work directly with us to create unique designs that represent your team's identity and
                  values.
                </p>
              </div>

              {/* Bulk Pricing */}
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <DollarSign size={48} className="text-gold" />
                </div>
                <h3 className="font-bebas text-2xl mb-3">Bulk Pricing</h3>
                <p className="text-gray-600">
                  Competitive pricing for team orders. The more you order, the more you save.
                </p>
              </div>

              {/* Quality Guarantee */}
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle size={48} className="text-gold" />
                </div>
                <h3 className="font-bebas text-2xl mb-3">Quality Guarantee</h3>
                <p className="text-gray-600">
                  Premium materials and construction. Your team deserves apparel built to last.
                </p>
              </div>

              {/* Quick Turnaround */}
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock size={48} className="text-gold" />
                </div>
                <h3 className="font-bebas text-2xl mb-3">Quick Turnaround</h3>
                <p className="text-gray-600">
                  Fast production and delivery to get your team geared up when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="bg-gray-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bebas text-4xl md:text-5xl text-center mb-12">
              WHO WE WORK WITH
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Youth Sports */}
              <div className="bg-white p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
                <Users size={48} className="text-gold mx-auto mb-4" />
                <h3 className="font-bebas text-xl mb-2">Youth Sports Teams</h3>
                <p className="text-sm text-gray-600">
                  Little league, travel teams, and recreational leagues
                </p>
              </div>

              {/* Schools */}
              <div className="bg-white p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
                <School size={48} className="text-gold mx-auto mb-4" />
                <h3 className="font-bebas text-xl mb-2">Schools & Athletic Programs</h3>
                <p className="text-sm text-gray-600">
                  High schools, colleges, and athletic departments
                </p>
              </div>

              {/* Faith Organizations */}
              <div className="bg-white p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
                <Heart size={48} className="text-gold mx-auto mb-4" />
                <h3 className="font-bebas text-xl mb-2">Faith-Based Organizations</h3>
                <p className="text-sm text-gray-600">
                  Churches, youth groups, and ministry programs
                </p>
              </div>

              {/* Community Groups */}
              <div className="bg-white p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
                <Building size={48} className="text-gold mx-auto mb-4" />
                <h3 className="font-bebas text-xl mb-2">Community Groups</h3>
                <p className="text-sm text-gray-600">
                  Non-profits, clubs, and community organizations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bebas text-4xl md:text-5xl text-center mb-12">
              HOW IT WORKS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gold rounded-full flex items-center justify-center">
                  <span className="font-bebas text-3xl text-black">1</span>
                </div>
                <h3 className="font-bebas text-2xl mb-3">Contact Us</h3>
                <p className="text-gray-600">
                  Fill out the form below with your vision and team details
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gold rounded-full flex items-center justify-center">
                  <span className="font-bebas text-3xl text-black">2</span>
                </div>
                <h3 className="font-bebas text-2xl mb-3">Design Phase</h3>
                <p className="text-gray-600">
                  We create custom mockups based on your preferences
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gold rounded-full flex items-center justify-center">
                  <span className="font-bebas text-3xl text-black">3</span>
                </div>
                <h3 className="font-bebas text-2xl mb-3">Order & Receive</h3>
                <p className="text-gray-600">
                  Approve the design, place your order, and receive your gear
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-gray-100 py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-bebas text-4xl md:text-5xl mb-4">
                GET STARTED TODAY
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll be in touch within 24 hours
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg">
              <ContactForm formType="partnership" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
