import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export const WhatsAppFloatingButton: React.FC = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const adminWhatsApp = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '+919342839218';
  const whatsappChatUrl = createWhatsAppUrl(
    adminWhatsApp,
    'Namaste Sashtha Arts & Crafts, I am browsing your website and would like to enquire about your handcrafted statues.'
  );

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40">
      <a
        href={whatsappChatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Direct WhatsApp Consultation with Artisan"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-16 px-3 py-1.5 bg-temple-950 text-sand-50 text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 border border-gold-500/20">
          Chat with Artisan
        </span>
      </a>
    </div>
  );
};
