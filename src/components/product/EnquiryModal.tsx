import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy } from 'lucide-react';
import type { Product, Enquiry } from '@/types';
import { generateRequestId, copyToClipboard, createWhatsAppUrl } from '@/lib/utils';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { useToast } from '@/context/ToastContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, product }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [message, setMessage] = useState(
    product ? `Namaste, I would like to enquire about the ${product.name} (Code: ${product.product_code}).` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);

  const { success, error: toastError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !message.trim()) {
      toastError('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const requestId = generateRequestId('enquiry');
      const enqData: Omit<Enquiry, 'id' | 'created_at' | 'updated_at'> = {
        request_id: requestId,
        product_id: product?.id,
        product_name: product?.name || 'General Sculpture Consultation',
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_whatsapp: customerWhatsApp || customerPhone,
        customer_email: customerEmail,
        message,
        status: 'New',
        email_notified: false,
        whatsapp_notified: false,
      };

      const saved = await db.createEnquiry(enqData);

      // Background notification
      sendAdminNotifications({
        requestId,
        type: 'Enquiry',
        customerName,
        customerPhone,
        customerWhatsApp: customerWhatsApp || customerPhone,
        customerEmail,
        productName: product?.name,
        material: product?.material,
        message,
      }).catch((err) => console.warn('Background notification error', err));

      setSubmittedEnquiry(saved);
      success('Your enquiry has been received. Our master artisan will contact you.');
    } catch (err: any) {
      toastError(err?.message || 'Failed to submit enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submittedEnquiry?.request_id) {
      copyToClipboard(submittedEnquiry.request_id);
      success(`Copied Enquiry ID: ${submittedEnquiry.request_id}`);
    }
  };

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappChatUrl = submittedEnquiry
    ? createWhatsAppUrl(
        adminWhatsApp,
        `Namaste Vetri Arts, I submitted an enquiry (ID: ${submittedEnquiry.request_id}) for ${submittedEnquiry.product_name}. Name: ${submittedEnquiry.customer_name}`
      )
    : '';

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSubmittedEnquiry(null);
        onClose();
      }}
      title={submittedEnquiry ? undefined : 'Enquire About Statue'}
      subtitle={submittedEnquiry ? undefined : product ? `${product.name} (${product.product_code})` : 'Direct consultation with master sthapathi'}
      maxWidth="md"
    >
      {submittedEnquiry ? (
        <div className="text-center py-4 space-y-5">
          <div className="w-14 h-14 bg-emerald-100 border border-emerald-500 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold text-temple-950">
              Your Enquiry Has Been Received
            </h4>
            <p className="text-xs text-sand-700 mt-1.5 leading-relaxed">
              Our team will review your specifications and reach out via WhatsApp/Phone shortly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sand-100 border border-gold-500/30 flex items-center justify-between text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-sand-600 block">Enquiry Reference</span>
              <span className="font-mono text-sm font-bold text-temple-900">{submittedEnquiry.request_id}</span>
            </div>
            <button
              onClick={handleCopyId}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gold-800 bg-gold-100 px-2.5 py-1 rounded-md"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href={whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                setSubmittedEnquiry(null);
                onClose();
              }}
            >
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Anandha Krishnan"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-gold-500 text-sm bg-white"
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
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-gold-500 text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="Optional"
                value={customerWhatsApp}
                onChange={(e) => setCustomerWhatsApp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-gold-500 text-sm bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-gold-500 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
              Enquiry / Questions *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Ask about dimensions, panchaloha purity, delivery timelines, or custom modifications..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sand-300 focus:ring-2 focus:ring-gold-500 text-sm bg-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="gold" size="sm" type="submit" isLoading={isSubmitting}>
              Submit Enquiry
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
