import React, { useEffect, useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { DeityGrid } from '@/components/home/DeityGrid';
import { FeaturedCreations } from '@/components/home/FeaturedCreations';
import { FourSideShowcase } from '@/components/home/FourSideShowcase';
import { MasterCraftSection } from '@/components/home/MasterCraftSection';
import { CustomOrderCTA } from '@/components/home/CustomOrderCTA';
import { db } from '@/lib/supabase';
import type { HomepageContent } from '@/types';

export const HomePage: React.FC = () => {
  const [content, setContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    db.getHomepage().then(setContent);
  }, []);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        title={content?.hero_title}
        subtitle={content?.hero_subtitle}
        badge={content?.hero_badge}
      />

      {/* 2. Sacred Deity Categories */}
      <DeityGrid />

      {/* 3. Featured Products Grid */}
      <FeaturedCreations />

      {/* 4. Critical 4-Side Craftsmanship Showcase */}
      <FourSideShowcase />

      {/* 5. Madhuchishtavidhana (Lost-Wax) Craft Story */}
      <MasterCraftSection />

      {/* 6. Custom & Temple Commissions CTA */}
      <CustomOrderCTA
        title={content?.cta_banner_title}
        subtitle={content?.cta_banner_subtitle}
      />
    </div>
  );
};
