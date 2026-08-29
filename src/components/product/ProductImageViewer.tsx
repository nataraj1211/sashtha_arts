import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import type { ProductImage } from '@/types';
import { Lightbox } from '../common/Lightbox';

export interface ProductImageViewerProps {
  images?: ProductImage[];
  productName: string;
}

export const ProductImageViewer: React.FC<ProductImageViewerProps> = ({
  images = [],
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fallback if no images provided
  const displayImages = images.length > 0 ? images : [
    {
      id: 'default-front',
      product_id: 'default',
      image_url: '/images/statues/murugan.jpg',
      view_type: 'front' as const,
      sort_order: 1,
      is_primary: true,
    },
    {
      id: 'default-left',
      product_id: 'default',
      image_url: '/images/statues/murugan.jpg',
      view_type: 'left' as const,
      sort_order: 2,
      is_primary: false,
    },
    {
      id: 'default-right',
      product_id: 'default',
      image_url: '/images/statues/murugan.jpg',
      view_type: 'right' as const,
      sort_order: 3,
      is_primary: false,
    },
    {
      id: 'default-back',
      product_id: 'default',
      image_url: '/images/statues/murugan.jpg',
      view_type: 'back' as const,
      sort_order: 4,
      is_primary: false,
    },
  ];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
  };

  const lightboxImages = displayImages.map((img) => ({
    url: img.image_url,
    label: `${productName} — ${img.view_type?.toUpperCase()} VIEW`,
    view_type: img.view_type,
  }));

  const viewTypeLabels: Record<string, string> = {
    front: 'Front View',
    left: 'Left Profile',
    right: 'Right Profile',
    back: 'Back Sanctum View',
    detail: 'Intricate Carving Detail',
    lifestyle: 'Altar & Mandapam Setting',
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
      {/* Thumbnails (Desktop: Vertical strip, Mobile: Horizontal carousel) */}
      <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[580px] no-scrollbar py-1">
        {displayImages.map((img, idx) => {
          const isSelected = idx === selectedIndex;
          const isFourSide = ['front', 'left', 'right', 'back'].includes(img.view_type);

          return (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all duration-200 text-left bg-sand-100 flex flex-col group ${
                isSelected
                  ? 'border-gold-500 shadow-gold-sm ring-2 ring-gold-400/30'
                  : 'border-sand-300 opacity-70 hover:opacity-100 hover:border-gold-400'
              }`}
            >
              <img
                src={img.image_url}
                alt={`${productName} ${img.view_type} view`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />

              {/* View Type Badge on Thumbnail */}
              <div
                className={`absolute bottom-0 inset-x-0 py-1 px-1 text-center text-[9px] font-bold uppercase tracking-wider ${
                  isSelected
                    ? 'bg-temple-900 text-gold-300'
                    : isFourSide
                    ? 'bg-temple-950/80 text-sand-200'
                    : 'bg-sand-800/80 text-sand-100'
                }`}
              >
                {img.view_type}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Feature Display */}
      <div className="flex-1 relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-sand-100 rounded-2xl border border-gold-500/30 overflow-hidden shadow-temple-md group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.image_url}
            src={currentImage.image_url}
            alt={`${productName} - ${currentImage.view_type}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsLightboxOpen(true)}
            className="w-full h-full object-cover object-center cursor-zoom-in group-hover:scale-[1.02] transition-transform duration-300"
          />
        </AnimatePresence>

        {/* Top Badges: Current View & Counter */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
          <div className="bg-temple-950/85 backdrop-blur-md border border-gold-500/30 px-3 py-1 rounded-lg text-gold-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{viewTypeLabels[currentImage.view_type] || `${currentImage.view_type} View`}</span>
          </div>

          <div className="bg-temple-950/85 backdrop-blur-md border border-sand-500/20 px-2.5 py-1 rounded-lg text-sand-200 text-xs font-mono font-medium shadow-sm">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        </div>

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-temple-900/70 hover:bg-temple-900 text-sand-100 border border-gold-500/30 transition-all opacity-0 group-hover:opacity-100 shadow-md"
              aria-label="Previous view"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-temple-900/70 hover:bg-temple-900 text-sand-100 border border-gold-500/30 transition-all opacity-0 group-hover:opacity-100 shadow-md"
              aria-label="Next view"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Click-to-Zoom CTA Bar */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 z-10 px-3.5 py-2 rounded-xl bg-temple-950/85 hover:bg-temple-900 text-sand-100 text-xs font-medium border border-gold-500/30 backdrop-blur-md flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
          <span>Full 4-Side Lightbox Zoom</span>
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={selectedIndex}
        title={productName}
      />
    </div>
  );
};
