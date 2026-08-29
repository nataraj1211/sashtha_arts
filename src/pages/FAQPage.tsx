import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the difference between Panchaloha and Lost-Wax Bronze statues?',
      a: 'Panchaloha is a sacred traditional alloy composed of 5 metals (Gold, Silver, Copper, Zinc, and Brass/Iron in precise canonical proportions) strictly prescribed by the Shilpa Shastras for consecration in sanctums and holy home altars. Traditional Lost-Wax Bronze is an ancient alloy predominantly of copper and tin, renowned for crisp details, high density, and timeless resonant chime when struck.',
    },
    {
      q: 'Do your statues strictly adhere to Shilpa Shastra and Dhyana Shlokas?',
      a: 'Yes, absolutely. Every deity is cast by traditional hereditary Vishwakarma sthapatis adhering to precise Talamana measurement systems (e.g. Dasa Tala for Lord Murugan & Shiva, Nava Tala for Goddess Lakshmi/Amman). Proportions of mukha, crown, ayudhas, and peedam are exact.',
    },
    {
      q: 'How can I commission a custom deity statue for my temple or home?',
      a: 'You can submit a custom commission request via our Custom Order page or directly text our master artisan on WhatsApp. We provide 3D sketches, clay models (matruka), and regular casting photos during each stage of sculpting.',
    },
    {
      q: 'How are large statues packaged and delivered safely worldwide?',
      a: 'Every sculpture is encased in multi-layer high-density foam padding, wrapped in moisture-resistant vapor barriers, and enclosed inside heavy-duty ISPM-15 export certified wooden crates with reinforced steel corner braces. We arrange door delivery across India and international temple shipments.',
    },
    {
      q: 'Can abhishekam (holy bathing) be performed on these bronze & panchaloha idols?',
      a: 'Yes. Authentic lost-wax panchaloha and bronze idols are solid, durable castings specifically crafted for daily temple and home abhishekam with milk, panchamirtham, honey, vibhuti, and sandalwood. Detailed cleaning and maintenance guidance is provided in our Care Guide.',
    },
  ];

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Sashtha Arts & Crafts, I have a specific question about your handcrafted statues.'
  );

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan Guidance</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Frequently Asked Questions
          </h1>
          <p className="text-sand-700 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to know about our South Indian deity castings, sacred metals, temple consecration standards, and safe worldwide crating.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-sand-300 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-temple-950 hover:text-gold-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-sand-700 leading-relaxed border-t border-sand-200 bg-sand-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="bg-temple-900 text-sand-50 rounded-3xl p-8 sm:p-10 border border-gold-500/30 shadow-temple-lg text-center space-y-4">
          <ShieldCheck className="w-10 h-10 text-gold-400 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-sand-50">
            Have a Specific Sacred Question?
          </h3>
          <p className="text-sand-300 text-xs sm:text-sm max-w-lg mx-auto">
            Our hereditary sthapatis in Swamimalai will personally clarify any Shastra queries regarding deity placement, dimensions, or custom sanctum casting.
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-xs shadow-gold-sm transition-transform hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 93428 39218)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
