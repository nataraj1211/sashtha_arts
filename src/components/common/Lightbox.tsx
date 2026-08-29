import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import type { ProductImage } from '@/types';

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ url: string; label?: string; view_type?: string }>;
  initialIndex?: number;
  title?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title = 'Vetri Arts Sacred Creation',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
  }, [initialIndex, isOpen]);

  const handlePrev = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoomLevel(1);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-temple-950/95 backdrop-blur-md select-none">
        {/* Top Bar */}
        <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-temple-950/80 to-transparent">
          <div className="text-sand-100">
            <h4 className="font-serif text-base sm:text-lg font-medium text-gold-300">{title}</h4>
            <div className="flex items-center gap-3 text-xs text-sand-300 mt-0.5">
              <span>
                {currentIndex + 1} / {images.length}
              </span>
              {currentImage.view_type && (
                <span className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 font-bold uppercase tracking-wider text-[10px] border border-gold-500/30">
                  {currentImage.view_type} VIEW
                </span>
              )}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-full bg-temple-800/80 text-sand-200 hover:text-gold-400 hover:bg-temple-700 transition-colors"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-full bg-temple-800/80 text-sand-200 hover:text-gold-400 hover:bg-temple-700 transition-colors"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={handleResetZoom}
                className="p-2 rounded-full bg-temple-800/80 text-sand-200 hover:text-gold-400 hover:bg-temple-700 transition-colors"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-temple-800/80 text-sand-200 hover:text-white hover:bg-terracotta-700 transition-colors ml-2"
              title="Close (Esc)"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 z-20 p-3 rounded-full bg-temple-900/60 hover:bg-temple-800 text-gold-400 border border-gold-500/30 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Main Image Container */}
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-hidden">
          <motion.img
            key={currentIndex}
            src={currentImage.url}
            alt={currentImage.label || title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: zoomLevel }}
            transition={{ duration: 0.2 }}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-transform duration-200 cursor-zoom-in"
            onClick={() => {
              if (zoomLevel === 1) handleZoomIn();
              else handleResetZoom();
            }}
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 z-20 p-3 rounded-full bg-temple-900/60 hover:bg-temple-800 text-gold-400 border border-gold-500/30 transition-all hover:scale-110 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Bottom Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 px-4">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-temple-900/80 backdrop-blur-md border border-gold-500/20 max-w-full overflow-x-auto no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentIndex
                      ? 'border-gold-400 scale-105 shadow-gold-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  {img.view_type && (
                    <span className="absolute bottom-0 inset-x-0 bg-temple-950/80 text-[7px] font-bold text-gold-300 uppercase text-center py-0.5">
                      {img.view_type.slice(0, 3)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
