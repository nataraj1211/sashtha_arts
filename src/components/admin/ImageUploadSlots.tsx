import React, { useState } from 'react';
import { Upload, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import type { ProductImage, ProductViewType } from '@/types';
import { uploadImageFile } from '@/lib/storage';
import { useToast } from '@/context/ToastContext';

export interface ImageUploadSlotsProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

const REQUIRED_SLOTS: Array<{ type: ProductViewType; label: string; mandatory: boolean }> = [
  { type: 'front', label: 'FRONT IMAGE *', mandatory: true },
  { type: 'left', label: 'LEFT IMAGE *', mandatory: true },
  { type: 'right', label: 'RIGHT IMAGE *', mandatory: true },
  { type: 'back', label: 'BACK IMAGE *', mandatory: true },
  { type: 'detail', label: 'DETAIL VIEW', mandatory: false },
  { type: 'lifestyle', label: 'LIFESTYLE / ALTAR', mandatory: false },
];

export const ImageUploadSlots: React.FC<ImageUploadSlotsProps> = ({ images, onChange }) => {
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const { success, error: toastError } = useToast();

  const handleFileChange = async (type: ProductViewType, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploadingSlot(type);

    const result = await uploadImageFile(file, 'products');
    setUploadingSlot(null);

    if (result.error) {
      toastError(result.error);
      return;
    }

    // Replace or add image for this view_type
    const existingIdx = images.findIndex((img) => img.view_type === type);
    const newImage: ProductImage = {
      id: existingIdx >= 0 ? images[existingIdx].id : `img-${Date.now()}-${type}`,
      product_id: '',
      image_url: result.url,
      storage_path: result.path,
      view_type: type,
      sort_order: type === 'front' ? 1 : type === 'left' ? 2 : type === 'right' ? 3 : type === 'back' ? 4 : 5,
      is_primary: type === 'front',
    };

    let updated: ProductImage[];
    if (existingIdx >= 0) {
      updated = [...images];
      updated[existingIdx] = newImage;
    } else {
      updated = [...images, newImage];
    }

    onChange(updated);
    success(`Uploaded ${type.toUpperCase()} image successfully.`);
  };

  const handleRemove = (type: ProductViewType) => {
    onChange(images.filter((img) => img.view_type !== type));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider">
            Product 4-Side Views &amp; Angles (Critical)
          </label>
          <span className="text-xs text-sand-600">
            Upload Front, Left, Right, and Back views for the interactive customer viewer.
          </span>
        </div>
      </div>

      {/* Grid of Slots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {REQUIRED_SLOTS.map((slot) => {
          const imageObj = images.find((img) => img.view_type === slot.type);
          const isSlotUploading = uploadingSlot === slot.type;

          return (
            <div
              key={slot.type}
              className={`relative rounded-2xl border-2 overflow-hidden flex flex-col justify-between aspect-[3/4] transition-all ${
                imageObj
                  ? 'border-gold-500 bg-sand-100 shadow-sm'
                  : slot.mandatory
                  ? 'border-dashed border-sand-400 bg-sand-50 hover:border-gold-500'
                  : 'border-dashed border-sand-300 bg-sand-50/50 hover:border-sand-400'
              }`}
            >
              {/* Header Label inside Slot */}
              <div
                className={`py-1.5 px-2 text-center text-[10px] font-bold uppercase tracking-wider ${
                  imageObj
                    ? 'bg-temple-900 text-gold-300'
                    : slot.mandatory
                    ? 'bg-gold-200 text-gold-950 font-bold'
                    : 'bg-sand-200 text-sand-700'
                }`}
              >
                {slot.label}
              </div>

              {/* Center Preview or Upload Action */}
              <div className="flex-1 flex items-center justify-center p-2 relative">
                {imageObj ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imageObj.image_url}
                      alt={slot.label}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(slot.type)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-temple-950/80 hover:bg-terracotta-700 text-white shadow-sm"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center text-center p-2 h-full w-full">
                    <Upload className="w-6 h-6 text-sand-500 mb-1" />
                    <span className="text-[11px] font-semibold text-temple-800">
                      {isSlotUploading ? 'Uploading...' : 'Upload'}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleFileChange(slot.type, e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Status footer */}
              <div className="py-1 px-2 text-center text-[9px] text-sand-600 bg-white border-t border-sand-200">
                {imageObj ? '✓ Ready' : slot.mandatory ? 'Required' : 'Optional'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
