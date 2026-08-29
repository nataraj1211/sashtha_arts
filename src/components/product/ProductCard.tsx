import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, formatDimensions } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { EnquiryModal } from './EnquiryModal';

import { getDeityImage, getDeityAltText } from '@/lib/statueAssets';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const fallbackImage = getDeityImage(product.deity);
  const displayImage = product.primary_image || product.images?.[0]?.image_url || fallbackImage;
  const altText = getDeityAltText(product.deity, product.name);

  return (
    <>
      <div className="group relative bg-[#FFFFFF] rounded-2xl border border-sand-300/80 shadow-sm hover:shadow-temple-md hover:border-gold-500/50 transition-all duration-300 flex flex-col overflow-hidden">
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/5] bg-sand-100 overflow-hidden">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={displayImage}
              alt={altText}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.made_to_order ? (
              <Badge variant="terracotta">Made to Order</Badge>
            ) : (
              <Badge variant="sand">In Stock</Badge>
            )}
            {product.customizable && (
              <Badge variant="gold">Customizable</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white/80 text-temple-800 hover:bg-white hover:text-rose-500'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Deity Tag */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-md bg-temple-950/80 text-gold-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
              {product.deity}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-sand-700 mb-1.5">
              <span className="font-mono text-[11px] text-gold-700 font-semibold">{product.product_code}</span>
              <span>{formatDimensions(product.height)}</span>
            </div>

            <Link to={`/product/${product.slug}`}>
              <h3 className="font-serif font-semibold text-base text-temple-900 line-clamp-2 group-hover:text-gold-700 transition-colors leading-snug">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-temple-700/80 mt-1 line-clamp-1">
              {product.material}
            </p>
          </div>

          {/* Pricing & Actions */}
          <div className="mt-4 pt-3 border-t border-sand-200">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs text-sand-600 font-medium">Price</span>
              <span className="text-base font-bold text-temple-950 font-serif">
                {formatPrice(product.price, product.price_on_request)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link to={`/product/${product.slug}`} className="w-full">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Details
                </Button>
              </Link>
              <Button
                variant="gold"
                size="sm"
                className="w-full text-xs"
                onClick={() => setIsEnquiryOpen(true)}
              >
                Enquire
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Enquiry Drawer Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={product}
      />
    </>
  );
};
