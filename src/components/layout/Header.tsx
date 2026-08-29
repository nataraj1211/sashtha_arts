import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Heart,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { SearchModal } from '@/components/common/SearchModal';
import { createWhatsAppUrl } from '@/lib/utils';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'God Statues', path: '/god-statues' },
    { name: 'Collections', path: '/collections' },
    { name: 'Custom Order', path: '/custom-order' },
    { name: 'Temple Sanctums', path: '/temple-orders' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Our Craft', path: '/our-craft' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappChatUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Sashtha Arts & Crafts, I would like to enquire about handcrafted South Indian God statues.'
  );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-temple-900/95 backdrop-blur-md shadow-temple-md border-b border-gold-500/20 py-3 text-sand-50'
            : 'bg-gradient-to-b from-temple-950/80 via-temple-900/40 to-transparent py-4 text-sand-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gold-500 p-0.5 shadow-gold-sm transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-temple-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-serif font-bold text-xl text-gold-400">S</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-gold-300 uppercase leading-tight">
                  Sashtha Arts &amp; Crafts
                </span>
                <span className="text-[10px] tracking-[0.25em] text-sand-300 uppercase font-light">
                  Handcrafted Sculptures
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors duration-200 hover:text-gold-400 ${
                    location.pathname === link.path ? 'text-gold-400 font-semibold' : 'text-sand-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 text-sand-200 hover:text-gold-400 transition-colors"
                aria-label="Search Statues"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/wishlist"
                className="p-2 rounded-full hover:bg-white/10 text-sand-200 hover:text-gold-400 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-temple-950 text-xs font-bold flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-transform hover:scale-105 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Artisan</span>
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl hover:bg-white/10 text-sand-200"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-temple-950/98 border-b border-gold-500/20 px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-2 border-b border-white/5 ${
                    location.pathname === link.path ? 'text-gold-400 font-bold' : 'text-sand-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-4">
              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp (+91 93428 39218)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
