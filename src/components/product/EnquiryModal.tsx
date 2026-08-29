import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, CheckCircle2, Copy } from 'lucide-react';
import type { Product } from '@/types';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { createWhatsAppUrl } from '@/lib/utils';

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    product
      ? `Namaste Sashtha Arts & Crafts, I am enquiring about ${product.name} (Code: ${product.product_code}).`
      : 'Namaste Sashtha Arts & Crafts, I would like to make an enquiry.'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      const enquiry = await db.createEnquiry({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || undefined,
        message: message.trim() || `Enquiry for ${product?.name || 'Handcrafted Murti'}`,
        product_id: product?.id,
        product_name: product?.name,
        product_code: product?.product_code,
      });

      sendAdminNotifications({
        requestId: enquiry.id,
        type: 'Enquiry',
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        productName: product?.name,
        message: message.trim() || `Product Code: ${product?.product_code || 'N/A'}`,
      });

      setSubmittedId(enquiry.id);
    } catch {
      alert('Failed to submit enquiry. Please try WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedId(null);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-sand-300 z-10"
        >
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 rounded-full text-sand-500 hover:text-temple-950 hover:bg-sand-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {submittedId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-temple-950">
                Enquiry Sent Directly to Artisan
              </h3>
              <p className="text-xs sm:text-sm text-sand-700 max-w-sm mx-auto">
                Thank you, {name}. Our master sthapathi has received your enquiry and will connect with you via WhatsApp or phone.
              </p>

              <div className="p-3 bg-sand-100 rounded-xl max-w-xs mx-auto text-xs flex items-center justify-between font-mono text-temple-900 font-bold">
                <span>Ref ID: {submittedId}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(submittedId)}
                  className="text-gold-700 hover:text-gold-900"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Direct</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-sand-200 hover:bg-sand-300 text-temple-950 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold-700">
                  Direct Sthapathi Consultation
                </span>
                <h3 className="font-serif text-2xl font-bold text-temple-950">
                  Enquire About Statue
                </h3>
                {product && (
                  <p className="text-xs text-sand-600 mt-1 font-medium">
                    {product.name} ({product.product_code})
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meenakshisundaram"
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
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Enquiry / Custom Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Ask about dimensions, panchaloha casting ratio, temple consecration, or shipping details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Or Ask via WhatsApp</span>
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-xs shadow-gold-sm transition-transform hover:scale-105 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
