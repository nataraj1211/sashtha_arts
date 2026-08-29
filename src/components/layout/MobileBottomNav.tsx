import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Search, Heart, MessageSquare } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { SearchModal } from '../common/SearchModal';

export const MobileBottomNav: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  // Hide on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Statues', path: '/god-statues', icon: Sparkles },
    { label: 'Search', action: () => setIsSearchOpen(true), icon: Search },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Custom', path: '/custom-order', icon: MessageSquare },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-temple-950/95 backdrop-blur-lg border-t border-gold-500/30 px-2 py-2 flex items-center justify-around text-sand-300 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.path ? location.pathname === item.path : false;

          if (item.action) {
            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex flex-col items-center justify-center w-14 py-1 text-[11px] font-medium text-sand-300 hover:text-gold-300 transition-colors"
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={idx}
              to={item.path!}
              className={`flex flex-col items-center justify-center w-14 py-1 text-[11px] font-medium transition-colors relative ${
                isActive ? 'text-gold-400 font-semibold' : 'text-sand-300 hover:text-sand-100'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-0.5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-gold-500 text-temple-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
