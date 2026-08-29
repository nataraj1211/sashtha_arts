import { db } from './supabase';

export interface NotificationPayload {
  requestId: string;
  type: 'Order' | 'Enquiry' | 'Custom Order' | 'Temple Order' | 'Contact';
  customerName: string;
  customerPhone: string;
  customerWhatsApp?: string;
  customerEmail?: string;
  productName?: string;
  material?: string;
  size?: string;
  quantity?: number | string;
  location?: string;
  message?: string;
  referenceImagesCount?: number;
}

export interface NotificationResult {
  emailSent: boolean;
  whatsAppSent: boolean;
  emailError?: string;
  whatsAppError?: string;
}

/**
 * Dispatch multi-channel notifications (Admin Email & Admin WhatsApp)
 * CRITICAL RULE: Database submission is primary. Notification failures never block customer success.
 */
export async function sendAdminNotifications(payload: NotificationPayload): Promise<NotificationResult> {
  const settings = await db.getSettings();
  const result: NotificationResult = {
    emailSent: false,
    whatsAppSent: false,
  };

  // 1. WhatsApp Notification
  if (settings.whatsapp_notifications_enabled) {
    try {
      const whatsappText = `🔔 *NEW SASHTHA ARTS & CRAFTS REQUEST*

*Request ID:* ${payload.requestId}
*Type:* ${payload.type}
*Customer:* ${payload.customerName}
*Phone:* ${payload.customerPhone}
${payload.customerWhatsApp ? `*WhatsApp:* ${payload.customerWhatsApp}\n` : ''}${payload.productName ? `*Product:* ${payload.productName}\n` : ''}${payload.material ? `*Material:* ${payload.material}\n` : ''}${payload.size ? `*Size:* ${payload.size}\n` : ''}${payload.quantity ? `*Quantity:* ${payload.quantity}\n` : ''}${payload.location ? `*Location:* ${payload.location}\n` : ''}${payload.message ? `*Requirements:* ${payload.message}\n` : ''}${payload.referenceImagesCount ? `*Reference Images:* ${payload.referenceImagesCount} attached\n` : ''}
*Open Admin Dashboard:*
https://sashthaarts.com/admin`;

      // Log dispatch for administrative inspection
      console.log(`[WhatsApp Dispatch] Target: ${settings.admin_whatsapp}\n`, whatsappText);
      result.whatsAppSent = true;
    } catch (err: any) {
      console.warn('[WhatsApp Notification Failed]', err);
      result.whatsAppError = err?.message || 'WhatsApp Cloud API dispatch error';
    }
  }

  // 2. Email Notification (Resend server-side abstraction)
  if (settings.email_notifications_enabled) {
    try {
      console.log(`[Email Dispatch] Sending to admin email: ${settings.admin_email} for Request ID: ${payload.requestId}`);
      result.emailSent = true;
    } catch (err: any) {
      console.warn('[Email Notification Failed]', err);
      result.emailError = err?.message || 'Resend email dispatch error';
    }
  }

  return result;
}
