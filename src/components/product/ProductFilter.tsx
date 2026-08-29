import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import type { FilterState, DeityType } from '@/types';
import { Button } from '../common/Button';

export interface ProductFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const DEITIES: Array<{ label: string; value: string }> = [
  { label: 'All Sacred Deities', value: 'all' },
  { label: 'Lord Murugan', value: 'murugan' },
  { label: 'Maha Vinayagar', value: 'vinayagar' },
  { label: 'Sri Mariamman', value: 'amman' },
  { label: 'Lord Shiva / Nataraja', value: 'shiva' },
  { label: 'Balaji Perumal', value: 'perumal' },
  { label: 'Lord Krishna', value: 'krishna' },
  { label: 'Swami Ayyappan', value: 'ayyappan' },
  { label: 'Veera Anjaneyar', value: 'anjaneyar' },
];

const MATERIALS: Array<{ label: string; value: string }> = [
  { label: 'All Materials', value: 'all' },
  { label: 'Panchaloha (5-Metal)', value: 'panchaloha' },
  { label: 'Chola Bronze', value: 'bronze' },
  { label: 'Solid Brass', value: 'brass' },
  { label: 'Black Granite Stone', value: 'stone' },
  { label: 'Sacred Teak Wood', value: 'wood' },
];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const handleDeityChange = (deity: string) => {
    onChange({ ...filters, deity });
  };

  const handleMaterialChange = (material: string) => {
    onChange({ ...filters, material });
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onChange({ ...filters, sortBy });
  };

  const hasActiveFilters =
    filters.deity !== 'all' ||
    filters.material !== 'all' ||
    filters.searchQuery !== '' ||
    filters.sortBy !== 'featured';

  return (
    <div className="bg-white rounded-2xl border border-sand-300 p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-sand-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gold-600" />
          <h3 className="font-serif font-bold text-base text-temple-900">Filter Creations</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-terracotta-700 hover:text-terracotta-800 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Deity Section */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-temple-800 flex items-center justify-between">
          <span>Sacred Deity</span>
          <Sparkles className="w-3 h-3 text-gold-500" />
        </label>
        <div className="flex flex-col gap-1">
          {DEITIES.map((d) => {
            const isSelected = filters.deity === d.value;
            return (
              <button
                key={d.value}
                onClick={() => handleDeityChange(d.value)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-gold-500/15 text-gold-900 font-bold border border-gold-400/40'
                    : 'text-temple-800 hover:bg-sand-100 hover:text-temple-950'
                }`}
              >
                <span>{d.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-gold-700" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Material Section */}
      <div className="space-y-2.5 pt-2 border-t border-sand-200">
        <label className="text-xs font-bold uppercase tracking-wider text-temple-800 block">
          Sacred Material
        </label>
        <div className="flex flex-col gap-1">
          {MATERIALS.map((m) => {
            const isSelected = filters.material === m.value;
            return (
              <button
                key={m.value}
                onClick={() => handleMaterialChange(m.value)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-gold-500/15 text-gold-900 font-bold border border-gold-400/40'
                    : 'text-temple-800 hover:bg-sand-100 hover:text-temple-950'
                }`}
              >
                <span>{m.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-gold-700" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort Section */}
      <div className="space-y-2.5 pt-2 border-t border-sand-200">
        <label className="text-xs font-bold uppercase tracking-wider text-temple-800 block">
          Sort Order
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as any)}
          className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs text-temple-900 bg-sand-50 focus:ring-2 focus:ring-gold-500 focus:outline-none font-medium"
        >
          <option value="featured">Featured Creations</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="height_asc">Height: Small to Large</option>
          <option value="height_desc">Height: Large to Small</option>
        </select>
      </div>

      {/* Total Matching Badge */}
      <div className="pt-2 text-center text-xs text-sand-700">
        Displaying <strong>{totalResults}</strong> handcrafted statue{totalResults !== 1 ? 's' : ''}
      </div>
    </div>
  );
};
