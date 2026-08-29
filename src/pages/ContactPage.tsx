import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { createWhatsAppUrl } from '@/lib/utils';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    'hi Sashtha Arts & Crafts, I would like to consult with your artisan.'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const enquiry = await db.createEnquiry({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || undefined,
        message: message.trim(),
      });

      sendAdminNotifications({
        requestId: enquiry.id,
        type: 'Contact',
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        message: message.trim(),
      });

      setSubmittedRequestId(enquiry.id);
    } catch {
      alert('Failed to submit enquiry. Please contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submittedRequestId) {
      navigator.clipboard.writeText(submittedRequestId);
      alert('Reference ID copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 pt-28 pb-20">
      {/* Top Banner */}
      <div className="container mx-auto px-4 max-w-5xl mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get in Touch Directly</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950 mb-4">
          Contact Our Heritage Artisan
        </h1>
        <p className="text-sand-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Whether you seek a customized idol, large-scale temple sthapati work, or want to inquire about custom metal casting, we are ready to guide you.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-sand-300 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-xl text-temple-950">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-temple-900">
                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Fastest Response</span>
                    <span className="font-bold text-emerald-950">WhatsApp: +91 93428 39218</span>
                  </div>
                </a>

                {/* Telephone */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-sand-100 border border-sand-300">
                  <div className="w-10 h-10 rounded-xl bg-temple-900 text-gold-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sand-600 block">Artisan Phone Line</span>
                    <span className="font-bold text-temple-950">+91 93428 39218</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-sand-100 border border-sand-300">
                  <div className="w-10 h-10 rounded-xl bg-temple-900 text-gold-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sand-600 block">Official Enquiries</span>
                    <span className="font-bold text-temple-950">contact@sashthaarts.com</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-sand-100 border border-sand-300">
                  <div className="w-10 h-10 rounded-xl bg-temple-900 text-gold-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sand-600 block">Heritage Workshop</span>
                    <span className="font-medium text-temple-900">
                      Sashtha Arts & Crafts / Dindigul - 624005, Tamil Nadu, India
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-sand-100 border border-sand-300">
                  <div className="w-10 h-10 rounded-xl bg-temple-900 text-gold-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sand-600 block">Consultation Hours</span>
                    <span className="font-medium text-temple-900">
                      Monday to Saturday: 9:00 AM – 8:00 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Instagram link */}
              <div className="pt-2">
                <a
                  href="https://instagram.com/sashthaartsncrafts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-pink-700 hover:bg-pink-800 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow @sashthaartsncrafts on Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            {submittedRequestId ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-500/40 shadow-temple-lg text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-500 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-temple-950">
                    Your Message Has Been Received
                  </h3>
                  <p className="text-xs sm:text-sm text-sand-700 mt-1.5 leading-relaxed">
                    Thank you. Our master artisan will get back to you via WhatsApp or phone shortly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 max-w-sm mx-auto flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-sand-600 uppercase block">Reference ID</span>
                    <span className="font-mono text-base font-bold text-temple-900">{submittedRequestId}</span>
                  </div>
                  <button
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gold-800 bg-gold-100 px-3 py-1.5 rounded-lg"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedRequestId(null);
                      setMessage('');
                    }}
                    className="px-6 py-3 rounded-xl border border-sand-300 hover:bg-sand-100 font-bold text-xs text-temple-950"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-300 shadow-sm space-y-5">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-temple-950">Send an Online Enquiry</h3>
                  <p className="text-xs text-sand-700 mt-1">
                    Fill in your details below and our team will get in touch with you.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meenakshisundaram"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 93428 39218"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your deity statue requirements, sanctum dimensions, or temple project questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-sm shadow-gold-sm transition-transform hover:scale-[1.01] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
