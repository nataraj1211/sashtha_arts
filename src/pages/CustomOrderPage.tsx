import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
  MessageCircle,
  ShieldCheck,
  Hammer,
  Layers,
} from 'lucide-react';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { createWhatsAppUrl } from '@/lib/utils';
import type { CustomOrder } from '@/types';

export const CustomOrderPage: React.FC = () => {
  const [deity, setDeity] = useState('murugan');
  const [height, setHeight] = useState('24');
  const [material, setMaterial] = useState('Panchaloha (5-Metal Alloy)');
  const [finish, setFinish] = useState('Antique Temple Patina');
  const [sanctumType, setSanctumType] = useState('Home Sanctum / Pooja Room');
  const [budgetRange, setBudgetRange] = useState('₹50,000 – ₹1,00,000');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CustomOrder | null>(null);

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = submittedOrder
    ? createWhatsAppUrl(
        adminWhatsApp,
        `Namaste Sashtha Arts & Crafts, I have submitted a Custom Statue Commission Request (ID: ${submittedOrder.request_id}) for a ${submittedOrder.deity} idol. Customer: ${submittedOrder.customer_name}`
      )
    : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await db.createCustomOrder({
        deity,
        preferred_height: height,
        preferred_material: material,
        finish_preference: finish,
        sanctum_type: sanctumType,
        budget_range: budgetRange,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || undefined,
        notes: notes.trim() || undefined,
      });

      sendAdminNotifications({
        requestId: order.request_id || order.id,
        type: 'Custom Order',
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        material,
        size: `${height} inches`,
        message: notes.trim() || `Deity: ${deity}, Sanctum: ${sanctumType}`,
      });

      setSubmittedOrder(order);
    } catch {
      alert('Failed to submit custom commission. Please connect with us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submittedOrder?.request_id) {
      navigator.clipboard.writeText(submittedOrder.request_id);
      alert(`Copied Custom Request ID: ${submittedOrder.request_id}`);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Shilpa Shastra Sculpting</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Commission a Custom Sacred Idol
          </h1>
          <p className="text-sand-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Specify deity posture, sacred ayudhas, talamana proportions, and noble metals. Our master sthapatis will sculpt and cast your divine vigraham with hereditary mastery.
          </p>
        </div>

        {submittedOrder ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-500/40 shadow-temple-lg text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-temple-950">
                Custom Commission Received
              </h3>
              <p className="text-sand-700 text-xs sm:text-sm mt-2 max-w-md mx-auto">
                Thank you, {submittedOrder.customer_name}. Our senior master sculptor will review your specifications and connect with you on WhatsApp with 3D drawing estimates.
              </p>
            </div>

            <div className="p-4 bg-sand-100 rounded-2xl max-w-sm mx-auto border border-sand-300 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold text-sand-600 uppercase block">Custom Request ID</span>
                <span className="font-mono text-base font-bold text-temple-900">{submittedOrder.request_id}</span>
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
                <span>Discuss on WhatsApp Directly</span>
              </a>
              <button
                onClick={() => {
                  setSubmittedOrder(null);
                  setNotes('');
                }}
                className="px-6 py-3.5 rounded-xl border border-sand-300 hover:bg-sand-100 text-temple-950 font-bold text-xs"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-300 shadow-sm space-y-8">
            {/* Step 1: Deity & Dimensions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-temple-950 font-serif font-bold text-lg border-b border-sand-200 pb-2">
                <Hammer className="w-5 h-5 text-gold-700" />
                <span>1. Sacred Deity &amp; Proportions</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Deity
                  </label>
                  <select
                    value={deity}
                    onChange={(e) => setDeity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500 bg-white"
                  >
                    <option value="murugan">Lord Murugan / Swaminatha</option>
                    <option value="vinayagar">Maha Vinayagar / Ganesha</option>
                    <option value="shiva">Lord Nataraja / Shiva</option>
                    <option value="amman">Sri Mariamman / Devi Durga</option>
                    <option value="perumal">Lord Venkateswara Perumal</option>
                    <option value="krishna">Sri Venugopala Krishna</option>
                    <option value="ayyappan">Swami Ayyappan</option>
                    <option value="anjaneyar">Veera Anjaneyar / Hanuman</option>
                    <option value="other">Other Deity / Custom Form</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Target Height (Inches)
                  </label>
                  <select
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500 bg-white"
                  >
                    <option value="12">12 Inches (1 Foot) - Home Pooja</option>
                    <option value="18">18 Inches (1.5 Feet) - Premium Altar</option>
                    <option value="24">24 Inches (2 Feet) - Classic Vigraham</option>
                    <option value="36">36 Inches (3 Feet) - Large Sanctum</option>
                    <option value="48">48 Inches (4 Feet) - Temple Utsavar</option>
                    <option value="60">60+ Inches (5+ Feet) - Grand Temple Murti</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Sacred Alloy & Finish */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-temple-950 font-serif font-bold text-lg border-b border-sand-200 pb-2">
                <Layers className="w-5 h-5 text-gold-700" />
                <span>2. Sacred Material &amp; Sanctum Setting</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Preferred Casting Material
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500 bg-white"
                  >
                    <option value="Panchaloha (5-Metal Alloy)">Panchaloha (5-Metal Sacred Alloy)</option>
                    <option value="Lost-Wax Bronze">Lost-Wax Bronze (Chola Tradition)</option>
                    <option value="Brass">Solid Cast Heavy Brass</option>
                    <option value="Monolithic Granite Stone">Black Krishna Shila Granite Stone</option>
                    <option value="Hand-Carved Teak Wood">Hand-Carved Seasoned Teak Wood</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Finish Preference
                  </label>
                  <select
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500 bg-white"
                  >
                    <option value="Antique Temple Patina">Antique Temple Patina (Dark Olive)</option>
                    <option value="Polished Gold Patina">Polished Golden Shimmer</option>
                    <option value="Chola Heritage Brown">Chola Heritage Warm Brown</option>
                    <option value="Natural Matte">Natural Matte Casting</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Sanctum Setting
                  </label>
                  <select
                    value={sanctumType}
                    onChange={(e) => setSanctumType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500 bg-white"
                  >
                    <option value="Home Sanctum / Pooja Room">Home Sanctum / Pooja Room</option>
                    <option value="Temple Moolavar / Utsavar">Temple Moolavar / Utsavar</option>
                    <option value="Spiritual Center / Ashram">Spiritual Center / Ashram</option>
                    <option value="Private Collector Sanctum">Private Collector Sanctum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Estimated Budget Range
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500 bg-white"
                  >
                    <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                    <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                    <option value="₹1,00,000 – ₹2,50,000">₹1,00,000 – ₹2,50,000</option>
                    <option value="₹2,50,000 – ₹5,00,000">₹2,50,000 – ₹5,00,000</option>
                    <option value="₹5,00,000+ (Grand Temple Project)">₹5,00,000+ (Grand Temple Project)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Contact & Special Notes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-temple-950 font-serif font-bold text-lg border-b border-sand-200 pb-2">
                <ShieldCheck className="w-5 h-5 text-gold-700" />
                <span>3. Devotee / Trustee Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sivasankaran"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
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
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase mb-1">
                  Specific Ayudhas, Peedam Details, or Inscriptions
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention desired posture (e.g. Abhaya Mudra, Nindra Kolam), peacock direction, temple prabhavali arch, or consecration muhurtham dates..."
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
              <span>{isSubmitting ? 'Submitting to Master Sthapathi...' : 'Submit Custom Statue Commission Request'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
