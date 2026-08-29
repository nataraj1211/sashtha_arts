import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldCheck, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

const SIDES = [
  {
    key: 'front',
    label: 'Front View',
    title: 'Mukhapatti & Abhaya Mudra',
    description:
      'The sacred facial symmetry (Mukhapatti), divine benevolent gaze (Drishti), and blessing gestures (Abhaya and Varada Mudra) conveying infinite grace and protection.',
    image: '/images/statues/murugan.jpg',
    detailBadge: 'Facial Drishti & Vel',
  },
  {
    key: 'left',
    label: 'Left View',
    title: 'Kati Sutra & Vahana Alignment',
    description:
      'Side curvature displaying traditional Tribhanga or Samabhanga balance, intricate waist girdles (Kati Sutra), and the posture of the Mayil (peacock) vahana.',
    image: '/images/statues/murugan.jpg',
    detailBadge: 'Profile Curvature',
  },
  {
    key: 'right',
    label: 'Right View',
    title: 'Ayudha & Armament Precision',
    description:
      'Dynamic balance of the sacred spear (Shakti Vel), hand ornaments (Keyura and Kankana), and three-dimensional anatomical depth.',
    image: '/images/statues/murugan.jpg',
    detailBadge: 'Ayudha Sculpting',
  },
  {
    key: 'back',
    label: 'Back View',
    title: 'Sirashchakra & Sanctum Depth',
    description:
      'The sacred halo disc (Sirashchakra), braided jata crowns, and complete back ornaments required for sanctum consecration and 360° Abhishekam ceremonies.',
    image: '/images/statues/murugan.jpg',
    detailBadge: 'Sirashchakra Halo',
  },
];

export const FourSideShowcase: React.FC = () => {
  const [activeSide, setActiveSide] = useState(0);
  const current = SIDES[activeSide];

  return (
    <section className="py-20 bg-temple-900 text-sand-50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-gold-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive 4-Side Image View */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] bg-temple-950 rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-temple-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.key}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Angle Tag Overlay */}
              <div className="absolute top-4 left-4 bg-temple-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-gold-400" />
                <span>{current.label}</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-temple-950/85 backdrop-blur-md px-3 py-1 rounded-lg border border-sand-500/30 text-sand-200 text-xs font-medium">
                {current.detailBadge}
              </div>
            </div>

            {/* 4 Angle Selector Tabs */}
            <div className="grid grid-cols-4 gap-2">
              {SIDES.map((side, idx) => (
                <button
                  key={side.key}
                  onClick={() => setActiveSide(idx)}
                  className={`py-2.5 px-1 sm:px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border text-center ${
                    idx === activeSide
                      ? 'bg-gold-500 text-temple-950 border-gold-400 shadow-gold-sm scale-105'
                      : 'bg-temple-800 text-sand-300 border-gold-500/20 hover:bg-temple-700 hover:text-sand-50'
                  }`}
                >
                  {side.key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Educational Value of 4-Side Craftsmanship */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Sacred Precision</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sand-50 leading-tight">
              Why Every Vetri Creation Features 4-Side Inspection
            </h2>

            <p className="text-sm sm:text-base text-sand-200/90 leading-relaxed">
              In traditional South Indian Agama and Shilpa Shastra traditions, a sanctum murti is never flat. It is consecrated to radiate divine spiritual energy in all ten directions. We provide comprehensive Front, Left, Right, and Back views for every idol before it departs our heritage workshop.
            </p>

            {/* Current Angle Explanatory Card */}
            <div className="p-6 rounded-2xl bg-temple-950/70 border border-gold-500/30 space-y-2">
              <span className="text-xs font-mono text-gold-400 font-bold uppercase tracking-wider">
                {current.label} Significance:
              </span>
              <h3 className="font-serif text-lg font-bold text-sand-50">{current.title}</h3>
              <p className="text-xs sm:text-sm text-sand-300 leading-relaxed">{current.description}</p>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 text-xs sm:text-sm text-sand-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Zero hidden imperfections or hollow casting spots</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Complete back carving suitable for central sanctum installation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>High-resolution zoom &amp; swipe viewer on every product page</span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/god-statues">
                <Button variant="gold" size="md">
                  EXPLORE 4-SIDE STATUE CATALOGUE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
