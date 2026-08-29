import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export interface CustomOrderCTAProps {
  title?: string;
  subtitle?: string;
}

export const CustomOrderCTA: React.FC<CustomOrderCTAProps> = ({
  title = 'Envisioning a Sacred Statue for Your Sanctum or Temple?',
  subtitle = 'Speak directly with our master sthapathis to sculpt your custom Panchaloha, bronze, or granite deity according to Agama Shastra standards.',
}) => {
  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Sashtha Arts & Crafts, I would like to consult about commissioning a custom Hindu God statue.'
  );

  return (
    <section className="py-20 bg-sand-200/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-temple-900 text-sand-50 p-8 sm:p-12 lg:p-16 border-2 border-gold-500/40 shadow-temple-lg overflow-hidden">
          {/* Background Decorative Rings */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold-500/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gold-600/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Artisan Commission</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-sand-50 leading-tight">
              {title}
            </h2>

            <p className="text-sand-200 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/custom-order"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-temple-950 font-bold text-sm shadow-gold-sm transition-transform hover:scale-105"
              >
                <span>Submit Custom Request</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Master Sthapathi</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
