import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface DeityItem {
  name: string;
  tamilName: string;
  deitySlug: string;
  image: string;
  description: string;
}

const DEITIES: DeityItem[] = [
  {
    name: 'Lord Murugan',
    tamilName: 'முருகன்',
    deitySlug: 'murugan',
    image: '/images/statues/murugan.jpg',
    description: 'Swaminatha, Dhandayuthapani & Karthikeya with sacred Vel in Panchaloha & Bronze.',
  },
  {
    name: 'Maha Vinayagar',
    tamilName: 'விநாயகர்',
    deitySlug: 'vinayagar',
    image: '/images/statues/vinayagar.jpg',
    description: 'Auspicious Valampuri, Nrutya Ganapathi & Prabhavali Brass & Bronze Murtis.',
  },
  {
    name: 'Sri Mariamman',
    tamilName: 'மாரியம்மன்',
    deitySlug: 'amman',
    image: '/images/statues/amman.jpg',
    description: 'Divine Mother in Nagakudai canopy, Lalitha, and Durga postures with Trishula.',
  },
  {
    name: 'Lord Shiva & Nataraja',
    tamilName: 'நடராஜர் / சிவன்',
    deitySlug: 'shiva',
    image: '/images/statues/nataraja.jpg',
    description: 'Ananda Tandava Chola Bronze, Somaskanda & Lingam sculpted with perfection.',
  },
  {
    name: 'Lord Perumal',
    tamilName: 'பெருமாள் / பாலாஜி',
    deitySlug: 'perumal',
    image: '/images/statues/perumal.jpg',
    description: 'Sri Venkateswara Balaji in dense Krishna Shila black granite & Panchaloha.',
  },
  {
    name: 'Lord Krishna',
    tamilName: 'கிருஷ்ணர்',
    deitySlug: 'krishna',
    image: '/images/statues/krishna.jpg',
    description: 'Venugopala with Kamadhenu, butter Krishna, and Radha-Krishna pairings.',
  },
  {
    name: 'Swami Ayyappan',
    tamilName: 'ஐயப்பன்',
    deitySlug: 'ayyappan',
    image: '/images/statues/ayyappan.jpg',
    description: 'Dharma Sastha in Yogarudha posture with knee band on sacred tiered peedam.',
  },
  {
    name: 'Veera Anjaneyar',
    tamilName: 'ஆஞ்சநேயர்',
    deitySlug: 'anjaneyar',
    image: '/images/statues/anjaneyar.jpg',
    description: 'Sanjeevi Hanuman & Bhaktha Anjaneyar in heavy pure cast brass and granite.',
  },
];

export const DeityGrid: React.FC = () => {
  return (
    <section className="py-20 bg-sand-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Sacred Iconography</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-temple-950">
            Browse Statues by Sacred Deity
          </h2>
          <p className="text-sm sm:text-base text-temple-700/80 leading-relaxed">
            Every Hindu deity is sculpted strictly in accordance with traditional Dhyana Shlokas and Shilpa Shastra proportions for sacred sanctums and domestic puja rooms.
          </p>
        </div>

        {/* 8-Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEITIES.map((deity) => (
            <Link
              key={deity.deitySlug}
              to={`/god-statues?deity=${deity.deitySlug}`}
              className="group relative bg-white rounded-2xl overflow-hidden border border-sand-300 shadow-sm hover:shadow-temple-md hover:border-gold-500/60 transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden">
                <img
                  src={deity.image}
                  alt={deity.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-temple-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Tamil Name Tag */}
                <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded bg-temple-900/80 text-gold-300 border border-gold-500/30 backdrop-blur-sm">
                  {deity.tamilName}
                </span>

                {/* Floating Arrow */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-gold-500 text-temple-950 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-temple-900 group-hover:text-gold-700 transition-colors">
                    {deity.name}
                  </h3>
                  <p className="text-xs text-sand-700 mt-1 leading-relaxed line-clamp-2">
                    {deity.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between text-xs font-semibold text-gold-800 group-hover:text-gold-900">
                  <span>Explore Statues</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
