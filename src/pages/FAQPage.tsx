import React, { useState } from 'react';
import { Sparkles, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';
import { Button } from '@/components/common/Button';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can I customize a statue with my own sanctum dimensions?',
      a: 'Yes, absolutely. Our master sthapathis can sculpt any South Indian Hindu God statue according to your exact height, peedam width, and depth specifications adhering strictly to canonical Talamana proportions.',
    },
    {
      q: 'Can I choose another size or material for an existing statue?',
      a: 'Yes. Any deity shown in our catalogue can be custom cast in Panchaloha, Chola Bronze, Pure Heavy Brass, Krishna Shila Black Granite, or Country Teakwood.',
    },
    {
      q: 'Can I send my own reference images or drawings?',
      a: 'Yes. You can use our 7-step Custom Order wizard (/custom-order) to upload photos of your temple altar, an ancient heirloom statue, or architectural sketches. We will analyze the iconography and create a bespoke clay/wax model.',
    },
    {
      q: 'What materials are available and what is Panchaloha?',
      a: 'We specialize in Panchaloha (5-metal sacred alloy comprising Copper, Zinc, Lead with infusions of Gold and Silver), traditional lost-wax Chola Bronze, heavy engraved Brass, Krishna Shila black granite stone, and seasoned teakwood.',
    },
    {
      q: 'How long does a custom statue take to sculpt and cast?',
      a: 'Standard custom bronze/Panchaloha idols up to 24 inches typically take 3 to 6 weeks. Larger temple idols (3ft to 6ft) or monolithic granite murtis take 2 to 4 months depending on the intricate jewelry and arch details.',
    },
    {
      q: 'Do you ship across India and internationally?',
      a: 'Yes. We deliver across every state and union territory in India as well as internationally (USA, UK, Singapore, Malaysia, Australia, Canada, Europe, and UAE) using reinforced shockproof wooden crates and full transit insurance.',
    },
    {
      q: 'Do you accept temple orders and bulk sanctum commissions?',
      a: 'Yes. We execute complete temple projects including Moolavar sanctum murtis, Utsava processional bronzes, Vimana sculptures, carved mandapam pillars, and brass door kavachams.',
    },
    {
      q: 'Can I order multiple statues for an entire temple or trust?',
      a: 'Yes. You can submit our dedicated Temple & Bulk Order form (/temple-orders) with your trust details, and our chief sthapathi will prepare an itemized proposal with phased casting timelines.',
    },
    {
      q: 'How should I care for and clean my bronze/Panchaloha statue?',
      a: 'For daily worship, regular sacred Abhishekam with holy water and milk is recommended. For cleaning, use gentle tamarind pulp, sacred vibhuti (ash), or pitambari powder with a soft cotton cloth. Avoid abrasive metallic brushes.',
    },
    {
      q: 'How are large statues packaged and delivered?',
      a: 'Every sculpture is encased in multi-layer high-density foam padding, wrapped in moisture-resistant vapor barriers, and enclosed inside heavy-duty ISPM-15 export certified wooden crates with reinforced steel corner braces.',
    },
  ];

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Vetri Arts, I have a specific question about your handcrafted statues.'
  );

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Answers &amp; Guidance
          </h1>
          <p className="text-sm text-temple-700 leading-relaxed">
            Everything you need to know about customizing, ordering, shipping, and maintaining your sacred handcrafted statues.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-sand-300 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-temple-950 hover:text-gold-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-sand-800 leading-relaxed border-t border-sand-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="p-8 rounded-3xl bg-temple-900 text-sand-50 border-2 border-gold-500/40 text-center space-y-4">
          <h3 className="font-serif text-xl font-bold text-sand-50">
            Still Have a Specific Question?
          </h3>
          <p className="text-xs sm:text-sm text-sand-300 max-w-md mx-auto">
            Our hereditary sthapathis are available on WhatsApp to discuss your temple measurements, auspicious muhurtham dates, and custom casting requirements.
          </p>
          <div className="pt-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="gold"
                size="md"
                leftIcon={<MessageSquare className="w-4 h-4" />}
              >
                Chat on WhatsApp (+91 93428 39218)
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
