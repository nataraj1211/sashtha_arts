import React from 'react';
import { Sparkles, Heart, ShieldCheck, Droplets, Sun, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export const CareGuidePage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Droplets className="w-3.5 h-3.5 text-gold-600" />
            <span>Puja &amp; Preservation Rituals</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Sacred Statue Care &amp; Cleaning Guide
          </h1>
          <p className="text-sm text-temple-700 leading-relaxed">
            Essential guidelines for performing ceremonial Abhishekam, cleaning Panchaloha, and preserving traditional antique patinas.
          </p>
        </div>

        {/* Material Specific Care */}
        <div className="space-y-6">
          {/* Panchaloha & Bronze */}
          <div className="bg-white rounded-3xl p-8 border border-sand-300 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-xl text-temple-950 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gold-500" />
              Panchaloha &amp; Chola Bronze Statues
            </h2>
            <p className="text-xs sm:text-sm text-sand-800 leading-relaxed">
              Panchaloha thrives on regular spiritual contact. The natural oils from holy water, milk, and honey create an auspicious organic protective sheen over decades.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-sand-700">
              <li><strong>Abhishekam:</strong> Rinse thoroughly with clean water after milk, honey, or panchamirtham rituals to prevent acidic buildup in crevices.</li>
              <li><strong>Drying:</strong> Always pat dry with a soft, clean cotton dhoti or muslin cloth. Do not leave water pooling around the peedam.</li>
              <li><strong>Restoring Antique Patina:</strong> Gently apply a thin coat of pure cold-pressed sesame (til) oil or sandalwood oil using a soft paintbrush.</li>
            </ul>
          </div>

          {/* Brass Statues */}
          <div className="bg-white rounded-3xl p-8 border border-sand-300 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-xl text-temple-950 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              Heavy Solid Brass Idols
            </h2>
            <p className="text-xs sm:text-sm text-sand-800 leading-relaxed">
              Brass can either be maintained with a bright golden shine or allowed to age gracefully into a deep antique temple tone.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-sand-700">
              <li><strong>Traditional Polish:</strong> Make a paste of tamarind pulp with a pinch of rock salt or use Pitambari powder. Rub gently and wash with lukewarm water.</li>
              <li><strong>Sacred Ash (Vibhuti):</strong> Dusting vibhuti over the idol with a soft cloth gives brass a sacred, silken antique glow without harsh chemicals.</li>
            </ul>
          </div>

          {/* Black Granite Krishna Shila */}
          <div className="bg-white rounded-3xl p-8 border border-sand-300 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-xl text-temple-950 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-temple-900" />
              Krishna Shila Black Granite Stone
            </h2>
            <p className="text-xs sm:text-sm text-sand-800 leading-relaxed">
              Monolithic granite is non-porous and virtually immune to water degradation.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-sand-700">
              <li><strong>Temple Oil Treatment:</strong> Applying gingelly oil (Nallennai) once every fortnight enhances the deep obsidian black finish of the Krishna Shila.</li>
              <li><strong>Chandan &amp; Kumkum:</strong> You may freely apply sandal paste and kumkum to the forehead, hands, and feet during daily puja.</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link to="/god-statues">
            <Button variant="gold" size="md">
              Explore All Consecrated Statues
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
