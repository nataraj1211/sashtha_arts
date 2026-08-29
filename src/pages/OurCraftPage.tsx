import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, Compass, Hammer, Eye, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const OurCraftPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Living Shilpa Shastra Heritage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Our Ancient Craft &amp; Methodology
          </h1>
          <p className="text-sm sm:text-base text-temple-700 leading-relaxed">
            Discover the thousands-year-old Madhuchishtavidhana (Lost-Wax Bronze Casting) and Agama Shastra guidelines preserved by Sashtha Arts &amp; Crafts master sthapathis.
          </p>
        </div>

        {/* Section 1: What is Shilpa Shastra? */}
        <div className="bg-white rounded-3xl border border-sand-300 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500 text-temple-950 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-temple-950">
              The Canonical Science of Shilpa Shastra
            </h2>
          </div>
          <p className="text-sm text-temple-800 leading-relaxed">
            In South Indian Hindu temple tradition, a statue is not mere ornamental sculpture; it is a metaphysical conduit (Murti) consecrated to anchor cosmic pranic energy. The ancient treatises—including the <em>Manasara</em>, <em>Mayamata</em>, and <em>Silparatna</em>—dictate the exact mathematical proportions (Talamana) for every deity:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300">
              <h4 className="font-serif font-bold text-sm text-temple-950 mb-1">Dasa Tala (10 Units)</h4>
              <p className="text-xs text-sand-700">Reserved for major supreme deities like Shiva, Murugan, Vishnu, and Amman.</p>
            </div>
            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300">
              <h4 className="font-serif font-bold text-sm text-temple-950 mb-1">Nava Tala (9 Units)</h4>
              <p className="text-xs text-sand-700">Used for secondary devatas, guardian figures, and attendant saints.</p>
            </div>
            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300">
              <h4 className="font-serif font-bold text-sm text-temple-950 mb-1">Ashta Tala (8 Units)</h4>
              <p className="text-xs text-sand-700">Canonical human and heroic figures such as Veera Anjaneyar and bhakthas.</p>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Workshop & Sthapathi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-sand-300 shadow-sm">
            <img
              src="/images/statues/workshop.jpg"
              alt="Traditional South Indian master sthapathi sculpting bronze deity idol"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-temple-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-sand-50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300">Swamimalai Lineage</span>
              <p className="font-serif font-bold text-sm">Hereditary Hand-Chiselling &amp; Detailing</p>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-sand-300 shadow-sm">
            <img
              src="/images/statues/temple.jpg"
              alt="Consecrated South Indian temple sanctum and stone murtis"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-temple-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-sand-50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300">Agama Standard</span>
              <p className="font-serif font-bold text-sm">Sanctum Consecration &amp; Prana Pratishtha</p>
            </div>
          </div>
        </div>

        {/* Section 2: Step-by-Step Lost-Wax Process */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-temple-950">
              The 6 Stages of Madhuchishtavidhana (Lost-Wax Casting)
            </h2>
            <p className="text-xs sm:text-sm text-sand-700">How every single bronze and Panchaloha idol is born from fire and river clay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'Beeswax Formulation & Sculpting',
                desc: 'A pliable compound of pure unbleached bee wax, Kungiliyam (dammar tree resin), and gingelly oil is heated and kneaded. The sthapathi sculpts the entire deity by hand using coconut-wood spatulas.',
              },
              {
                num: '02',
                title: 'Cauvery River Alluvial Clay Moulding',
                desc: 'Three successive layers of distinct alluvial clay are applied over the wax model. The innermost layer is ultra-fine riverbed silt capturing microscopic facial features, followed by sand-strengthened outer coats.',
              },
              {
                num: '03',
                title: 'Dewaxing by Sacred Flame',
                desc: 'The terracotta mould is baked over an open coconut-husk fire. The wax core melts and flows out through designed drainage vents, leaving an empty, fire-hardened negative chamber.',
              },
              {
                num: '04',
                title: 'Molten Sacred Alloy Pouring',
                desc: 'Consecrated copper, bronze, or Panchaloha is liquefied at over 1,000°C in graphite crucibles and poured continuously into the red-hot mould without interruption to prevent air cavities.',
              },
              {
                num: '05',
                title: 'Chiselling & Hand Engraving',
                desc: 'Once cooled naturally over 24 hours, the terracotta mould is gently broken open. Hereditary silversmiths and sthapathis spend days hand-chiselling crowns, necklaces, finger details, and weapons.',
              },
              {
                num: '06',
                title: 'Netronmeelana (Eye Opening)',
                desc: 'The final, most sacred ritual where the artisan uses a golden chisel to open the divine gaze (Drishti) of the deity before applying the traditional antique temple polish.',
              },
            ].map((st) => (
              <div key={st.num} className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm space-y-2">
                <span className="font-serif font-bold text-2xl text-gold-600">{st.num}</span>
                <h3 className="font-serif font-bold text-base text-temple-950">{st.title}</h3>
                <p className="text-xs text-sand-700 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Consecration Readiness */}
        <div className="bg-temple-900 text-sand-50 rounded-3xl p-8 sm:p-12 border-2 border-gold-500/40 shadow-temple-lg space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-gold-400" />
            <h3 className="font-serif text-2xl font-bold text-sand-50">
              Ready for Sacred Prana Pratishtha
            </h3>
          </div>
          <p className="text-sm text-sand-200/90 leading-relaxed">
            All statues commissioned from Sashtha Arts &amp; Crafts are delivered clean, solid, resonant, and non-magnetized. They are fully prepared for ceremonial Abhishekam, Yajna consecration, and Prana Pratishtha rituals conducted by your temple priests.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link to="/custom-order">
              <Button variant="gold" size="md">
                COMMISSION A CUSTOM STATUE
              </Button>
            </Link>
            <Link to="/god-statues">
              <Button variant="outline" size="md" className="border-gold-400 text-sand-50 hover:bg-gold-500/10">
                BROWSE READY SCULPTURES
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
