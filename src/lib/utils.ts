import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Indian Rupee format (₹ XX,XXX) or return "Price on Request"
 */
export function formatPrice(price?: number, priceOnRequest: boolean = false): string {
  if (priceOnRequest || !price || price <= 0) {
    return 'Price on Request';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Generate unique request IDs conforming to Sashtha Arts & Crafts standard:
 * - Order: SAC-2026-XXXX
 * - Enquiry: SAC-ENQ-XXXX
 * - Custom: CUSTOM-XXXX
 * - Temple: TEMPLE-XXXX
 */
export function generateRequestId(type: 'order' | 'enquiry' | 'custom' | 'temple'): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();

  switch (type) {
    case 'order':
      return `SAC-${year}-${randomNum}`;
    case 'enquiry':
      return `SAC-ENQ-${randomNum}`;
    case 'custom':
      return `CUSTOM-${randomNum}`;
    case 'temple':
      return `TEMPLE-${randomNum}`;
    default:
      return `SAC-${randomNum}`;
  }
}

/**
 * Format dimensions string from height, width, depth in inches
 */
export function formatDimensions(height?: number, width?: number, depth?: number): string {
  if (!height) return 'Custom Dimensions Available';
  const parts: string[] = [`${height}" H`];
  if (width) parts.push(`${width}" W`);
  if (depth) parts.push(`${depth}" D`);
  return parts.join(' × ');
}

/**
 * Format weight string in kg
 */
export function formatWeight(weight?: number): string {
  if (!weight) return 'Approximate according to size';
  return `Approx. ${weight} kg`;
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Copy text to clipboard safely
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}

/**
 * Generate WhatsApp direct chat URL with pre-filled message
 */
export function createWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}
