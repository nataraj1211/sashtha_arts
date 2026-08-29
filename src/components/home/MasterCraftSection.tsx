import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Hammer, Eye, Compass, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const MasterCraftSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Beeswax Sculpting (Madhuchishta)',
      desc: 'Forming the intricate deity model by hand using pure beeswax and dammar resin according to strict Tala measurement shastras.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Cauvery River Clay Moulding',
      desc: 'Layering three coats of alluvial riverbed clay from the Cauvery banks around the wax figure, reinforced with metal armatures.',
      icon: Hammer,
    },
    {
      step: '03',
      title: 'Sacred Molten Metal Pouring',
      desc: 'The dewaxed terracotta mould is fired red-hot, and the five-metal alloy (Panchaloha) is poured in during auspicious Muhurtham hours.',
      icon: Flame,
    },
    {
      step: '04',
      title: 'Hand Chasing & Eye-Opening (Netronmeelana)',
      desc: 'Weeks of intricate manual chiselling of jewels, crowns, and the sacred eye-opening ritual to instill divine vibrancy.',
      icon: Eye,
    },
  ];

  return (
    <section className="py-20 bg-sand-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Living Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-temple-950">
            The Lost-Wax Bronze &amp; Panchaloha Tradition
          </h2>
          <p className="text-sm sm:text-base text-temple-700/80 leading-relaxed">
            Preserving a thousand-year lineage of Chola metallurgy and divine iconometry passed down through hereditary Vishwakarma sthapathis.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-6 border border-sand-300 shadow-sm hover:shadow-temple-md hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif font-bold text-2xl text-gold-600/80">{item.step}</span>
                    <div className="p-2.5 rounded-xl bg-gold-100/60 text-gold-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-base text-temple-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-sand-700 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand-200 text-[11px] font-semibold text-gold-800">
                  Agama Compliant
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link to="/our-craft">
            <Button variant="outline" size="md">
              READ OUR COMPLETE CRAFT STORY <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
