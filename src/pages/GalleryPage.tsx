import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, ArrowRight, MessageSquare } from 'lucide-react';
import { db } from '@/lib/supabase';
import type { GalleryItem } from '@/types';
import { Lightbox } from '@/components/common/Lightbox';
import { Button } from '@/components/common/Button';

export const GalleryPage: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { label: 'All Creations', value: 'all' },
    { label: 'Murugan', value: 'murugan' },
    { label: 'Vinayagar', value: 'vinayagar' },
    { label: 'Amman', value: 'amman' },
    { label: 'Shiva / Nataraja', value: 'shiva' },
    { label: 'Perumal', value: 'perumal' },
    { label: 'Bronze', value: 'bronze' },
    { label: 'Panchaloha', value: 'panchaloha' },
    { label: 'Black Stone', value: 'stone' },
    { label: 'Temple Sanctums', value: 'temple' },
    { label: 'Workshop & Crafting', value: 'workshop' },
  ];

  useEffect(() => {
    async function loadGallery() {
      setIsLoading(true);
      const items = await db.getGallery();
      setGallery(items);
      setIsLoading(false);
    }
    loadGallery();
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return gallery;
    return gallery.filter(
      (item) =>
        (item.category || '').toLowerCase() === selectedCategory.toLowerCase() ||
        item.deity?.toLowerCase() === selectedCategory.toLowerCase() ||
        item.material?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [gallery, selectedCategory]);

  const lightboxImages = filteredItems.map((item) => ({
    url: item.image_url,
    label: item.title,
    view_type: item.material || item.category,
  }));

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Masterpieces &amp; Workshop Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Sacred Sculpture Gallery
          </h1>
          <p className="text-sm sm:text-base text-temple-700 leading-relaxed">
            A visual chronicle of our handcrafted Panchaloha deities, monolithic granite carvings, temple installations, and authentic lost-wax casting in Swamimalai.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-temple-900 text-gold-300 shadow-sm border border-gold-500/30'
                  : 'bg-white text-sand-700 hover:text-temple-950 border border-sand-300 hover:border-gold-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Masonry / Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="aspect-[4/3] bg-sand-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-sand-300 shadow-sm hover:shadow-temple-md hover:border-gold-500/60 transition-all cursor-pointer flex flex-col"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-temple-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-300">
                      <Maximize2 className="w-3.5 h-3.5" /> Fullscreen View
                    </span>
                  </div>

                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-temple-950/80 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {item.material || item.category}
                  </span>
                </div>

                {/* Info Card */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-temple-950 group-hover:text-gold-700 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-sand-700 mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-sand-200 flex items-center justify-between text-xs text-gold-800 font-bold">
                    <span>Click to Zoom</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-sand-300 p-8 space-y-3">
            <p className="font-serif text-lg font-bold text-temple-900">No gallery items in this category</p>
            <Button variant="outline" size="sm" onClick={() => setSelectedCategory('all')}>
              Show All Creations
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        images={lightboxImages}
        initialIndex={lightboxIndex || 0}
        title={lightboxIndex !== null ? filteredItems[lightboxIndex]?.title : 'Sashtha Arts Gallery'}
      />
    </div>
  );
};
