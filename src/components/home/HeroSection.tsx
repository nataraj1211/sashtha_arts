import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'Sacred Art, Crafted by Hand.',
  subtitle = 'Discover beautifully handcrafted South Indian God statues made with traditional artistry and timeless craftsmanship.',
  badge = 'Traditional Shilpa Shastra Excellence',
}) => {
  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Sashtha Arts & Crafts, I would like to enquire about your handcrafted Lord Murugan and South Indian God statues.'
  );

  return (
    <section className="relative min-h-[92vh] sm:min-h-[96vh] flex items-center justify-center bg-temple-gradient text-sand-50 overflow-hidden pt-24 pb-16">
      {/* Sacred Background Atmosphere */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-radial from-gold-500/30 via-gold-600/10 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-medium tracking-wide mb-6">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>{badge}</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-sand-50 max-w-4xl mx-auto leading-[1.15] mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-sand-200/90 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/god-statues"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-sm tracking-wide shadow-gold-md hover:shadow-gold-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Explore God Statues</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>

        {/* Value Props Bar */}
        <div className="mt-16 pt-8 border-t border-gold-500/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left text-xs sm:text-sm text-sand-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
            <span>100% Shilpa Shastra Conforming</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold-400 shrink-0" />
            <span>Lost-Wax Bronze &amp; Panchaloha</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
            <span>Temple Consecration Grade</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold-400 shrink-0" />
            <span>ISPM-15 Wooden Crated Shipping</span>
          </div>
        </div>
      </div>
    </section>
  );
};
