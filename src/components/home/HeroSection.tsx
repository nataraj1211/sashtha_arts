import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Flame, Compass } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';
import { Button } from '../common/Button';

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
    'Namaste Vetri Arts & Crafts, I would like to enquire about your handcrafted Lord Murugan and South Indian God statues.'
  );

  return (
    <section className="relative min-h-[92vh] sm:min-h-[96vh] flex items-center justify-center bg-temple-gradient text-sand-50 overflow-hidden pt-24 pb-16">
      {/* Sacred Background Atmosphere */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-radial from-gold-500/30 via-gold-600/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Decorative Traditional Border Patterns */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gold-gradient opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Divine Headline & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Sacred Tradition Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sand-50 leading-[1.12]">
            {title.split(',')[0]}
            <span className="block text-gold-gradient font-serif mt-1">
              {title.split(',')[1] || 'Crafted by Hand.'}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-lg text-sand-200/90 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
            {subtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <Link to="/god-statues">
              <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-gold-md">
                EXPLORE GOD STATUES <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>

            <Link to="/custom-order">
              <Button variant="temple" size="lg" className="w-full sm:w-auto">
                CUSTOM ORDER
              </Button>
            </Link>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-emerald-500/60 text-emerald-300 hover:bg-emerald-600/20"
                leftIcon={<MessageCircle className="w-4 h-4 text-emerald-400" />}
              >
                ENQUIRE ON WHATSAPP
              </Button>
            </a>
          </div>

          {/* Trust Value Points */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gold-500/20 text-sand-300 text-xs text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gold-500/10 text-gold-400 shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <span>Lost-Wax Bronze &amp; Panchaloha</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gold-500/10 text-gold-400 shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <span>Strict Shilpa Shastra Iconometry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gold-500/10 text-gold-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Insured Wooden Crate Delivery</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Lord Murugan Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Glowing Halo */}
            <div className="absolute inset-0 bg-gold-500/20 rounded-3xl blur-2xl transform scale-95" />

            {/* Showcase Image Frame */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl bg-temple-900/90 aspect-[4/5] group">
              <img
                src="/images/statues/murugan.jpg"
                alt="Traditional South Indian handcrafted Lord Murugan statue with sacred Vel and peacock"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Shade & Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-temple-950 via-temple-950/20 to-transparent" />

              <div className="absolute bottom-6 inset-x-6 space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className="bg-gold-500 text-temple-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded shadow-sm">
                    Masterpiece
                  </span>
                  <span className="text-xs font-mono text-gold-300 font-semibold">Swamimalai Lineage</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-sand-50 leading-snug">
                  Lord Swaminatha Murugan in Pure Panchaloha
                </h3>
                <p className="text-xs text-sand-300 leading-relaxed">
                  Sculpted with sacred Vel and peacock vahana strictly adhering to Chola dynasty shastras.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    to="/product/traditional-lord-murugan-swaminatha-statue"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-gold-300 underline underline-offset-4"
                  >
                    <span>View 4-Side Angles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs font-mono text-sand-400">VAC-MRG-001</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
