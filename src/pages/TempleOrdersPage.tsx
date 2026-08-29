import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
  MessageCircle,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
} from 'lucide-react';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { createWhatsAppUrl } from '@/lib/utils';
import type { TempleOrder } from '@/types';

export const TempleOrdersPage: React.FC = () => {
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [consecrationDate, setConsecrationDate] = useState('');
  const [scopeSummary, setScopeSummary] = useState(
    'Moolavar Murti, Panchaloha Utsava Murtis, Sanctum Kavasam'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTempleOrder, setSubmittedTempleOrder] = useState<TempleOrder | null>(null);

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = submittedTempleOrder
    ? createWhatsAppUrl(
        adminWhatsApp,
        `Namaste Sashtha Arts & Crafts, I have submitted a Temple Project Enquiry (ID: ${submittedTempleOrder.request_id}) for ${submittedTempleOrder.organization_name}. Contact: ${submittedTempleOrder.contact_person}`
      )
    : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !contactPerson.trim() || !phone.trim() || !location.trim()) {
      alert('Please fill in Organization Name, Contact Person, Phone, and Temple Location.');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await db.createTempleOrder({
        organization_name: orgName.trim(),
        contact_person: contactPerson.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        location: location.trim(),
        consecration_date: consecrationDate || undefined,
        scope_summary: scopeSummary,
        notes: notes.trim() || undefined,
      });

      sendAdminNotifications({
        requestId: order.request_id || order.id,
        type: 'Temple Order',
        customerName: contactPerson.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        location: location.trim(),
        message: `${scopeSummary}. Notes: ${notes.trim() || 'None'}`,
      });

      setSubmittedTempleOrder(order);
    } catch {
      alert('Failed to submit temple order. Please connect with us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submittedTempleOrder?.request_id) {
      navigator.clipboard.writeText(submittedTempleOrder.request_id);
      alert(`Copied Temple Request ID: ${submittedTempleOrder.request_id}`);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kumbhabhishekam &amp; Temple Trusts</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Temple Sanctum &amp; Bulk Projects
          </h1>
          <p className="text-sand-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Direct hereditary sthapathi foundry execution for temple trusts worldwide: Moolavar granite murtis, Panchaloha Utsava vigrahams, brass sanctum cladding (Kavasam), and bronze lamps.
          </p>
        </div>

        {submittedTempleOrder ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-500/40 shadow-temple-lg text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-temple-950">
                Temple Project Registration Received
              </h3>
              <p className="text-sand-700 text-xs sm:text-sm mt-2 max-w-md mx-auto">
                Thank you, {submittedTempleOrder.contact_person}. Our senior Chief Sthapathi will personally review your temple consecration requirements and reach out on WhatsApp.
              </p>
            </div>

            <div className="p-4 bg-sand-100 rounded-2xl max-w-sm mx-auto border border-sand-300 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-sand-600 uppercase block">Temple Project Ref ID</span>
                <span className="font-mono text-base font-bold text-temple-900">{submittedTempleOrder.request_id}</span>
              </div>
              <button
                onClick={handleCopyId}
                className="p-2 rounded-lg bg-gold-100 text-gold-800 hover:bg-gold-200"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss with Chief Sthapathi on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setSubmittedTempleOrder(null);
                  setNotes('');
                }}
                className="px-6 py-3.5 rounded-xl border border-sand-300 hover:bg-sand-100 text-temple-950 font-bold text-xs"
              >
                Submit Another Project
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-300 shadow-sm space-y-8">
            {/* Temple Trust Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-temple-950 font-serif font-bold text-lg border-b border-sand-200 pb-2">
                <Building2 className="w-5 h-5 text-gold-700" />
                <span>1. Temple Trust &amp; Organization Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Temple / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Balasubramanya Swamy Temple Trust"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Temple Location (Town, State, Country) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Palani, Tamil Nadu / Kuala Lumpur, Malaysia"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Contact Person / Trustee Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thiru. Ramanathan"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Phone / WhatsApp Number *
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="templetrust@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Consecration / Muhurtham Target Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Thai Poosam 2027 or Specific Muhurtham"
                    value={consecrationDate}
                    onChange={(e) => setConsecrationDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-temple-950 font-serif font-bold text-lg border-b border-sand-200 pb-2">
                <Layers className="w-5 h-5 text-gold-700" />
                <span>2. Temple Scope &amp; Sanctum Requirements</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Required Sculptures &amp; Castings
                </label>
                <select
                  value={scopeSummary}
                  onChange={(e) => setScopeSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500 bg-white"
                >
                  <option value="Complete Sanctum Suite (Moolavar + Utsava Murtis + Kavasam)">
                    Complete Sanctum Suite (Moolavar + Utsava Murtis + Kavasam)
                  </option>
                  <option value="Moolavar Sanctum Granite Murtis (Black Krishna Shila)">
                    Moolavar Sanctum Granite Murtis (Black Krishna Shila)
                  </option>
                  <option value="Panchaloha Utsava Murtis with Prabhavali Arches">
                    Panchaloha Utsava Murtis with Prabhavali Arches
                  </option>
                  <option value="Brass / Copper Sanctum Cladding & Kavasam">
                    Brass / Copper Sanctum Cladding &amp; Kavasam
                  </option>
                  <option value="Bulk Temple Oil Deepams, Bells & Ritual Brassware">
                    Bulk Temple Oil Deepams, Bells &amp; Ritual Brassware
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Project Details &amp; Agamic Specifications
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail the deity dimensions (e.g., 5-foot Moolavar Murugan, Valli Devasena Utsavars, Navagraha set), temple sanctum drawing notes, or installation assistance requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-sm shadow-gold-sm transition-transform hover:scale-[1.01] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Temple Project...' : 'Submit Temple Project Enquiry'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
