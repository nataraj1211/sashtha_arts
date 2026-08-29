import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const MaterialsPage: React.FC = () => {
  const materials = [
    {
      title: 'Panchaloha (The Five Sacred Metals)',
      subtitle: 'Gold, Silver, Copper, Zinc & Lead',
      formula: 'Traditional Agamic Ratio (Approx. 80% Copper, Zinc, Lead, with Gold & Silver infusions)',
      desc: 'Panchaloha holds supreme spiritual status in South Indian temple architecture. Each metal correlates with one of the cosmic Pancha-bhutas (Five Elements): Gold (Earth/Sun), Silver (Water/Moon), Copper (Fire/Mars), Zinc (Air/Mercury), and Lead (Ether/Saturn). It is exceptionally resonant and ideal for regular holy Abhishekam.',
      durability: 'Centuries (Impervious to weathering and temple oils)',
      query: 'material=panchaloha',
    },
    {
      title: 'Chola Lost-Wax Bronze',
      subtitle: 'High-Purity Copper-Tin Alloy',
      formula: '88% High Purity Copper + 12% Tin',
      desc: 'Revered globally since the Imperial Chola Dynasty (9th–13th century CE). Chola bronze statues feature a warm, rich tone that deepens into a magnificent antique temple patina over years of devotion. Sculpted for processional Utsava Murtis.',
      durability: 'Millennial Longevity (Does not crack or degrade)',
      query: 'material=bronze',
    },
    {
      title: 'Heavy Solid Brass',
      subtitle: 'Virgin Copper-Zinc Alloy',
      formula: '65% Copper + 35% Zinc',
      desc: 'Cast solid with fine yellow-golden luster. Solid brass idols are deeply engraved with intricate jewellery, floral arches (Prabhavali), and lotus pedestals. Ideal for auspicious domestic puja altars and daily homam environments.',
      durability: 'Extremely durable with minimal polish maintenance',
      query: 'material=brass',
    },
    {
      title: 'Krishna Shila Black Granite Stone',
      subtitle: 'Monolithic Dense Plutonic Rock',
      formula: '100% Solid Natural Black Granite (Krishna Shila)',
      desc: 'Hand-chiselled from monolithic single-block black stone quarried from sacred traditional deposits in Tamil Nadu and Karnataka. Highly resonant with natural acoustic ringing when tapped by a master sthapathi.',
      durability: 'Virtually Indestructible (Unreactive to milk, curd, sandal Abhishekam)',
      query: 'material=stone',
    },
    {
      title: 'Sacred Country Teak & Rosewood',
      subtitle: 'Seasoned Single-Block Hardwood',
      formula: '100% Solid Heartwood Teak',
      desc: 'Selected from mature, naturally seasoned South Indian teak and rosewood trees. Hand-carved for temple vimanas, deity mandapams, and sacred Vahanas with deep relief carvings.',
      durability: 'Termite-treated and beeswax polished for decades of preservation',
      query: 'material=wood',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-gold-600" />
            <span>Sacred Metallurgy &amp; Stone</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Sacred Materials &amp; Purity Pledge
          </h1>
          <p className="text-sm sm:text-base text-temple-700 leading-relaxed">
            Understand the spiritual significance, metallurgical composition, and consecration durability of the materials we use for every statue.
          </p>
        </div>

        {/* Materials Workbench Banner */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-sand-300 shadow-sm">
          <img
            src="/images/statues/materials.jpg"
            alt="Sacred Panchaloha metals, bronze ingots, Krishna Shila granite, and teakwood on artisan workbench"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-temple-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-sand-50">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300">Agama Shastra Metallurgy</span>
            <p className="font-serif font-bold text-lg sm:text-xl">Authentic Panchaloha, Chola Bronze, Brass, Krishna Shila Granite &amp; Teak</p>
          </div>
        </div>

        {/* Materials List */}
        <div className="space-y-8">
          {materials.map((mat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-300 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-sand-200">
                <div>
                  <span className="text-xs font-bold text-gold-800 uppercase tracking-wider block">
                    {mat.subtitle}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-temple-950">{mat.title}</h3>
                </div>
                <Link to={`/god-statues?${mat.query}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    Browse Creations <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-temple-800 leading-relaxed">{mat.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300">
                  <span className="text-xs text-sand-600 block font-semibold">Composition / Alloy:</span>
                  <p className="text-xs font-bold text-temple-950 mt-0.5">{mat.formula}</p>
                </div>
                <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300">
                  <span className="text-xs text-sand-600 block font-semibold">Sanctum Durability:</span>
                  <p className="text-xs font-bold text-emerald-800 mt-0.5">{mat.durability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purity Guarantee */}
        <div className="p-8 sm:p-10 rounded-3xl bg-temple-900 text-sand-50 border-2 border-gold-500/40 shadow-temple-lg space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-gold-400" />
            <h3 className="font-serif text-2xl font-bold text-sand-50">
              The Sashtha Arts 100% Solid Casting Guarantee
            </h3>
          </div>
          <p className="text-sm text-sand-200 leading-relaxed">
            We never use hollow resin shells, artificial electroplating on cheap pot metals, or non-traditional fillers. Every murti crafted by Sashtha Arts &amp; Crafts is solid metal or monolithic natural stone through and through, ensuring lifelong spiritual integrity.
          </p>
        </div>
      </div>
    </div>
  );
};
