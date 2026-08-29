import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { db } from '@/lib/supabase';
import type { Product } from '@/types';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../common/Button';

export const FeaturedCreations: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      setIsLoading(true);
      const all = await db.getProducts();
      const featured = all.filter((p) => p.featured).slice(0, 8);
      setProducts(featured.length > 0 ? featured : all.slice(0, 8));
      setIsLoading(false);
    }
    loadFeatured();
  }, []);

  return (
    <section className="py-20 bg-sand-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Master Sculptures</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-temple-950">
              Featured Sacred Creations
            </h2>
            <p className="text-sm sm:text-base text-temple-700/80">
              Each idol is individually cast via the lost-wax technique and chiselled with 4-side geometric accuracy.
            </p>
          </div>

          <Link to="/god-statues">
            <Button variant="outline" size="md">
              VIEW ALL STATUES <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[4/5] bg-sand-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
