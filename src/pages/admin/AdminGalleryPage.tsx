import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { GalleryItem } from '@/types';
import { uploadImageFile } from '@/lib/storage';
import { useToast } from '@/context/ToastContext';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';

export const AdminGalleryPage: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { success, error: toastError } = useToast();

  const loadGallery = async () => {
    const data = await db.getGallery();
    setGallery(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      description: '',
      image_url: '',
      category: 'workshop',
      material: 'Bronze',
      is_featured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setIsUploading(true);
    const res = await uploadImageFile(e.target.files[0], 'gallery');
    setIsUploading(false);
    if (res.url && editingItem) {
      setEditingItem({ ...editingItem, image_url: res.url });
      success('Image uploaded.');
    } else if (res.error) {
      toastError(res.error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.image_url) {
      toastError('Please provide a title and image.');
      return;
    }

    await db.saveGalleryItem(editingItem);
    success('Gallery item saved.');
    setIsModalOpen(false);
    setEditingItem(null);
    await loadGallery();
  };

  const handleDelete = async (id: string) => {
    await db.deleteGalleryItem(id);
    success('Gallery item removed.');
    await loadGallery();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-temple-950">
              Sculpture Gallery Management
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-0.5">
              Upload and organize workshop photos, temple installations, and casting archives.
            </p>
          </div>

          <Button variant="gold" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
            ADD GALLERY PHOTO
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-sand-300 shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-temple-950/80 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {item.category}
                </span>
                {item.is_featured && (
                  <span className="absolute top-3 right-3 bg-gold-500 text-temple-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-temple-950">{item.title}</h3>
                  <p className="text-xs text-sand-700 mt-1 line-clamp-2">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-sand-200 flex items-center justify-between">
                  <span className="text-xs text-sand-600 font-semibold">{item.material || 'Sculpture'}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-sand-600 hover:text-gold-700 hover:bg-sand-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-sand-600 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingItem?.id ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
          maxWidth="md"
        >
          {editingItem && (
            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swamimalai Bronze Casting in Progress"
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={editingItem.category || 'workshop'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
                >
                  <option value="workshop">Workshop &amp; Crafting</option>
                  <option value="temple">Temple Sanctums</option>
                  <option value="murugan">Murugan</option>
                  <option value="vinayagar">Vinayagar</option>
                  <option value="amman">Amman</option>
                  <option value="shiva">Shiva / Nataraja</option>
                  <option value="perumal">Perumal</option>
                  <option value="bronze">Bronze</option>
                  <option value="panchaloha">Panchaloha</option>
                  <option value="stone">Black Stone</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1">
                  Image Upload *
                </label>
                <div className="p-4 border-2 border-dashed border-sand-300 rounded-xl bg-sand-50 text-center">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-6 h-6 text-gold-600 mb-1" />
                    <span className="text-xs font-semibold text-temple-900">
                      {isUploading ? 'Uploading...' : 'Choose Photo (JPG, PNG, WEBP)'}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {editingItem.image_url && (
                  <img
                    src={editingItem.image_url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-xl mt-2 border border-sand-300"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-sand-300 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="feat_gallery"
                  checked={editingItem.is_featured || false}
                  onChange={(e) => setEditingItem({ ...editingItem, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded text-gold-600"
                />
                <label htmlFor="feat_gallery" className="text-xs font-bold text-temple-900 cursor-pointer">
                  Feature in Homepage / Top of Gallery
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="gold" size="sm" type="submit">
                  Save Gallery Photo
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};
