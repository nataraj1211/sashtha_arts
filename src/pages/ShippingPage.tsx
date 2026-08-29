import React from 'react';
import { Truck, ShieldCheck, Box, Globe, PackageCheck } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';

export const ShippingPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-sand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Truck className="w-3.5 h-3.5 text-gold-600" />
            <span>Pan-India &amp; Global Logistics</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            Secure Wooden Crate Shipping
          </h1>
          <p className="text-sm text-temple-700 leading-relaxed">
            Every sacred sculpture is protected with multi-layered shock-absorbing materials and delivered with 100% transit insurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-sand-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-temple-950">Reinforced Wooden Crates</h3>
            <p className="text-xs text-sand-700 leading-relaxed">
              Custom-built pine and plywood boxes with internal steel bracing and high-density foam framing to lock the statue in place.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sand-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-temple-950">100% Transit Insurance</h3>
            <p className="text-xs text-sand-700 leading-relaxed">
              Comprehensive door-to-door insurance coverage against transit accidents, impact, or handling damage.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sand-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-temple-950">Worldwide Air &amp; Sea Cargo</h3>
            <p className="text-xs text-sand-700 leading-relaxed">
              Seamless customs documentation, phytosanitary certifications (ISPM-15), and overseas delivery to homes and temples.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-300 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-temple-950">Delivery Timelines</h2>
          <div className="space-y-4 text-xs sm:text-sm text-temple-800">
            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 flex items-start justify-between gap-4">
              <div>
                <strong className="text-temple-950 block">In-Stock Statues (Pan-India):</strong>
                <span className="text-sand-700">Dispatched in 48 hours. Delivered within 5 to 7 business days via surface express.</span>
              </div>
              <span className="font-bold text-emerald-800 text-xs shrink-0">5–7 Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 flex items-start justify-between gap-4">
              <div>
                <strong className="text-temple-950 block">International Express Air Delivery:</strong>
                <span className="text-sand-700">Dispatched via DHL / FedEx Express with real-time tracking (USA, UK, Singapore, Europe).</span>
              </div>
              <span className="font-bold text-emerald-800 text-xs shrink-0">7–12 Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 flex items-start justify-between gap-4">
              <div>
                <strong className="text-temple-950 block">Large Temple Stone &amp; Bronze Cargo:</strong>
                <span className="text-sand-700">Dedicated freight carrier with hydraulic tail-lift loading for temples and sanctorums.</span>
              </div>
              <span className="font-bold text-emerald-800 text-xs shrink-0">Scheduled</span>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link to="/god-statues">
              <Button variant="gold" size="md">
                Browse Ready Statues
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
