import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Upload,
  X,
  CheckCircle2,
  Copy,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CustomOrder, DeityType } from '@/types';
import { generateRequestId, copyToClipboard, createWhatsAppUrl } from '@/lib/utils';
import { db } from '@/lib/supabase';
import { sendAdminNotifications } from '@/lib/notificationService';
import { uploadImageFile } from '@/lib/storage';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';

export const CustomOrderPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<CustomOrder | null>(null);

  // Form States
  const [deity, setDeity] = useState<DeityType>('murugan');
  const [customDeity, setCustomDeity] = useState('');
  const [material, setMaterial] = useState('Panchaloha (5-Metal Sacred Alloy)');
  const [height, setHeight] = useState('24 inches');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [pose, setPose] = useState('Standing (Samabhanga with Abhaya Mudra)');
  const [requirements, setRequirements] = useState('');

  // Image Uploads
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Customer Contact
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  const { success, error: toastError } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setIsUploading(true);

    for (const file of files) {
      const res = await uploadImageFile(file, 'custom-orders');
      if (res.url) {
        setReferenceImages((prev) => [...prev, res.url]);
      } else if (res.error) {
        toastError(res.error);
      }
    }
    setIsUploading(false);
  };

  const removeImage = (index: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step === 7) {
      if (!customerName.trim() || !customerPhone.trim()) {
        toastError('Please provide your Full Name and Phone Number.');
        return;
      }
    }
    setStep((s) => Math.min(7, s + 1));
  };

  const handlePrev = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      toastError('Please provide your Full Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const requestId = generateRequestId('custom');
      const orderPayload: Omit<CustomOrder, 'id' | 'created_at' | 'updated_at'> = {
        request_id: requestId,
        deity: deity === 'other' && customDeity ? (customDeity as any) : deity,
        material,
        height,
        width,
        depth,
        pose,
        reference_images: referenceImages,
        requirements,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_whatsapp: customerWhatsApp || customerPhone,
        customer_email: customerEmail,
        delivery_location: deliveryLocation,
        status: 'Received',
        email_notified: false,
        whatsapp_notified: false,
      };

      const saved = await db.createCustomOrder(orderPayload);

      // Background notifications
      sendAdminNotifications({
        requestId,
        type: 'Custom Order',
        customerName,
        customerPhone,
        customerWhatsApp: customerWhatsApp || customerPhone,
        customerEmail,
        productName: `Custom ${deity.toUpperCase()} Statue`,
        material,
        size: height,
        location: deliveryLocation,
        message: `Pose: ${pose}. Notes: ${requirements}`,
        referenceImagesCount: referenceImages.length,
      }).catch((e) => console.warn('Background notification error', e));

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F3DA89', '#C85A32', '#2C1810'],
        });
      } catch {}

      setSubmittedOrder(saved);
      success('Custom statue commissioning request submitted successfully!');
    } catch (err: any) {
      toastError(err?.message || 'Failed to submit custom order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submittedOrder?.request_id) {
      copyToClipboard(submittedOrder.request_id);
      success(`Copied Custom Request ID: ${submittedOrder.request_id}`);
    }
  };

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = submittedOrder
    ? createWhatsAppUrl(
        adminWhatsApp,
        `Namaste Vetri Arts & Crafts, I have submitted a Custom Statue Commission Request (ID: ${submittedOrder.request_id}) for a ${submittedOrder.deity} idol. Customer: ${submittedOrder.customer_name}`
      )
    : '';

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Bespoke Commissioning Wizard</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-temple-950">
            Commission a Custom God Statue
          </h1>
          <p className="text-xs sm:text-sm text-sand-700 leading-relaxed">
            Our hereditary sthapathis hand-carve and cast customized deities according to your exact sanctum dimensions, posture requirements, and preferred sacred metals.
          </p>
        </div>

        {submittedOrder ? (
          /* SUCCESS VIEW */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-gold-500/40 p-8 sm:p-12 shadow-temple-lg text-center space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-500 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-temple-950">
                Custom Request Submitted Successfully
              </h2>
              <p className="text-xs sm:text-sm text-sand-700 mt-2 max-w-md mx-auto">
                Your custom deity requirements have been registered with our master sthapathi team. We will review your reference images and reach out with iconometric drawings and estimated casting duration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-sand-100 border border-sand-300 max-w-lg mx-auto text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-sand-600 font-medium">Custom Reference ID</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
                  Status: Received
                </span>
              </div>
              <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-sand-300">
                <span className="font-mono text-lg font-bold text-temple-900">{submittedOrder.request_id}</span>
                <button
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-800 bg-gold-100 px-3 py-1.5 rounded-lg"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy ID</span>
                </button>
              </div>

              <div className="text-xs text-sand-800 space-y-1 pt-2 border-t border-sand-200">
                <p><strong>Deity:</strong> <span className="capitalize">{submittedOrder.deity}</span></p>
                <p><strong>Material:</strong> {submittedOrder.material}</p>
                <p><strong>Height:</strong> {submittedOrder.height}</p>
                <p><strong>Contact:</strong> {submittedOrder.customer_name} ({submittedOrder.customer_phone})</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Artisan</span>
              </a>
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
                onClick={() => {
                  setSubmittedOrder(null);
                  setStep(1);
                }}
              >
                Submit Another Commission
              </Button>
            </div>
          </motion.div>
        ) : (
          /* MULTI-STEP WIZARD CONTAINER */
          <div className="bg-white rounded-3xl border border-sand-300 p-6 sm:p-10 shadow-sm space-y-8">
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between overflow-x-auto pb-2 no-scrollbar">
              {[
                { s: 1, name: 'Deity' },
                { s: 2, name: 'Material' },
                { s: 3, name: 'Dimensions' },
                { s: 4, name: 'Pose' },
                { s: 5, name: 'Images' },
                { s: 6, name: 'Notes' },
                { s: 7, name: 'Contact' },
              ].map((item) => (
                <div key={item.s} className="flex items-center shrink-0">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                      step === item.s
                        ? 'bg-gold-500 text-temple-950 shadow-gold-sm'
                        : step > item.s
                        ? 'bg-temple-800 text-gold-300'
                        : 'bg-sand-100 text-sand-500'
                    }`}
                  >
                    <span>{item.s}.</span>
                    <span>{item.name}</span>
                  </div>
                  {item.s < 7 && <span className="mx-2 text-sand-300">›</span>}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[280px]">
              {/* STEP 1: Deity */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-temple-950">
                    Step 1: Choose the Sacred Deity
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'murugan', label: 'Lord Murugan', img: '/images/statues/murugan.jpg' },
                      { id: 'vinayagar', label: 'Maha Vinayagar', img: '/images/statues/vinayagar.jpg' },
                      { id: 'amman', label: 'Sri Mariamman', img: '/images/statues/amman.jpg' },
                      { id: 'shiva', label: 'Lord Nataraja', img: '/images/statues/nataraja.jpg' },
                      { id: 'perumal', label: 'Lord Perumal Balaji', img: '/images/statues/perumal.jpg' },
                      { id: 'krishna', label: 'Venugopala Krishna', img: '/images/statues/krishna.jpg' },
                      { id: 'ayyappan', label: 'Swami Ayyappan', img: '/images/statues/ayyappan.jpg' },
                      { id: 'anjaneyar', label: 'Veera Anjaneyar', img: '/images/statues/anjaneyar.jpg' },
                      { id: 'other', label: 'Other Sacred Deity', img: '/images/statues/workshop.jpg' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDeity(d.id as any)}
                        className={`p-3 rounded-2xl text-left border-2 transition-all flex items-center gap-3 ${
                          deity === d.id
                            ? 'border-gold-500 bg-gold-50/80 text-temple-950 font-bold shadow-sm'
                            : 'border-sand-300 hover:border-gold-400 bg-white text-temple-800'
                        }`}
                      >
                        <img
                          src={d.img}
                          alt={d.label}
                          className="w-10 h-10 object-cover rounded-xl border border-sand-300 shrink-0"
                        />
                        <span className="text-xs font-semibold line-clamp-1">{d.label}</span>
                      </button>
                    ))}
                  </div>

                  {deity === 'other' && (
                    <div className="pt-2">
                      <label className="block text-xs font-semibold text-temple-900 mb-1">
                        Specify Deity Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lord Sudarshana, Goddess Meenakshi, Sri Varahi..."
                        value={customDeity}
                        onChange={(e) => setCustomDeity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-gold-500 text-sm"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: Material */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-temple-950">
                    Step 2: Select Preferred Sacred Material
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: 'Panchaloha (5 Sacred Metals)',
                        desc: 'Gold, Silver, Copper, Zinc, Lead alloy cast via ancient lost-wax technique.',
                      },
                      {
                        title: 'Chola Lost-Wax Bronze',
                        desc: 'Traditional high-purity temple bronze with authentic antique patina.',
                      },
                      {
                        title: 'Heavy Pure Brass',
                        desc: 'Finely engraved solid brass with deep golden polish.',
                      },
                      {
                        title: 'Krishna Shila Black Granite Stone',
                        desc: 'Monolithic hand-chiselled stone according to Shilpa Shastra.',
                      },
                      {
                        title: 'Country Teak & Rosewood',
                        desc: 'Solid single-block sacred wood carving for vimanas and home mandapams.',
                      },
                      {
                        title: 'Other Custom Material',
                        desc: 'Special alloys, white marble, or silver kavacham cladding.',
                      },
                    ].map((m) => (
                      <button
                        key={m.title}
                        type="button"
                        onClick={() => setMaterial(m.title)}
                        className={`p-4 rounded-2xl text-left border-2 transition-all ${
                          material === m.title
                            ? 'border-gold-500 bg-gold-50 shadow-sm'
                            : 'border-sand-300 hover:border-gold-400'
                        }`}
                      >
                        <h4 className="font-serif font-bold text-sm text-temple-950">{m.title}</h4>
                        <p className="text-xs text-sand-700 mt-1">{m.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Dimensions */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-temple-950">
                    Step 3: Specify Required Dimensions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                        Height (Inches / Feet) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 24 inches or 3 feet"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                        Width (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 12 inches (or proportional)"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                        Depth (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 9 inches"
                        value={depth}
                        onChange={(e) => setDepth(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Pose / Iconography */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-temple-950">
                    Step 4: Select Pose &amp; Mudra
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Standing (Samabhanga with Abhaya & Varada Mudra)',
                      'Seated on Lotus Throne (Padmasana / Lalitasana)',
                      'Cosmic Dance / Dynamic Posture (Tandava / Nrutya)',
                      'Kneeling / Devotional Posture (Anjali Mudra)',
                      'Bespoke Specific Mudra or Temple Archival Pose',
                    ].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPose(p)}
                        className={`p-4 rounded-2xl text-left border-2 transition-all ${
                          pose === p
                            ? 'border-gold-500 bg-gold-50 font-bold text-temple-950 shadow-sm'
                            : 'border-sand-300 hover:border-gold-400 text-temple-800'
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{p}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Reference Images */}
              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-temple-950">
                    Step 5: Upload Reference Images (Optional)
                  </h3>
                  <p className="text-xs text-sand-700">
                    Upload photos of your existing temple sanctum, an ancient sculpture photograph, or reference drawings.
                  </p>

                  <div className="p-6 border-2 border-dashed border-sand-300 hover:border-gold-500 rounded-2xl bg-sand-50 text-center cursor-pointer">
                    <label className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gold-600 mb-2" />
                      <span className="text-xs sm:text-sm font-bold text-temple-900">
                        {isUploading ? 'Uploading images...' : 'Click to Upload Reference Images (JPG, PNG, WEBP)'}
                      </span>
                      <span className="text-[11px] text-sand-600 mt-1">Multiple images allowed • Max 10MB each</span>
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
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                      {referenceImages.map((url, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-sand-300 group">
                          <img src={url} alt="Reference" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-temple-950/80 text-white hover:bg-terracotta-700"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 6: Special Requirements */}
              {step === 6 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-temple-950">
                    Step 6: Special Requirements &amp; Inscriptions
                  </h3>
                  <textarea
                    rows={5}
                    placeholder="Describe any particular ornaments, peedam inscriptions, temple trust names, delivery timeline constraints, or specific Agama requirements..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              )}

              {/* STEP 7: Customer Contact */}
              {step === 7 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-temple-950">
                    Step 7: Your Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sivasubramanian"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
                      />
                    </div>
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-temple-900 uppercase tracking-wider mb-1">
                        Delivery City / Country
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Madurai, Tamil Nadu (or London, UK / California, USA)"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-sand-200 flex items-center justify-between">
              {step > 1 ? (
                <Button variant="outline" size="md" onClick={handlePrev}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Previous
                </Button>
              ) : (
                <div />
              )}

              {step < 7 ? (
                <Button variant="gold" size="md" onClick={handleNext}>
                  Continue <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              ) : (
                <Button
                  variant="gold"
                  size="lg"
                  isLoading={isSubmitting}
                  onClick={handleSubmit}
                  className="font-bold shadow-gold-sm"
                >
                  REQUEST CUSTOM QUOTE
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
