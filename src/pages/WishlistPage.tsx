import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, formatDimensions } from '@/lib/utils';
import { Button } from '@/components/common/Button';
import { OrderDrawer } from '@/components/product/OrderDrawer';
import { EnquiryModal } from '@/components/product/EnquiryModal';
import type { Product } from '@/types';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState<Product | null>(null);

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-sand-300">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>Sacred Altar Shortlist</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-temple-950">
              Your Sacred Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-1">
              Saved in your browser — zero login required. Enquire or order whenever you are ready.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-semibold text-sand-600 hover:text-rose-600 self-start sm:self-auto transition-colors"
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

        {/* Wishlist Items List */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-sand-300 shadow-sm hover:shadow-temple-md transition-all flex flex-col justify-between"
              >
                {/* Image & Top Info */}
                <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden">
                  <Link to={`/product/${item.slug}`}>
                    <img
                      src={item.primary_image || item.images?.[0]?.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-rose-50 text-sand-600 hover:text-rose-600 transition-colors shadow-sm"
                    title="Remove from wishlist"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <span className="absolute bottom-3 left-3 bg-temple-950/80 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {item.deity}
                  </span>
                </div>

                {/* Details Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-sand-600 mb-1">
                      <span className="font-mono text-gold-800 font-bold">{item.product_code}</span>
                      <span>{formatDimensions(item.height)}</span>
                    </div>

                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-serif font-bold text-lg text-temple-950 hover:text-gold-700 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-sand-700 mt-1">{item.material}</p>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-sand-200 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-sand-600">Price</span>
                      <span className="font-serif text-lg font-bold text-temple-950">
                        {formatPrice(item.price, item.price_on_request)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="gold"
                        size="sm"
                        className="text-xs font-bold"
                        onClick={() => setSelectedProductForOrder(item)}
                      >
                        Order Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setSelectedProductForEnquiry(item)}
                      >
                        Enquire
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl p-12 sm:p-16 border border-sand-300 shadow-sm text-center max-w-lg mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-sand-500">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-temple-950">
                Your wishlist is waiting for something special.
              </h3>
              <p className="text-xs sm:text-sm text-sand-700 mt-2 leading-relaxed">
                Explore our handcrafted Murugan, Nataraja, Vinayagar, and Amman statues and click the heart icon on any idol to save it here for later.
              </p>
            </div>
            <div className="pt-2">
              <Link to="/god-statues">
                <Button variant="gold" size="lg" className="shadow-gold-sm">
                  EXPLORE GOD STATUES <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Modals for Order & Enquiry from Wishlist */}
      {selectedProductForOrder && (
        <OrderDrawer
          isOpen={Boolean(selectedProductForOrder)}
          onClose={() => setSelectedProductForOrder(null)}
          product={selectedProductForOrder}
        />
      )}

      {selectedProductForEnquiry && (
        <EnquiryModal
          isOpen={Boolean(selectedProductForEnquiry)}
          onClose={() => setSelectedProductForEnquiry(null)}
          product={selectedProductForEnquiry}
        />
      )}
    </div>
  );
};
