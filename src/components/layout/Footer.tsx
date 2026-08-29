import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, MessageCircle, ShieldCheck, Heart, Lock } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export const Footer: React.FC = () => {
  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Vetri Arts & Crafts, I would like to consult with an artisan.'
  );

  return (
    <footer className="bg-temple-950 text-sand-200 border-t border-gold-500/20 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-temple-800">
          {/* Col 1: Brand & Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 p-0.5 shrink-0">
                <div className="w-full h-full bg-temple-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-serif font-bold text-lg text-gold-400">V</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-wider text-gold-300 uppercase leading-none">
                  Vetri Arts &amp; Crafts
                </span>
                <span className="text-[10px] tracking-[0.2em] text-sand-400 uppercase font-light mt-0.5">
                  Sacred Handcrafted Sculptures
                </span>
              </div>
            </Link>

            <p className="text-sm text-sand-300 leading-relaxed pr-4">
              Dedicated to preserving the sacred Shilpa Shastra tradition of South India. We handcraft
              authentic Panchaloha, lost-wax bronze, heavy brass, and monolithic stone Hindu God statues
              for sanctums, temples, and devoted home altars worldwide.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/vetriartsncrafts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-temple-800 hover:bg-pink-700 text-sand-100 flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-1.5 text-xs text-gold-400 bg-temple-900 px-3 py-1 rounded-full border border-gold-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Traditional Castings</span>
              </div>
            </div>
          </div>

          {/* Col 2: Sacred Deities */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-gold-400 tracking-wider uppercase">
              Sacred Deities
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <Link to="/god-statues?deity=murugan" className="hover:text-gold-300 transition-colors">
                  Lord Murugan Statues
                </Link>
              </li>
              <li>
                <Link to="/god-statues?deity=vinayagar" className="hover:text-gold-300 transition-colors">
                  Maha Vinayagar Idols
                </Link>
              </li>
              <li>
                <Link to="/god-statues?deity=amman" className="hover:text-gold-300 transition-colors">
                  Sri Mariamman / Amman
                </Link>
              </li>
              <li>
                <Link to="/god-statues?deity=shiva" className="hover:text-gold-300 transition-colors">
                  Lord Nataraja / Shiva
                </Link>
              </li>
              <li>
                <Link to="/god-statues?deity=perumal" className="hover:text-gold-300 transition-colors">
                  Lord Venkateswara Perumal
                </Link>
              </li>
              <li>
                <Link to="/god-statues?deity=krishna" className="hover:text-gold-300 transition-colors">
                  Venugopala Krishna
                </Link>
              </li>
              <li>
                <Link to="/god-statues?deity=ayyappan" className="hover:text-gold-300 transition-colors">
                  Swami Ayyappan
                </Link>
              </li>
              <li>
                <Link to="/god-statues?deity=anjaneyar" className="hover:text-gold-300 transition-colors">
                  Veera Anjaneyar / Hanuman
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Craft & Guidance */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-gold-400 tracking-wider uppercase">
              Artistry &amp; Care
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <Link to="/our-craft" className="hover:text-gold-300 transition-colors">
                  Shilpa Shastra Process
                </Link>
              </li>
              <li>
                <Link to="/materials" className="hover:text-gold-300 transition-colors">
                  Panchaloha &amp; Bronze Guide
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="hover:text-gold-300 transition-colors">
                  Statue Care &amp; Cleaning
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-gold-300 transition-colors">
                  Secure Wooden Packaging
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold-300 transition-colors">
                  Sculpture Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Orders & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-gold-400 tracking-wider uppercase">
              Bespoke Sanctums
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <Link to="/custom-order" className="hover:text-gold-300 transition-colors">
                  Custom Statue Request
                </Link>
              </li>
              <li>
                <Link to="/temple-orders" className="hover:text-gold-300 transition-colors">
                  Temple &amp; Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-gold-300 transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Master Sthapathi
                </Link>
              </li>
            </ul>

            <div className="pt-2 text-xs text-sand-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Swamimalai / Mahabalipuram, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 93428 39218</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-400 gap-4">
          <p>© {new Date().getFullYear()} Vetri Arts &amp; Crafts. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Handcrafted with Devotion in Tamil Nadu</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-sand-500 hover:text-gold-400 transition-colors py-1 px-2 rounded hover:bg-temple-900"
              title="Admin Portal Access"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
