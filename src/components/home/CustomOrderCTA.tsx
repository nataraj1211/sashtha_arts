import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, Landmark, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';
import { Button } from '../common/Button';

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
    'Namaste Vetri Arts & Crafts, I would like to consult about commissioning a custom Hindu God statue.'
  );

  return (
    <section className="py-20 bg-sand-200/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-temple-900 text-sand-50 p-8 sm:p-12 lg:p-16 border-2 border-gold-500/40 shadow-temple-lg overflow-hidden">
          {/* Background Decorative Aura */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold-500/15 blur-3xl rounded-full pointer-events-none" />

          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-widest border border-gold-500/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Bespoke Commissioning</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-sand-50 leading-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-sand-200/90 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link to="/custom-order">
                <Button variant="gold" size="lg" className="shadow-gold-md">
                  START CUSTOM ORDER WIZARD <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>

              <Link to="/temple-orders">
                <Button variant="outline" size="lg" className="border-gold-400/60 text-sand-50 hover:bg-gold-500/10">
                  <Landmark className="w-4 h-4 mr-2 text-gold-400" />
                  TEMPLE &amp; BULK ORDERS
                </Button>
              </Link>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-emerald-300 hover:text-white hover:bg-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                  WhatsApp Consultation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
