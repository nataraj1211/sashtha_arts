import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/types';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlist: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'vetri_arts_wishlist';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { success, info } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to persist wishlist to localStorage', e);
    }
  }, [wishlist]);

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      info(`Removed "${product.name}" from your sacred wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      success(`Added "${product.name}" to your sacred wishlist.`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    const item = wishlist.find((p) => p.id === productId);
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
    if (item) {
      info(`Removed "${item.name}" from wishlist.`);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    info('Wishlist cleared.');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
