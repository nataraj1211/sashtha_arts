import React, { useState, useEffect } from 'react';
import { Settings, Save, ShieldCheck, Bell, MessageCircle, Mail } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { AdminSettings } from '@/types';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    db.getSettings().then(setSettings);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    try {
      await db.saveSettings(settings);
      success('Admin configuration and notification preferences saved.');
    } catch (err: any) {
      toastError('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-sm font-serif">Loading settings...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-300">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-temple-950">
              Business &amp; Notification Settings
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-0.5">
              Configure artisan contact numbers, admin notification destinations, and business details.
            </p>
          </div>

          <Button
            variant="gold"
            size="md"
            type="submit"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            SAVE SETTINGS
          </Button>
        </div>

        {/* 1. Multi-Channel Notification Settings */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-temple-950 pb-2 border-b border-sand-200 flex items-center gap-2">
            <Bell className="w-5 h-5 text-gold-600" />
            <span>Multi-Channel Admin Notifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-sand-50 border border-sand-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-temple-950">
                  <Mail className="w-4 h-4 text-gold-600" />
                  <span>Resend Email Dispatch</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.email_notifications_enabled}
                  onChange={(e) =>
                    setSettings({ ...settings, email_notifications_enabled: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500"
                />
              </div>
              <p className="text-xs text-sand-700">
                Dispatches a notification email immediately when a new enquiry or order request is placed.
              </p>
              <div>
                <label className="block text-[11px] font-bold text-sand-800 uppercase mb-1">
                  Recipient Admin Email
                </label>
                <input
                  type="email"
                  value={settings.admin_email}
                  onChange={(e) => setSettings({ ...settings, admin_email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs bg-white"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sand-50 border border-sand-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-temple-950">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Cloud API Dispatch</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.whatsapp_notifications_enabled}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsapp_notifications_enabled: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
              </div>
              <p className="text-xs text-sand-700">
                Sends automated WhatsApp text alerts directly to your configured mobile number.
              </p>
              <div>
                <label className="block text-[11px] font-bold text-sand-800 uppercase mb-1">
                  Recipient Admin WhatsApp
                </label>
                <input
                  type="tel"
                  value={settings.admin_whatsapp}
                  onChange={(e) => setSettings({ ...settings, admin_whatsapp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Business Profile & Socials */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-temple-950 pb-2 border-b border-sand-200 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-600" />
            <span>Business Information &amp; Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.business_phone}
                onChange={(e) => setSettings({ ...settings, business_phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram_url}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Workshop Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
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
            SAVE CONFIGURATION
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};
