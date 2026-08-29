import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, MessageSquare, Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { SearchModal } from '../common/SearchModal';
import { createWhatsAppUrl } from '@/lib/utils';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'God Statues', path: '/god-statues' },
    { name: 'Collections', path: '/collections' },
    { name: 'Custom Order', path: '/custom-order' },
    { name: 'Temple Orders', path: '/temple-orders' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Our Craft', path: '/our-craft' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappChatUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Vetri Arts & Crafts, I would like to enquire about handcrafted South Indian God statues.'
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 p-0.5 shadow-gold-sm group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-temple-900 rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-bold text-lg text-gold-400 tracking-wider">V</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-gold-300 group-hover:text-gold-200 transition-colors uppercase leading-none">
                Vetri Arts
              </span>
              <span className="text-[10px] tracking-[0.25em] text-sand-300 uppercase font-light mt-0.5">
                &amp; Crafts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-widest font-medium transition-all relative py-1 hover:text-gold-300 ${
                    isActive ? 'text-gold-400 font-semibold' : 'text-sand-200'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Icons (NO CUSTOMER LOGIN) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-sand-200 hover:text-gold-300 rounded-full hover:bg-white/10 transition-colors"
              title="Search Deities and Statues"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-2 text-sand-200 hover:text-gold-300 rounded-full hover:bg-white/10 transition-colors relative"
              title="Sacred Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-temple-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Direct WhatsApp CTA */}
            <a
              href={whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-sand-200 hover:text-gold-300 rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-temple-950/98 border-b border-gold-500/30 px-6 py-6 space-y-3 backdrop-blur-xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-4 border-b border-temple-800">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-gold-500/20 text-gold-300 font-semibold border border-gold-500/40'
                      : 'text-sand-300 hover:bg-temple-800 hover:text-sand-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Master Sthapathi</span>
              </a>
              <div className="flex items-center justify-between text-xs text-sand-400 px-1 pt-2">
                <span>Authentic Shilpa Shastra Since Generations</span>
                <ShieldCheck className="w-4 h-4 text-gold-400" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
