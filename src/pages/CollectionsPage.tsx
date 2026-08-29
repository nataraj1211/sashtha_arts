import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const CollectionsPage: React.FC = () => {
  const collections = [
    {
      title: 'Panchaloha Divine Sanctum Idols',
      subtitle: 'The 5-Metal Sacred Alloy Collection',
      slug: 'panchaloha',
      image: '/images/statues/murugan.jpg',
      desc: 'Formulated with gold, silver, copper, brass, and lead in strictly measured shastric proportions for maximum pranic vibration during sacred Abhishekam.',
      count: '18+ Sculptures',
      query: 'material=panchaloha',
    },
    {
      title: 'Lost-Wax Chola Bronze Sculptures',
      subtitle: 'Tenth Century Metallurgy Reborn',
      slug: 'bronze',
      image: '/images/statues/nataraja.jpg',
      desc: 'Masterpieces modeled directly in beeswax and cast in pure bronze with traditional antique patinas, embodying timeless cosmic balance.',
      count: '24+ Sculptures',
      query: 'material=bronze',
    },
    {
      title: 'Krishna Shila Black Granite Murtis',
      subtitle: 'Monolithic Hand-Chiselled Stone',
      slug: 'stone',
      image: '/images/statues/perumal.jpg',
      desc: 'Sculpted from dense monolithic black granite stone mined from sacred quarries, chiseled strictly along the Brahma-Sutra axis.',
      count: '12+ Sculptures',
      query: 'material=stone',
    },
    {
      title: 'Lord Murugan Sacred Vel & Peedam Set',
      subtitle: 'Swaminatha, Dhandayuthapani & Karthikeya',
      slug: 'murugan-series',
      image: '/images/statues/murugan.jpg',
      desc: 'Devotional statues of Lord Subramanya with intricately sculpted peacock vahanas and sacred Vel weapons.',
      count: '15+ Statues',
      query: 'deity=murugan',
    },
    {
      title: 'Pure Engraved Heavy Brass Idols',
      subtitle: 'Auspicious Altar & Puja Room Idols',
      slug: 'brass',
      image: '/images/statues/vinayagar.jpg',
      desc: 'Solid cast brass murtis with rich golden sandalwood luster and detailed jewellery engraving.',
      count: '30+ Sculptures',
      query: 'material=brass',
    },
    {
      title: 'Sacred Mandapam & Teakwood Carvings',
      subtitle: 'Country Teak & Rosewood Altar Arts',
      slug: 'wood',
      image: '/images/statues/materials.jpg',
      desc: 'Deep relief hand-carved solid teakwood mandapams, deity doors, and consecrated processional chariots.',
      count: '8+ Works',
      query: 'material=wood',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Curated Sanctums</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Curated Sacred Collections
          </h1>
          <p className="text-sm sm:text-base text-temple-700 leading-relaxed">
            Explore thematic collections organized by metal alloys, stone traditions, and sacred iconography.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => (
            <div
              key={col.slug}
              className="group bg-white rounded-3xl overflow-hidden border border-sand-300 shadow-sm hover:shadow-temple-md hover:border-gold-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-sand-100 overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-temple-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 text-xs font-bold bg-gold-500 text-temple-950 px-2.5 py-1 rounded-lg shadow-sm">
                  {col.count}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-800 block mb-1">
                    {col.subtitle}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-temple-950 group-hover:text-gold-700 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-sand-700 mt-2 leading-relaxed">{col.desc}</p>
                </div>

                <div className="pt-2 border-t border-sand-200">
                  <Link to={`/god-statues?${col.query}`}>
                    <Button variant="gold" size="sm" className="w-full text-xs font-bold">
                      EXPLORE COLLECTION <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
