import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Landmark, MessageSquare, ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Sacred Lineage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            About Sashtha Arts &amp; Crafts
          </h1>
          <p className="text-sm sm:text-base text-temple-700 leading-relaxed">
            Rooted in the heartland of South Indian sculpture at Swamimalai and Mahabalipuram, preserving the timeless craft of lost-wax bronze casting and Agama Shastra stone sculpting.
          </p>
        </div>

        {/* Heritage Workshop Banner */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-sand-300 shadow-sm">
          <img
            src="/images/statues/workshop.jpg"
            alt="Traditional South Indian master sthapathi artisan hand-carving Hindu bronze deity sculpture in Swamimalai workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-temple-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-sand-50">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300">Generations of Devotion</span>
            <p className="font-serif font-bold text-lg sm:text-xl">Hereditary Vishwakarma Sthapathis of Swamimalai &amp; Mahabalipuram</p>
          </div>
        </div>

        {/* Heritage Story */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sand-300 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-temple-950">
            A Devotional Commitment to Traditional Shilpa Shastra
          </h2>
          <p className="text-sm text-temple-800 leading-relaxed">
            <strong>Sashtha Arts &amp; Crafts</strong> was founded with a singular sacred purpose: to keep alive the thousand-year-old metallurgical and sculpting traditions of Tamil Nadu without compromising on authenticity, metal purity, or iconometric accuracy.
          </p>
          <p className="text-sm text-temple-800 leading-relaxed">
            Every Hindu God statue we sculpt—from Lord Murugan holding His divine Vel to the cosmic dance of Lord Nataraja—is crafted with deep bhakti (devotion) and rigorous discipline by hereditary Vishwakarma sthapathis who have practiced this craft for generations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-sand-200">
            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 text-center space-y-1">
              <span className="font-serif text-2xl font-bold text-gold-700">100%</span>
              <p className="text-xs font-bold text-temple-950">Lost-Wax Technique</p>
              <p className="text-[11px] text-sand-600">Traditional Madhuchishtavidhana</p>
            </div>
            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 text-center space-y-1">
              <span className="font-serif text-2xl font-bold text-gold-700">Panchaloha</span>
              <p className="text-xs font-bold text-temple-950">5 Sacred Metals</p>
              <p className="text-[11px] text-sand-600">Agamic Iconometry</p>
            </div>
            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 text-center space-y-1">
              <span className="font-serif text-2xl font-bold text-gold-700">Global</span>
              <p className="text-xs font-bold text-temple-950">Insured Delivery</p>
              <p className="text-[11px] text-sand-600">Custom Wooden Crates</p>
            </div>
          </div>
        </div>

        {/* Pillars of Integrity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-sand-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-temple-950">4-Side Geometry</h3>
            <p className="text-xs text-sand-700 leading-relaxed">
              We sculpt every idol with complete front, left, right, and back detailing so the murti radiates grace in all ten directions.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sand-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-temple-950">Solid Castings</h3>
            <p className="text-xs text-sand-700 leading-relaxed">
              Never hollow or resin-filled. Heavy, resonant, and consecrated for centuries of holy water Abhishekam.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sand-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-temple-950">Devotion First</h3>
            <p className="text-xs text-sand-700 leading-relaxed">
              Every stage—from clay moulding to eye opening (Netronmeelana)—is conducted during auspicious muhurthams.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-temple-900 text-sand-50 rounded-3xl p-8 sm:p-12 border-2 border-gold-500/40 shadow-temple-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-sand-50">
              Speak with Our Master Sthapathis
            </h3>
            <p className="text-xs sm:text-sm text-sand-300">
              Whether you require a sacred domestic altar idol or a grand temple sanctum murti set.
            </p>
          </div>
          <Link to="/contact">
            <Button variant="gold" size="lg">
              CONTACT US TODAY <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
