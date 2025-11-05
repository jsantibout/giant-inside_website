import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/giant-inside_logo.png"
                alt="Giant Inside"
                width={280}
                height={93}
                className="h-20 w-auto rounded-full"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Built for those who rise
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bebas tracking-wider mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-lg font-bebas tracking-wider mb-4 text-gold">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com/giantinside"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-gold transition-colors text-sm"
              >
                <Instagram size={18} />
                <span>@giantinside</span>
              </a>
              <a
                href=""
                className="flex items-center space-x-2 text-gray-400 hover:text-gold transition-colors text-sm"
              >
                <Mail size={18} />
                <span>email@example.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2024 Giant Inside. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
