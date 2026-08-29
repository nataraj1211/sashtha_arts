import React, { useState, useEffect } from 'react';
import { Home, Save, Sparkles } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { HomepageContent } from '@/types';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';

export const AdminHomepagePage: React.FC = () => {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    db.getHomepage().then(setContent);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setIsSaving(true);
    try {
      await db.saveHomepage(content);
      success('Homepage CMS content updated successfully.');
    } catch (err: any) {
      toastError('Failed to update homepage content.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!content) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-sm font-serif">Loading homepage CMS...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-300">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-temple-950">
              Homepage CMS Editor
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-0.5">
              Edit the live hero banner text, sacred headline, and custom order callout banners.
            </p>
          </div>

          <Button
            variant="gold"
            size="md"
            type="submit"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            PUBLISH HOMEPAGE CHANGES
          </Button>
        </div>

        {/* 1. Hero Section CMS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-5">
          <h3 className="font-serif font-bold text-lg text-temple-950 pb-2 border-b border-sand-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Hero Headline &amp; Subtitle</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Hero Badge Tag
              </label>
              <input
                type="text"
                value={content.hero_badge}
                onChange={(e) => setContent({ ...content, hero_badge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Main Hero Headline (Use a comma to split gold accent line)
              </label>
              <input
                type="text"
                value={content.hero_title}
                onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-bold font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Hero Subheading Paragraph
              </label>
              <textarea
                rows={3}
                value={content.hero_subtitle}
                onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-sand-300 text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* 2. Custom Order CTA Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-5">
          <h3 className="font-serif font-bold text-lg text-temple-950 pb-2 border-b border-sand-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Custom &amp; Temple Commission Banner</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                CTA Headline
              </label>
              <input
                type="text"
                value={content.cta_banner_title}
                onChange={(e) => setContent({ ...content, cta_banner_title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-bold font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                CTA Subtitle
              </label>
              <textarea
                rows={2}
                value={content.cta_banner_subtitle}
                onChange={(e) => setContent({ ...content, cta_banner_subtitle: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-sand-300 text-sm leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="gold"
            size="lg"
            type="submit"
            isLoading={isSaving}
            className="font-bold shadow-gold-md"
          >
            PUBLISH HOMEPAGE CHANGES
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};
