import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/supabase';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from './Button';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEITY_TAGS = [
  { label: 'Lord Murugan', slug: 'murugan' },
  { label: 'Maha Vinayagar', slug: 'vinayagar' },
  { label: 'Sri Mariamman', slug: 'amman' },
  { label: 'Lord Nataraja / Shiva', slug: 'shiva' },
  { label: 'Balaji Perumal', slug: 'perumal' },
  { label: 'Lord Krishna', slug: 'krishna' },
  { label: 'Swami Ayyappan', slug: 'ayyappan' },
  { label: 'Veera Anjaneyar', slug: 'anjaneyar' },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      db.getProducts().then(setProducts);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.deity.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.product_code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, products]);

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSelectDeity = (deity: string) => {
    onClose();
    navigate(`/god-statues?deity=${deity}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-temple-950/75 backdrop-blur-sm"
        />

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-gold-500/30 overflow-hidden z-10"
        >
          {/* Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-sand-300 bg-sand-100/70">
            <Search className="w-5 h-5 text-gold-600 shrink-0 mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Search by deity, material (Panchaloha, Bronze, Stone), code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none text-temple-900 placeholder:text-sand-600 focus:outline-none text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-sand-500 hover:text-temple-900"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="ml-2 text-xs font-semibold px-2 py-1 rounded bg-sand-200 text-temple-800 hover:bg-sand-300"
            >
              ESC
            </button>
          </div>

          {/* Quick Deity Categories */}
          {!query && (
            <div className="p-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-temple-700 uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Popular Sacred Deities</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DEITY_TAGS.map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => handleSelectDeity(tag.slug)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sand-100 border border-sand-300 text-temple-800 hover:border-gold-500 hover:bg-gold-50 transition-colors"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs text-sand-700">
                <span>Looking for bespoke sanctum dimensions?</span>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/custom-order');
                  }}
                  className="text-gold-700 hover:text-gold-800 font-semibold inline-flex items-center gap-1"
                >
                  Custom Statue Wizard <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-sand-200">
              {filteredProducts.length > 0 ? (
                <div>
                  <p className="text-xs font-medium text-sand-600 px-2 mb-2">
                    Found {filteredProducts.length} sacred statue{filteredProducts.length > 1 ? 's' : ''}
                  </p>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="group flex items-center gap-4 p-2.5 rounded-xl hover:bg-sand-100 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.primary_image || product.images?.[0]?.image_url}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg border border-gold-500/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gold-700 font-bold bg-gold-100 px-1.5 py-0.5 rounded">
                            {product.product_code}
                          </span>
                          <span className="text-xs text-temple-600 capitalize">{product.deity}</span>
                        </div>
                        <h4 className="text-sm font-serif font-semibold text-temple-900 truncate group-hover:text-gold-700 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-sand-700 truncate">{product.material}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-temple-900">
                          {formatPrice(product.price, product.price_on_request)}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-sand-400 group-hover:text-gold-600 ml-auto mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center px-4">
                  <p className="text-sm text-temple-800 font-medium">No ready statues matched “{query}”</p>
                  <p className="text-xs text-sand-600 mt-1 max-w-sm mx-auto">
                    Can’t find what you’re looking for? Our master artisans can handcraft any South Indian deity according to your specific dimensions.
                  </p>
                  <Button
                    variant="gold"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      onClose();
                      navigate('/custom-order');
                    }}
                  >
                    REQUEST CUSTOM STATUE
                  </Button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
