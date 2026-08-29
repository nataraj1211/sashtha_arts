import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  Ruler,
  Scale,
  Award,
  Truck,
} from 'lucide-react';
import { db } from '@/lib/supabase';
import { useWishlist } from '@/context/WishlistContext';
import { ProductImageViewer } from '@/components/product/ProductImageViewer';
import { OrderDrawer } from '@/components/product/OrderDrawer';
import { EnquiryModal } from '@/components/product/EnquiryModal';
import { formatPrice, createWhatsAppUrl, copyToClipboard } from '@/lib/utils';
import type { Product } from '@/types';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      db.getProductBySlug(slug)
        .then((data) => {
          setProduct(data);
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-sand-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-temple-900 text-sm">Loading sacred sculpture details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-sand-50">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-temple-950">Statue Not Found</h2>
          <p className="text-xs sm:text-sm text-sand-700">
            The requested sacred vigraham could not be found or has been moved.
          </p>
          <Link
            to="/god-statues"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-xs shadow-gold-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Statue Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    `Namaste Sashtha Arts & Crafts, I am enquiring about the ${product.name} (Code: ${product.product_code}).`
  );

  const handleShare = () => {
    copyToClipboard(window.location.href);
    alert('Product link copied to clipboard.');
  };

  return (
    <div className="min-h-screen bg-sand-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-sand-600">
          <Link to="/" className="hover:text-temple-950">
            Home
          </Link>
          <span>/</span>
          <Link to="/god-statues" className="hover:text-temple-950">
            God Statues
          </Link>
          <span>/</span>
          <span className="text-temple-950 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Grid: Gallery (Left) + Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery with 4-Side Views */}
          <div className="lg:col-span-7">
            <ProductImageViewer images={product.images} productName={product.name} />
          </div>

          {/* Details & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Code: {product.product_code}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2 rounded-full border transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 border-red-300 text-red-600'
                        : 'bg-white border-sand-300 text-sand-700 hover:text-temple-950'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-white border border-sand-300 text-sand-700 hover:text-temple-950 transition-colors"
                    title="Share Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-temple-950 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-sand-600 font-medium">
                Sculpted in {product.material} • Heritage Swamimalai Craft
              </p>
            </div>

            {/* Pricing / Value */}
            <div className="p-4 rounded-2xl bg-white border border-sand-300 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-sand-600 block">Artisan Price</span>
                <span className="font-serif text-2xl font-bold text-temple-950">
                  {formatPrice(product.price, product.price_on_request)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-sand-600 block">Availability</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {product.availability === 'in_stock' ? 'In Stock (Ready to Dispatch)' : 'Handcrafted on Order'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-sand-700 leading-relaxed bg-white p-5 rounded-2xl border border-sand-300">
              <h3 className="font-serif font-bold text-sm text-temple-950 mb-2">Artisan Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Dimensions & Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-sand-300">
                <Ruler className="w-4 h-4 text-gold-700 mx-auto mb-1" />
                <span className="text-[10px] text-sand-600 uppercase font-bold block">Height</span>
                <span className="font-bold text-xs text-temple-950">{product.height}&quot; Inches</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-sand-300">
                <Scale className="w-4 h-4 text-gold-700 mx-auto mb-1" />
                <span className="text-[10px] text-sand-600 uppercase font-bold block">Weight</span>
                <span className="font-bold text-xs text-temple-950">{product.weight || '18'} kg Approx</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-sand-300">
                <Award className="w-4 h-4 text-gold-700 mx-auto mb-1" />
                <span className="text-[10px] text-sand-600 uppercase font-bold block">Finish</span>
                <span className="font-bold text-xs text-temple-950 truncate block">{product.finish}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-sand-300">
                <Truck className="w-4 h-4 text-gold-700 mx-auto mb-1" />
                <span className="text-[10px] text-sand-600 uppercase font-bold block">Crate</span>
                <span className="font-bold text-xs text-temple-950">ISPM-15 Wood</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setOrderDrawerOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-sm shadow-gold-sm transition-transform hover:scale-[1.01]"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Request to Order This Statue</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Artisan</span>
                </a>

                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-sand-300 hover:bg-sand-100 text-temple-950 font-bold text-xs transition-colors"
                >
                  <span>Custom Inquiries</span>
                </button>
              </div>
            </div>

            {/* Authenticity Guarantee Card */}
            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 space-y-2 text-xs text-sand-700">
              <div className="flex items-center gap-2 font-bold text-temple-950">
                <ShieldCheck className="w-4 h-4 text-gold-700" />
                <span>Authentic Shilpa Shastra Consecration Guarantee</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Every sculpture is accompanied by an authenticity certificate verifying metal purity, canonical iconometry, and lost-wax heritage casting provenance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <OrderDrawer
        isOpen={orderDrawerOpen}
        onClose={() => setOrderDrawerOpen(false)}
        product={product}
      />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        product={product}
      />
    </div>
  );
};
