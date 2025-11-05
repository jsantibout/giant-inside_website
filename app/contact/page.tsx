import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ui/ContactForm';
import { Mail, Instagram, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Giant Inside',
  description: 'Get in touch with Giant Inside. We respond within 24-48 hours.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-black text-white py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl mb-4">
              LET'S CONNECT
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              We'd love to hear from you
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="font-bebas text-3xl md:text-4xl mb-8">CONTACT INFORMATION</h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Mail size={24} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold mb-1">Email</h3>
                      <a
                        href=""
                        className="text-gray-600 hover:text-gold transition-colors"
                      >
                        email@example.com
                      </a>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Instagram size={24} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold mb-1">Instagram</h3>
                      <a
                        href="https://instagram.com/giantinside"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gold transition-colors"
                      >
                        @giantinside
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <MapPin size={24} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold mb-1">Location</h3>
                      <p className="text-gray-600">Based in [City, State]</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Clock size={24} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold mb-1">Response Time</h3>
                      <p className="text-gray-600">Within 24-48 hours</p>
                    </div>
                  </div>
                </div>

                {/* Social CTA */}
                <div className="mt-12 p-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-sm">
                  <h3 className="font-bebas text-2xl text-white mb-3">FOLLOW THE JOURNEY</h3>
                  <p className="text-white/90 mb-4">
                    Stay updated with product launches, motivational content, and exclusive behind-the-scenes.
                  </p>
                  <a
                    href="https://instagram.com/giantinside"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-sm font-montserrat font-bold uppercase text-sm hover:bg-gray-100 transition-colors"
                  >
                    <Instagram size={20} />
                    <span>Follow @giantinside</span>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="font-bebas text-3xl md:text-4xl mb-8">SEND A MESSAGE</h2>
                <div className="bg-gray-50 p-8 rounded-sm">
                  <ContactForm formType="contact" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
