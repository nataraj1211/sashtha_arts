import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageSquare,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight,
  Ruler,
  Scale,
  Hammer,
  HelpCircle,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { db } from '@/lib/supabase';
import type { Product } from '@/types';
import { formatPrice, formatDimensions, formatWeight, createWhatsAppUrl, copyToClipboard } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { ProductImageViewer } from '@/components/product/ProductImageViewer';
import { OrderDrawer } from '@/components/product/OrderDrawer';
import { EnquiryModal } from '@/components/product/EnquiryModal';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'dimensions' | 'craft' | 'care' | 'shipping'>('desc');

  // Modals & Drawers
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success } = useToast();

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setIsLoading(true);
      const found = await db.getProductBySlug(slug);
      setProduct(found);

      if (found) {
        // Load related items
        const all = await db.getProducts();
        const related = all
          .filter((p) => p.id !== found.id && (p.deity === found.deity || p.material === found.material))
          .slice(0, 4);
        setRelatedProducts(related.length > 0 ? related : all.filter((p) => p.id !== found.id).slice(0, 4));
      }
      setIsLoading(false);
      window.scrollTo(0, 0);
    }
    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 text-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-serif text-temple-800">Loading Sacred Statue Creation...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-36 pb-24 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-temple-950">Statue Not Found</h2>
        <p className="text-sm text-sand-700">The requested creation may have been consecrated or moved.</p>
        <Link to="/god-statues">
          <Button variant="gold" size="md">
            Explore All God Statues
          </Button>
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    `Namaste Vetri Arts & Crafts, I am enquiring about the ${product.name} (Code: ${product.product_code}).`
  );

  const handleShare = () => {
    copyToClipboard(window.location.href);
    success('Product link copied to clipboard.');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-sand-700 mb-6 flex-wrap">
          <Link to="/" className="hover:text-gold-700">Home</Link>
          <ChevronRight className="w-3 h-3 text-sand-400" />
          <Link to="/god-statues" className="hover:text-gold-700">God Statues</Link>
          <ChevronRight className="w-3 h-3 text-sand-400" />
          <Link to={`/god-statues?deity=${product.deity}`} className="hover:text-gold-700 capitalize">
            {product.deity}
          </Link>
          <ChevronRight className="w-3 h-3 text-sand-400" />
          <span className="text-temple-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 4-Side Image Viewer System */}
          <div className="lg:col-span-7 sticky top-24">
            <ProductImageViewer images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Details & Order Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Product Code & Badges */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-gold-800 bg-gold-100 px-2.5 py-1 rounded-md border border-gold-300">
                  {product.product_code}
                </span>
                <div className="flex items-center gap-2">
                  {product.made_to_order ? (
                    <Badge variant="terracotta">Made to Order</Badge>
                  ) : (
                    <Badge variant="sand">In Stock</Badge>
                  )}
                  {product.customizable && <Badge variant="gold">Customizable</Badge>}
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-temple-950 leading-snug">
                {product.name}
              </h1>

              {/* Deity & Material summary */}
              <p className="text-sm text-sand-800 mt-1.5 flex items-center gap-2">
                <span className="font-semibold text-temple-900 capitalize">{product.deity}</span>
                <span>•</span>
                <span>{product.material}</span>
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-sand-300 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-sand-600 block">Pricing</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-temple-950">
                  {formatPrice(product.price, product.price_on_request)}
                </span>
              </div>
              <div className="text-right text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300">
                <span>100% Lost-Wax Cast</span>
              </div>
            </div>

            {/* Key Quick Specifications */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-sand-100/80 p-4 rounded-2xl border border-sand-300">
              <div>
                <span className="text-sand-600 block">Height / Dimensions</span>
                <span className="font-bold text-temple-900">{formatDimensions(product.height, product.width, product.depth)}</span>
              </div>
              <div>
                <span className="text-sand-600 block">Approx. Weight</span>
                <span className="font-bold text-temple-900">{formatWeight(product.weight)}</span>
              </div>
              <div>
                <span className="text-sand-600 block">Finish / Polish</span>
                <span className="font-bold text-temple-900">{product.finish || 'Traditional Antique'}</span>
              </div>
              <div>
                <span className="text-sand-600 block">Availability</span>
                <span className="font-bold text-temple-900 capitalize">{product.availability.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Main Action Buttons (Desktop & Tablet) */}
            <div className="space-y-3 pt-2">
              <Button
                variant="gold"
                size="lg"
                className="w-full text-sm sm:text-base font-bold shadow-gold-md"
                onClick={() => setIsOrderDrawerOpen(true)}
              >
                ORDER NOW (ZERO LOGIN)
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full border-emerald-600/70 text-emerald-800 hover:bg-emerald-50"
                    leftIcon={<MessageSquare className="w-4 h-4 text-emerald-600" />}
                  >
                    WhatsApp Us
                  </Button>
                </a>

                <Button
                  variant="temple"
                  size="md"
                  className="w-full"
                  onClick={() => setIsEnquiryOpen(true)}
                >
                  Quick Enquiry
                </Button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${
                    isWishlisted
                      ? 'text-rose-600 bg-rose-50 border border-rose-200'
                      : 'text-sand-700 hover:text-temple-900 bg-white border border-sand-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs text-sand-700 hover:text-temple-900 bg-white px-3 py-2 rounded-xl border border-sand-300 font-semibold"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Shilpa Shastra Authenticity Trust Box */}
            <div className="p-4 rounded-2xl bg-gold-50 border border-gold-400/40 text-xs text-temple-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-gold-900">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>Sanctum &amp; Puja Room Ready</span>
              </div>
              <p className="text-sand-700 leading-relaxed">
                Sculpted strictly following South Indian Shilpa Shastras with authentic 4-side facial and spinal proportions for enduring positive energy.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Materials, Dimensions, Crafting, Care, Shipping */}
        <div className="mt-16 bg-white rounded-3xl border border-sand-300 p-6 sm:p-10 shadow-sm">
          {/* Tab Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-sand-200 no-scrollbar">
            {[
              { id: 'desc', label: 'Sacred Description' },
              { id: 'materials', label: 'Materials & Iconography' },
              { id: 'dimensions', label: 'Dimensions & Weight' },
              { id: 'craft', label: 'Lost-Wax Crafting' },
              { id: 'care', label: 'Care & Maintenance' },
              { id: 'shipping', label: 'Wooden Crate Shipping' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-temple-900 text-gold-300 shadow-sm'
                    : 'text-sand-700 hover:text-temple-900 hover:bg-sand-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="pt-6 text-sm text-temple-800 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p className="text-base text-temple-900 font-serif leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-sand-200">
                  <div className="space-y-1">
                    <span className="font-bold text-temple-950 block">Deity Alignment</span>
                    <p className="text-xs text-sand-700">Adheres to Agama Shastra canonical dhyana shlokas.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-temple-950 block">Sanctum Consecration</span>
                    <p className="text-xs text-sand-700">Suitable for Prana Pratishtha and regular sacred Abhishekam.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-temple-950">
                  Material Composition: {product.material}
                </h4>
                <p>
                  Our metal sculptures are cast in authentic high-purity alloys. Panchaloha represents the cosmic pancha-bhutas (Earth, Water, Fire, Air, and Ether), harmonizing five divine metals (Gold, Silver, Copper, Zinc, and Lead) according to traditional scriptures.
                </p>
                <div className="p-4 rounded-xl bg-sand-100 border border-sand-300 text-xs text-sand-800 space-y-1">
                  <strong>Purity Pledge:</strong> We do not use scrap metal or hollow electroplated zinc cores. Every murti is solid, dense, and resonant.
                </div>
              </div>
            )}

            {activeTab === 'dimensions' && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-temple-950">
                  Iconometric Proportions &amp; Weight
                </h4>
                <table className="w-full text-left text-xs border border-sand-300 rounded-xl overflow-hidden">
                  <tbody className="divide-y divide-sand-200">
                    <tr className="bg-sand-100">
                      <td className="p-3 font-semibold text-temple-900 w-1/3">Height</td>
                      <td className="p-3">{product.height} inches ({Math.round(product.height * 2.54)} cm)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-temple-900">Width (Base / Armament)</td>
                      <td className="p-3">{product.width || 'Proportional'} inches</td>
                    </tr>
                    <tr className="bg-sand-100">
                      <td className="p-3 font-semibold text-temple-900">Depth (Peedam)</td>
                      <td className="p-3">{product.depth || 'Proportional'} inches</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-temple-900">Approximate Weight</td>
                      <td className="p-3">{formatWeight(product.weight)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'craft' && (
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-temple-950">
                  The Ancient Lost-Wax Process (Madhuchishtavidhana)
                </h4>
                <p>
                  Each murti is entirely hand-modelled in beeswax, encased in fine Cauvery riverbed clay, dewaxed by fire, and filled with molten consecrated alloy. Because the wax model is destroyed in the process, each cast is completely unique.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-temple-950">
                  Puja &amp; Maintenance Rituals
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-sand-800">
                  <li>Regular Abhishekam with holy water, milk, and honey is auspicious for Panchaloha and Bronze.</li>
                  <li>Clean brass and bronze gently using traditional tamarind paste, vibhuti (sacred ash), or specialized metal polish.</li>
                  <li>Avoid abrasive metallic scrubbers that could scratch hand-chased jewellery details.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-temple-950">
                  Reinforced Wooden Crate Delivery
                </h4>
                <p>
                  All Vetri Arts sculptures are encased in multilayer shock-absorbing foam and crated inside heavy wooden boxes to ensure zero damage during pan-India transit or international sea/air freight.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-temple-950">Related Sacred Creations</h3>
                <p className="text-xs text-sand-700">More sculptures of similar deity and material tradition</p>
              </div>
              <Link to={`/god-statues?deity=${product.deity}`} className="text-xs font-bold text-gold-800 hover:text-gold-900">
                View All {product.deity} Statues →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-14 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-sand-300 p-3 flex items-center gap-2 shadow-lg">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
          onClick={() => setIsEnquiryOpen(true)}
        >
          Enquire
        </Button>
        <Button
          variant="gold"
          size="sm"
          className="flex-1 text-xs font-bold shadow-gold-sm"
          onClick={() => setIsOrderDrawerOpen(true)}
        >
          ORDER NOW
        </Button>
      </div>

      {/* Order Drawer (4-Step Wizard) */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        product={product}
      />

      {/* Quick Enquiry Drawer */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={product}
      />
    </div>
  );
};
