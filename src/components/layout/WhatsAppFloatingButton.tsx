import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export const WhatsAppFloatingButton: React.FC = () => {
  const location = useLocation();

  // Hide on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappChatUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Vetri Arts & Crafts, I am browsing your website and would like to enquire about your handcrafted statues.'
  );

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40">
      <a
        href={whatsappChatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Direct WhatsApp Consultation"
      >
        {/* Pulsing Aura */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 relative z-10" />

        {/* Tooltip on Desktop Hover */}
        <span className="hidden md:group-hover:flex absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-temple-950 text-sand-50 text-xs font-medium whitespace-nowrap shadow-md border border-gold-500/30 items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Enquire on WhatsApp
        </span>
      </a>
    </div>
  );
};
