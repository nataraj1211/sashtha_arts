import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Landmark,
  ShieldCheck,
  Sparkles,
  Upload,
  CheckCircle2,
  Copy,
  MessageCircle,
  Clock,
  Layers,
  Flame,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TempleOrder } from '@/types';
import { generateRequestId, copyToClipboard, createWhatsAppUrl } from '@/lib/utils';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { uploadImageFile } from '@/lib/storage';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';

export const TempleOrdersPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTempleOrder, setSubmittedTempleOrder] = useState<TempleOrder | null>(null);

  // Form State
  const [organizationName, setOrganizationName] = useState('');
  const [location, setLocation] = useState('');
  const [deity, setDeity] = useState('Lord Murugan & Moolavar / Utsavar Deities');
  const [projectType, setProjectType] = useState<TempleOrder['project_type']>('temple_idols');
  const [requiredHeight, setRequiredHeight] = useState('3 feet to 6 feet');
  const [material, setMaterial] = useState('Panchaloha (5-Metal Sacred Alloy)');
  const [quantity, setQuantity] = useState('1 Sanctum Murti Set');
  const [expectedTimeline, setExpectedTimeline] = useState('3 to 6 Months');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { success, error: toastError } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setIsUploading(true);

    for (const file of files) {
      const res = await uploadImageFile(file, 'temple-orders');
      if (res.url) {
        setReferenceImages((prev) => [...prev, res.url]);
      }
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationName.trim() || !contactPerson.trim() || !phone.trim()) {
      toastError('Please fill in Organization Name, Contact Person, and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const requestId = generateRequestId('temple');
      const templeData: Omit<TempleOrder, 'id' | 'created_at' | 'updated_at'> = {
        request_id: requestId,
        organization_name: organizationName,
        location,
        deity,
        project_type: projectType,
        required_height: requiredHeight,
        material,
        quantity,
        reference_images: referenceImages,
        expected_timeline: expectedTimeline,
        contact_person: contactPerson,
        phone,
        email,
        requirements,
        status: 'Received',
        email_notified: false,
        whatsapp_notified: false,
      };

      const saved = await db.createTempleOrder(templeData);

      // Background notification dispatch
      sendAdminNotifications({
        requestId,
        type: 'Temple Order',
        customerName: `${contactPerson} (${organizationName})`,
        customerPhone: phone,
        customerEmail: email,
        productName: `Temple Project: ${projectType.replace('_', ' ').toUpperCase()}`,
        material,
        size: requiredHeight,
        quantity,
        location,
        message: requirements,
        referenceImagesCount: referenceImages.length,
      }).catch((err) => console.warn('Background notification error', err));

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F3DA89', '#C85A32', '#2C1810'],
        });
      } catch {}

      setSubmittedTempleOrder(saved);
      success('Temple enquiry received successfully!');
    } catch (err: any) {
      toastError(err?.message || 'Failed to submit temple enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submittedTempleOrder?.request_id) {
      copyToClipboard(submittedTempleOrder.request_id);
      success(`Copied Temple Request ID: ${submittedTempleOrder.request_id}`);
    }
  };

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = submittedTempleOrder
    ? createWhatsAppUrl(
        adminWhatsApp,
        `Namaste Vetri Arts & Crafts, I have submitted a Temple Project Enquiry (ID: ${submittedTempleOrder.request_id}) for ${submittedTempleOrder.organization_name}. Contact: ${submittedTempleOrder.contact_person}`
      )
    : '';

  const projectSections = [
    {
      type: 'temple_idols' as const,
      title: 'Moolavar & Utsavar Sanctum Idols',
      desc: 'Life-sized and processional Panchaloha, bronze, and granite idols sculpted for Kumbhabhishekam consecration.',
    },
    {
      type: 'large_sculptures' as const,
      title: 'Colossal & Large Sculptures',
      desc: 'Grand 6-foot to 18-foot monolithic stone and heavy bronze deities for temple plazas, mandapams, and gopurams.',
    },
    {
      type: 'temple_pillars' as const,
      title: 'Carved Temple Pillars & Yalis',
      desc: 'Traditional granite and teakwood mandapam pillars with mythological Yalis, Dwarapalakas, and Gajalakshmi carvings.',
    },
    {
      type: 'temple_doors' as const,
      title: 'Kavacham & Brass Temple Doors',
      desc: 'Gold-plated and heavy brass repoussé clad sanctum doors, Kodimaram covers, and deity armor (Kavachams).',
    },
    {
      type: 'vimana_sculptures' as const,
      title: 'Vimana & Gopuram Sculptures',
      desc: 'Traditional South Indian terracotta and stone Vimana devatas conforming to Chola, Pandya, and Vijayanagara shastras.',
    },
    {
      type: 'restoration' as const,
      title: 'Heritage Temple Restoration',
      desc: 'Expert restoration, eye-opening repair, and repolishing of ancient consecrated murtis by hereditary sthapathis.',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Landmark className="w-3.5 h-3.5 text-gold-600" />
            <span>Sanctum &amp; Temple Trusts</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Temple Commissions &amp; Bulk Sculptures
          </h1>
          <p className="text-sm sm:text-base text-temple-700 leading-relaxed">
            Vetri Arts &amp; Crafts works directly with temple trusts, religious organizations, mutts, and overseas Hindu temples to execute complete sanctum idol projects adhering to strict Agama iconometry.
          </p>
        </div>

        {/* Temple Sanctum Banner */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-sand-300 shadow-sm mb-12">
          <img
            src="/images/statues/temple.jpg"
            alt="Traditional South Indian stone temple sanctum mandapam with carved granite pillars and murtis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-temple-950/85 via-temple-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-sand-50">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300">Sanctum Consecration Heritage</span>
            <p className="font-serif font-bold text-lg sm:text-xl">Moolavar Idols, Utsava Bronzes, Vimana Devatas &amp; Carved Mandapam Pillars</p>
          </div>
        </div>

        {/* 6 Core Temple Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projectSections.map((sec) => (
            <div
              key={sec.type}
              onClick={() => {
                setProjectType(sec.type);
                const el = document.getElementById('temple-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-6 rounded-3xl bg-white border-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-temple-md ${
                projectType === sec.type
                  ? 'border-gold-500 bg-gold-50/40 ring-2 ring-gold-400/30'
                  : 'border-sand-300 hover:border-gold-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-temple-900 text-gold-400 flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                {projectType === sec.type && (
                  <span className="text-[10px] font-bold uppercase bg-gold-500 text-temple-950 px-2 py-0.5 rounded">
                    Selected
                  </span>
                )}
              </div>
              <h3 className="font-serif font-bold text-lg text-temple-900 mb-1.5">{sec.title}</h3>
              <p className="text-xs text-sand-700 leading-relaxed">{sec.desc}</p>
            </div>
          ))}
        </div>

        {/* Temple Order Form Section */}
        <div id="temple-form" className="max-w-4xl mx-auto">
          {submittedTempleOrder ? (
            /* SUCCESS CARD */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-gold-500/40 p-8 sm:p-12 shadow-temple-lg text-center space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-500 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-temple-950">
                  Temple Request Registered
                </h2>
                <p className="text-xs sm:text-sm text-sand-700 mt-2 max-w-md mx-auto">
                  Our chief sthapathi will connect with <strong className="text-temple-900">{submittedTempleOrder.contact_person}</strong> ({submittedTempleOrder.organization_name}) to discuss project milestones, architectural plans, and consecrated casting.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-sand-100 border border-sand-300 max-w-lg mx-auto text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sand-600 font-medium">Temple Project Reference</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
                    Status: Received
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-sand-300">
                  <span className="font-mono text-lg font-bold text-temple-900">{submittedTempleOrder.request_id}</span>
                  <button
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-800 bg-gold-100 px-3 py-1.5 rounded-lg"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy ID</span>
                  </button>
                </div>

                <div className="text-xs text-sand-800 space-y-1 pt-2 border-t border-sand-200">
                  <p><strong>Organization:</strong> {submittedTempleOrder.organization_name}</p>
                  <p><strong>Location:</strong> {submittedTempleOrder.location}</p>
                  <p><strong>Project Type:</strong> {submittedTempleOrder.project_type.replace('_', ' ').toUpperCase()}</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Chief Sthapathi</span>
                </a>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setSubmittedTempleOrder(null)}
                >
                  Submit Another Project
                </Button>
              </div>
            </motion.div>
          ) : (
            /* FORM */
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-sand-300 p-8 sm:p-12 shadow-sm space-y-8">
              <div className="border-b border-sand-200 pb-4">
                <h3 className="font-serif text-2xl font-bold text-temple-950">
                  Submit Temple Project Specifications
                </h3>
                <p className="text-xs text-sand-700 mt-1">
                  Fill in your temple or organization details below for an official quotation and timeline proposal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                    Temple / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Murugan Temple Trust"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                    Temple Location (City, State / Country) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tirunelveli, Tamil Nadu (or Selangor, Malaysia)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                    Primary Sacred Deity / Deities *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Swaminatha Murugan + Valli & Deivanai"
                    value={deity}
                    onChange={(e) => setDeity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                    Project Type *
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500 font-medium"
                  >
                    <option value="temple_idols">Moolavar &amp; Utsavar Sanctum Idols</option>
                    <option value="large_sculptures">Large Plazas &amp; Colossal Sculptures (6ft - 18ft)</option>
                    <option value="temple_pillars">Mandapam Pillars &amp; Yalis</option>
                    <option value="temple_doors">Brass Sanctum Doors &amp; Kavachams</option>
                    <option value="vimana_sculptures">Vimana &amp; Gopuram Sculptures</option>
                    <option value="restoration">Heritage Idol Restoration</option>
                    <option value="bulk_orders">Bulk Orders for Multiple Mandapams</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                    Required Height / Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 feet or 6 feet"
                    value={requiredHeight}
                    onChange={(e) => setRequiredHeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                    Preferred Material
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm font-medium"
                  >
                    <option value="Panchaloha (5-Metal Sacred Alloy)">Panchaloha (5-Metal Sacred Alloy)</option>
                    <option value="Chola Lost-Wax Bronze">Chola Lost-Wax Bronze</option>
                    <option value="Krishna Shila Black Granite Stone">Krishna Shila Black Granite Stone</option>
                    <option value="Heavy Cast Brass">Heavy Cast Brass</option>
                    <option value="Teak Wood / Rosewood">Teak Wood / Rosewood</option>
                    <option value="Multi-Material Temple Ensemble">Multi-Material Temple Ensemble</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                    Quantity / Set Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Sanctum Set (3 Murtis)"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                    Target Consecration / Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kumbhabhishekam in 6 Months"
                    value={expectedTimeline}
                    onChange={(e) => setExpectedTimeline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 text-sm"
                  />
                </div>
              </div>

              {/* Upload Temple Blueprint / Altar Photo */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider">
                  Temple Sanctorum Drawings / Reference Photos (Optional)
                </label>
                <div className="p-6 border-2 border-dashed border-sand-300 hover:border-gold-500 rounded-2xl bg-sand-50 text-center cursor-pointer">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-7 h-7 text-gold-600 mb-1" />
                    <span className="text-xs font-bold text-temple-900">
                      {isUploading ? 'Uploading...' : 'Upload Architectural / Altar Reference (JPG, PNG, WEBP)'}
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {referenceImages.length > 0 && (
                  <p className="text-xs text-emerald-800 font-semibold">{referenceImages.length} image(s) attached.</p>
                )}
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                  Detailed Temple Project Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the temple tradition, peedam heights, abhishekam outlet alignment, transport requirements..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full p-4 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {/* Contact Person Details */}
              <div className="p-6 rounded-2xl bg-sand-100 border border-sand-300 space-y-4">
                <h4 className="font-serif font-bold text-base text-temple-950">
                  Trustee / Contact Person Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-temple-900 mb-1">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gurukkal / Trustee"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-temple-900 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-temple-900 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="trust@temple.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  variant="gold"
                  size="lg"
                  type="submit"
                  isLoading={isSubmitting}
                  className="font-bold shadow-gold-sm w-full sm:w-auto"
                >
                  SUBMIT TEMPLE REQUEST
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
