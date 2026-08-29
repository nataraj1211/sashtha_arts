import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { db } from '@/lib/supabase';
import type { Product, FilterState } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilter } from '@/components/product/ProductFilter';

export const GodStatuesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filter state from URL query parameters
  const initialDeity = searchParams.get('deity') || 'all';
  const initialMaterial = searchParams.get('material') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [filters, setFilters] = useState<FilterState>({
    deity: initialDeity,
    material: initialMaterial,
    category: 'all',
    searchQuery: initialSearch,
    sortBy: initialSort,
  });

  // Sync state with URL params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.deity && filters.deity !== 'all') params.deity = filters.deity;
    if (filters.material && filters.material !== 'all') params.material = filters.material;
    if (filters.searchQuery) params.search = filters.searchQuery;
    if (filters.sortBy && filters.sortBy !== 'featured') params.sort = filters.sortBy;
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const data = await db.getProducts();
      setProducts(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Deity filter
        if (filters.deity !== 'all' && product.deity.toLowerCase() !== filters.deity.toLowerCase()) {
          return false;
        }

        // Material filter
        if (filters.material !== 'all') {
          const mat = product.material.toLowerCase();
          const target = filters.material.toLowerCase();
          if (target === 'panchaloha' && !mat.includes('panchaloha')) return false;
          if (target === 'bronze' && !mat.includes('bronze')) return false;
          if (target === 'brass' && !mat.includes('brass')) return false;
          if (target === 'stone' && !mat.includes('stone') && !mat.includes('granite')) return false;
          if (target === 'wood' && !mat.includes('wood') && !mat.includes('teak')) return false;
        }

        // Search text
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(q) ||
            product.product_code.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.material.toLowerCase().includes(q);
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_asc':
            return (a.price || 0) - (b.price || 0);
          case 'price_desc':
            return (b.price || 0) - (a.price || 0);
          case 'height_asc':
            return (a.height || 0) - (b.height || 0);
          case 'height_desc':
            return (b.height || 0) - (a.height || 0);
          case 'featured':
          default:
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
      });
  }, [products, filters]);

  const handleResetFilters = () => {
    setFilters({
      deity: 'all',
      material: 'all',
      category: 'all',
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  return (
    <div className="pt-28 pb-20 bg-sand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="mb-10 text-center sm:text-left space-y-3 pb-8 border-b border-sand-300">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Sacred Statue Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-temple-950">
            South Indian Handcrafted Hindu God Statues
          </h1>
          <p className="text-sm sm:text-base text-temple-700 max-w-3xl leading-relaxed">
            Explore authentic Panchaloha, lost-wax cast bronze, solid heavy brass, Krishna Shila black granite, and sacred teakwood murtis crafted in traditional Shilpa Shastra proportions.
          </p>
        </div>

        {/* Top Control Bar: Search & Mobile Filter Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Quick Search */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-600" />
            <input
              type="text"
              placeholder="Search statue name, code, or material..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
            />
          </div>

          {/* Mobile Filter Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-xs font-bold text-temple-900 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-gold-600" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            <span className="text-xs text-sand-700 font-medium">
              Showing <strong>{filteredProducts.length}</strong> creations
            </span>
          </div>
        </div>

        {/* Main Content Layout: Filter Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <ProductFilter
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </div>

          {/* Mobile Filter Drawer Modal */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-temple-950/70 backdrop-blur-sm">
              <div className="w-full max-w-md bg-white rounded-2xl p-4 max-h-[85vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center pb-2 mb-2 border-b">
                  <h3 className="font-serif font-bold text-lg">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded text-sand-600 font-bold"
                  >
                    Done
                  </button>
                </div>
                <ProductFilter
                  filters={filters}
                  onChange={setFilters}
                  onReset={handleResetFilters}
                  totalResults={filteredProducts.length}
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="aspect-[4/5] bg-sand-200 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-sand-300 p-8 space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-sand-500">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-temple-900">
                  No Statues Match Your Exact Criteria
                </h3>
                <p className="text-xs text-sand-700 max-w-md mx-auto leading-relaxed">
                  Try clearing some filter tags or commission our master artisans to sculpt your customized deity with your desired dimensions.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-gold-gradient text-temple-950 font-bold text-xs shadow-gold-sm hover:brightness-105"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
