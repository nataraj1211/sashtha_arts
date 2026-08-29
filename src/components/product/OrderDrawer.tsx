import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ShieldCheck, CheckCircle2, Copy, MessageCircle } from 'lucide-react';
import type { Product, Order } from '@/types';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { formatPrice, createWhatsAppUrl } from '@/lib/utils';

export interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [country, setCountry] = useState('India');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = submittedOrder
    ? createWhatsAppUrl(
        adminWhatsApp,
        `Namaste Sashtha Arts & Crafts, I have submitted an Order Request (Ref: ${submittedOrder.request_id || submittedOrder.order_number}) for ${submittedOrder.product_name}. Customer: ${submittedOrder.customer_name}`
      )
    : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    try {
      const order = await db.createOrder({
        product_id: product?.id,
        product_name: product?.name || 'Handcrafted Deity Statue',
        product_code: product?.product_code,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || undefined,
        delivery_address: address.trim(),
        delivery_location: `${city.trim()}, ${state.trim()}`,
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        postal_code: postalCode.trim(),
        notes: notes.trim() || undefined,
        total_amount: product?.price,
      });

      sendAdminNotifications({
        requestId: order.request_id || order.id,
        type: 'Order',
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        productName: product?.name,
        location: `${city.trim()}, ${state.trim()}`,
        message: notes.trim() || undefined,
      });

      setSubmittedOrder(order);
    } catch {
      alert('Failed to submit order request. Please contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedOrder(null);
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={handleReset}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl z-10 flex flex-col h-full overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-6 border-b border-sand-300 flex items-center justify-between bg-sand-50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-temple-950">
                Statue Order Request
              </h3>
              <p className="text-xs text-sand-600">Zero Online Payment • Artisan Verification</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-full text-sand-500 hover:text-temple-950 hover:bg-sand-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">
          {submittedOrder ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-temple-950">
                  Order Request Placed
                </h4>
                <p className="text-xs sm:text-sm text-sand-700 mt-2">
                  Thank you, {submittedOrder.customer_name}. Our artisan will contact you to verify details, secure crate packing, and dispatch schedule.
                </p>
              </div>

              <div className="p-4 bg-sand-100 rounded-2xl max-w-xs mx-auto border border-sand-300 text-left">
                <span className="text-[10px] uppercase font-bold text-sand-600 block">Order Reference</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-mono text-base font-bold text-temple-950">
                    {submittedOrder.order_number}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(submittedOrder.order_number || submittedOrder.request_id || '')}
                    className="text-gold-700 hover:text-gold-900"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp Artisan</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl bg-sand-200 hover:bg-sand-300 text-temple-950 font-bold text-xs"
                >
                  Close &amp; Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Preview Card */}
              {product && (
                <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 flex items-center gap-4">
                  <img
                    src={product.primary_image || '/images/statues/murugan.jpg'}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-sand-300 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-temple-950 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-sand-600">
                      {product.material} • {product.height}&quot;
                    </p>
                    <p className="text-xs font-bold text-gold-800 mt-1">
                      {formatPrice(product.price, product.price_on_request)}
                    </p>
                  </div>
                </div>
              )}

              {/* Form Inputs */}
              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subramanian"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 93428 39218"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Sanctum / Door Number, Street, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Chennai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="600001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Special Notes / Consecration Date
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need auspicious delivery before Panguni Uthiram muhurtham..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-gold-50 border border-gold-300/60 flex items-start gap-3 text-xs text-gold-900">
                <ShieldCheck className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                <span>
                  No payment is charged today. Our team will contact you directly to confirm casting authenticity, wooden crate protection, and dispatch timeline.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-sm shadow-gold-sm transition-transform hover:scale-[1.02] disabled:opacity-50"
              >
                {isSubmitting ? 'Placing Request...' : 'Confirm Statue Order Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
