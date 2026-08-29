import { supabase } from './supabase';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 10;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;

export interface UploadResult {
  url: string;
  path?: string;
  error?: string;
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid file format (${file.type}). Allowed: JPG, PNG, WEBP.`,
    };
  }

  if (file.size > MAX_BYTES) {
    return {
      valid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max size is ${MAX_SIZE_MB}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Upload an image file securely to Supabase Storage, or convert to DataURL for immediate client preview
 */
export async function uploadImageFile(file: File, bucket: string = 'products'): Promise<UploadResult> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { url: '', error: validation.error };
  }

  if (supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${bucket}/${cleanFileName}`;

      const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
      return {
        url: publicUrlData.publicUrl,
        path: data.path,
      };
    } catch (err: any) {
      console.warn('Supabase storage upload failed, using Data URL fallback', err);
    }
  }

  // Local / Client-side Data URL Fallback
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ url: reader.result as string });
    };
    reader.onerror = () => {
      resolve({ url: '', error: 'Failed to read image file' });
    };
    reader.readAsDataURL(file);
  });
}
