import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Copy,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Upload,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Product, Order } from '@/types';
import { formatPrice, generateRequestId, copyToClipboard, createWhatsAppUrl } from '@/lib/utils';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { uploadImageFile } from '@/lib/storage';
import { useToast } from '@/context/ToastContext';
import { Button } from '../common/Button';

export interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({ isOpen, onClose, product }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  // Form State
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  // Customization Options
  const [preferredSize, setPreferredSize] = useState(`${product.height}" Height (Standard)`);
  const [preferredMaterial, setPreferredMaterial] = useState(product.material);
  const [preferredFinish, setPreferredFinish] = useState(product.finish || 'Traditional Antique Patina');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [referencePreview, setReferencePreview] = useState<string>('');

  const { success, error: toastError } = useToast();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReferenceFile(file);
      const res = await uploadImageFile(file, 'orders');
      if (res.url) {
        setReferencePreview(res.url);
      }
    }
  };

  const handleNext = () => {
    if (step === 2) {
      if (!customerName.trim() || !customerPhone.trim() || !deliveryLocation.trim()) {
        toastError('Please fill in your Name, Phone Number, and Delivery Location.');
        return;
      }
    }
    setStep((prev) => (prev < 4 ? ((prev + 1) as any) : prev));
  };

  const handlePrev = () => {
    setStep((prev) => (prev > 1 ? ((prev - 1) as any) : prev));
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    try {
      const requestId = generateRequestId('order');
      const estimatedTotal = product.price_on_request ? 0 : product.price * quantity;

      const orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'> = {
        request_id: requestId,
        product_id: product.id,
        product_name: product.name,
        quantity,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_whatsapp: customerWhatsApp || customerPhone,
        customer_email: customerEmail,
        delivery_location: deliveryLocation,
        preferred_size: preferredSize,
        preferred_material: preferredMaterial,
        preferred_finish: preferredFinish,
        special_requirements: specialRequirements,
        reference_image_url: referencePreview,
        estimated_total: estimatedTotal,
        price_on_request: product.price_on_request,
        status: 'Received',
        email_notified: false,
        whatsapp_notified: false,
      };

      // 1. Primary Save to Database
      const saved = await db.createOrder(orderData);

      // 2. Dispatch Notifications in Background (Fail-safe)
      sendAdminNotifications({
        requestId,
        type: 'Order',
        customerName,
        customerPhone,
        customerWhatsApp: customerWhatsApp || customerPhone,
        customerEmail,
        productName: product.name,
        material: preferredMaterial,
        size: preferredSize,
        quantity,
        location: deliveryLocation,
        message: specialRequirements,
        referenceImagesCount: referencePreview ? 1 : 0,
      }).catch((e) => console.warn('Background notification dispatch error', e));

      // Trigger Confetti Delight
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F3DA89', '#C85A32', '#2C1810'],
        });
      } catch {}

      setSubmittedOrder(saved);
      success('Your order request has been submitted successfully!');
    } catch (err: any) {
      toastError(err?.message || 'Failed to submit order request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRequestId = () => {
    if (submittedOrder?.request_id) {
      copyToClipboard(submittedOrder.request_id);
      success(`Copied Request ID: ${submittedOrder.request_id}`);
    }
  };

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappOrderChatUrl = submittedOrder
    ? createWhatsAppUrl(
        adminWhatsApp,
        `Namaste Vetri Arts & Crafts, I have submitted an Order Request (ID: ${submittedOrder.request_id}) for "${submittedOrder.product_name}". Customer: ${submittedOrder.customer_name}`
      )
    : '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-temple-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full max-w-xl bg-[#FAF8F5] shadow-2xl z-10 flex flex-col h-full border-l border-gold-500/30 overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-sand-300 bg-sand-100/90 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-200 text-gold-900 px-2 py-0.5 rounded">
                Direct Order Request
              </span>
              <span className="text-xs text-sand-600">Zero Login Required</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-temple-900 mt-0.5">
              {submittedOrder ? 'Order Request Confirmation' : `Order: ${product.name}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-sand-600 hover:text-temple-900 hover:bg-sand-200"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Bar (if not submitted yet) */}
        {!submittedOrder && (
          <div className="px-6 py-3 bg-sand-50 border-b border-sand-200 flex items-center justify-between text-xs">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                    step === s
                      ? 'bg-gold-500 text-temple-950 ring-2 ring-gold-400/40'
                      : step > s
                      ? 'bg-temple-800 text-gold-300'
                      : 'bg-sand-200 text-sand-600'
                  }`}
                >
                  {s}
                </span>
                <span className={`hidden sm:inline font-medium ${step === s ? 'text-temple-900 font-bold' : 'text-sand-600'}`}>
                  {s === 1 ? 'Product' : s === 2 ? 'Details' : s === 3 ? 'Custom' : 'Review'}
                </span>
                {s < 4 && <span className="text-sand-300 ml-1">→</span>}
              </div>
            ))}
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {submittedOrder ? (
            /* SUCCESS VIEW */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-500 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-temple-950">
                  Your Order Request Has Been Received
                </h4>
                <p className="text-xs text-sand-700 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-temple-900">{submittedOrder.customer_name}</strong>. Our hereditary sthapathi will contact you within 24 hours to confirm casting timelines, consecration details, and logistics.
                </p>
              </div>

              {/* Request ID Display Card */}
              <div className="p-5 rounded-2xl bg-sand-100 border border-gold-500/40 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sand-600 font-medium">Sacred Order Reference</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    Status: Received
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-sand-300">
                  <span className="font-mono text-base font-bold text-temple-900 tracking-wider">
                    {submittedOrder.request_id}
                  </span>
                  <button
                    onClick={handleCopyRequestId}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold-700 hover:text-gold-800 bg-gold-100 px-2.5 py-1 rounded-md transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy ID</span>
                  </button>
                </div>

                <div className="text-xs text-sand-700 space-y-1 pt-1 border-t border-sand-200">
                  <p><strong>Product:</strong> {submittedOrder.product_name}</p>
                  <p><strong>Quantity:</strong> {submittedOrder.quantity}</p>
                  <p><strong>Delivery Location:</strong> {submittedOrder.delivery_location}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappOrderChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-transform hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Us Regarding Order</span>
                </a>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={onClose}
                >
                  Continue Browsing Creations
                </Button>
              </div>
            </div>
          ) : (
            /* STEP BY STEP FORM */
            <>
              {/* STEP 1: Product Confirmation */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex gap-4 p-4 rounded-2xl bg-sand-100 border border-sand-300">
                    <img
                      src={product.primary_image || product.images?.[0]?.image_url}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-xl border border-gold-500/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-gold-700 font-bold bg-gold-100 px-1.5 py-0.5 rounded">
                        {product.product_code}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-temple-900 mt-1 line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-xs text-sand-700 mt-0.5">{product.material}</p>
                      <p className="text-xs font-bold text-temple-950 font-serif mt-2">
                        {formatPrice(product.price, product.price_on_request)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-sand-300">
                    <div>
                      <label className="text-sm font-semibold text-temple-900 block">Quantity</label>
                      <span className="text-xs text-sand-600">Select number of sacred idols</span>
                    </div>
                    <div className="flex items-center border border-sand-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-9 h-9 flex items-center justify-center bg-sand-100 hover:bg-sand-200 text-temple-900 font-bold"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-temple-900">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-9 h-9 flex items-center justify-center bg-sand-100 hover:bg-sand-200 text-temple-900 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gold-50 border border-gold-300/60 text-xs text-temple-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-gold-900">
                      <ShieldCheck className="w-4 h-4 text-gold-600" />
                      <span>Shilpa Shastra Guarantee</span>
                    </div>
                    <p className="text-sand-700">
                      Each murti is individually cast and chiselled with authentic iconometry before sacred delivery.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: Customer Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sundaramurthy S."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Same as phone or custom"
                        value={customerWhatsApp}
                        onChange={(e) => setCustomerWhatsApp(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                      Delivery Location (City, State / Country) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chennai, Tamil Nadu (or Singapore / USA)"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Customization & Reference */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                      Preferred Height / Size
                    </label>
                    <input
                      type="text"
                      value={preferredSize}
                      onChange={(e) => setPreferredSize(e.target.value)}
                      placeholder="e.g. 24 inches, 36 inches, or sanctum custom size"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                      Preferred Sacred Material
                    </label>
                    <select
                      value={preferredMaterial}
                      onChange={(e) => setPreferredMaterial(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                    >
                      <option value="Panchaloha (5-Metal Sacred Alloy)">Panchaloha (5-Metal Sacred Alloy)</option>
                      <option value="Chola Lost-Wax Cast Bronze">Chola Lost-Wax Cast Bronze</option>
                      <option value="Traditional Solid Bronze">Traditional Solid Bronze</option>
                      <option value="Solid Pure Brass">Solid Pure Brass</option>
                      <option value="Monolithic Black Granite Stone">Monolithic Black Granite Stone</option>
                      <option value="Hand-Carved Teak Wood">Hand-Carved Teak Wood</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                      Preferred Polish / Finish
                    </label>
                    <select
                      value={preferredFinish}
                      onChange={(e) => setPreferredFinish(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                    >
                      <option value="Traditional Antique Patina">Traditional Antique Patina</option>
                      <option value="Temple Gold Polished Finish">Temple Gold Polished Finish</option>
                      <option value="Deep Bronze Temple Tone">Deep Bronze Temple Tone</option>
                      <option value="Natural Matte Krishna Shila">Natural Matte Krishna Shila</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                      Special Requirements / Sanctum Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Specific mudra posture, peedam height, inscription request..."
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white text-sm"
                    />
                  </div>

                  {/* Optional Reference Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                      Optional Reference Image (Altar photo / Temple design)
                    </label>
                    <div className="mt-1 flex items-center justify-center px-4 py-4 border-2 border-dashed border-sand-300 hover:border-gold-500 rounded-xl bg-sand-50 cursor-pointer">
                      <label className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-6 h-6 text-sand-500 mb-1" />
                        <span className="text-xs font-medium text-temple-800">
                          {referenceFile ? referenceFile.name : 'Upload altar or statue reference (JPG, PNG)'}
                        </span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review Order */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 space-y-2.5 text-xs text-temple-900">
                    <h4 className="font-serif font-bold text-sm text-temple-950 pb-2 border-b border-sand-300">
                      Summary of Your Request
                    </h4>
                    <p><strong>Item:</strong> {product.name}</p>
                    <p><strong>Quantity:</strong> {quantity}</p>
                    <p><strong>Customer:</strong> {customerName} ({customerPhone})</p>
                    <p><strong>Delivery Location:</strong> {deliveryLocation}</p>
                    <p><strong>Preferred Size:</strong> {preferredSize}</p>
                    <p><strong>Material &amp; Finish:</strong> {preferredMaterial} — {preferredFinish}</p>
                    {specialRequirements && <p><strong>Special Notes:</strong> {specialRequirements}</p>}
                  </div>

                  {/* Price Estimate Card */}
                  <div className="p-4 rounded-2xl bg-white border border-gold-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sand-700">Estimated Total:</span>
                      <span className="font-serif text-lg font-bold text-temple-950">
                        {product.price_on_request
                          ? 'Price Confirmed upon Consultation'
                          : formatPrice(product.price * quantity)}
                      </span>
                    </div>
                    <p className="text-[11px] text-sand-600 leading-snug">
                      Includes traditional lost-wax mould crafting, chiselling, and insured wooden crate packing.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!submittedOrder && (
          <div className="p-5 border-t border-sand-300 bg-sand-100/90 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button variant="outline" size="md" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </Button>
            ) : (
              <Button variant="ghost" size="md" onClick={onClose}>
                Cancel
              </Button>
            )}

            {step < 4 ? (
              <Button variant="gold" size="md" onClick={handleNext}>
                Continue <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                variant="gold"
                size="md"
                isLoading={isSubmitting}
                onClick={handleSubmitOrder}
              >
                Submit Order Request
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
