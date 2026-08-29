import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ImageUploadSlots } from '@/components/admin/ImageUploadSlots';
import { db } from '@/lib/supabase';
import type { Product, ProductImage, DeityType } from '@/types';
import { slugify } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [slug, setSlug] = useState('');
  const [deity, setDeity] = useState<DeityType>('murugan');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('Panchaloha (5-Metal Sacred Alloy)');
  const [height, setHeight] = useState<number>(24);
  const [width, setWidth] = useState<number | undefined>(12);
  const [depth, setDepth] = useState<number | undefined>(8);
  const [weight, setWeight] = useState<number | undefined>(14);
  const [finish, setFinish] = useState('Traditional Antique Patina');
  const [price, setPrice] = useState<number>(65000);
  const [priceOnRequest, setPriceOnRequest] = useState(false);
  const [availability, setAvailability] = useState<'in_stock' | 'made_to_order' | 'out_of_stock'>('in_stock');
  const [madeToOrder, setMadeToOrder] = useState(false);
  const [customizable, setCustomizable] = useState(true);
  const [featured, setFeatured] = useState(true);

  // Images with 4-side views
  const [images, setImages] = useState<ProductImage[]>([]);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      setIsLoading(true);
      const all = await db.getProducts();
      const found = all.find((p) => p.id === id);
      if (found) {
        setName(found.name);
        setProductCode(found.product_code);
        setSlug(found.slug);
        setDeity(found.deity);
        setDescription(found.description);
        setMaterial(found.material);
        setHeight(found.height);
        setWidth(found.width);
        setDepth(found.depth);
        setWeight(found.weight);
        setFinish(found.finish || 'Traditional Antique Patina');
        setPrice(found.price);
        setPriceOnRequest(found.price_on_request);
        setAvailability(found.availability);
        setMadeToOrder(found.made_to_order);
        setCustomizable(found.customizable);
        setFeatured(found.featured);
        setImages(found.images || []);
      }
      setIsLoading(false);
    }
    loadProduct();
  }, [id]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !productCode.trim()) {
      toastError('Please fill in Product Name and Product Code.');
      return;
    }

    setIsSaving(true);
    try {
      const payload: Partial<Product> = {
        id: id || undefined,
        name,
        product_code: productCode,
        slug: slug || slugify(name),
        deity,
        description,
        material,
        height: Number(height) || 18,
        width: width ? Number(width) : undefined,
        depth: depth ? Number(depth) : undefined,
        weight: weight ? Number(weight) : undefined,
        finish,
        price: Number(price) || 0,
        price_on_request: priceOnRequest,
        availability,
        made_to_order: madeToOrder,
        customizable,
        featured,
        images,
        primary_image: images.find((i) => i.is_primary)?.image_url || images[0]?.image_url || '',
      };

      await db.saveProduct(payload);
      success(isEditing ? 'Statue updated successfully.' : 'New statue added to catalogue.');
      navigate('/admin/products');
    } catch (err: any) {
      toastError(err?.message || 'Failed to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-sm font-serif">Loading product details...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-300">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="p-2 rounded-xl bg-white border border-sand-300 hover:bg-sand-100 text-sand-700"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif font-bold text-2xl text-temple-950">
                {isEditing ? `Edit: ${name}` : 'Add New Handcrafted Statue'}
              </h1>
              <p className="text-xs text-sand-600">
                Provide Shilpa Shastra specifications and upload 4-side viewing angles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
            <Button
              variant="gold"
              size="md"
              type="submit"
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              {isEditing ? 'UPDATE PRODUCT' : 'SAVE PRODUCT'}
            </Button>
          </div>
        </div>

        {/* 1. Critical 4-Side Image Upload Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-4">
          <ImageUploadSlots images={images} onChange={setImages} />
        </div>

        {/* 2. Basic Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-temple-950 pb-2 border-b border-sand-200">
            Basic Statue Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lord Murugan (Swaminatha Swami) Handcrafted Panchaloha Statue"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Product Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. VAC-MRG-001"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-mono focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-mono text-sand-700 bg-sand-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Sacred Deity *
              </label>
              <select
                value={deity}
                onChange={(e) => setDeity(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-medium"
              >
                <option value="murugan">Lord Murugan</option>
                <option value="vinayagar">Maha Vinayagar</option>
                <option value="amman">Sri Mariamman / Devi</option>
                <option value="shiva">Lord Shiva / Nataraja</option>
                <option value="perumal">Lord Venkateswara Perumal</option>
                <option value="krishna">Lord Krishna</option>
                <option value="ayyappan">Swami Ayyappan</option>
                <option value="anjaneyar">Veera Anjaneyar</option>
                <option value="lakshmi">Goddess Lakshmi</option>
                <option value="other">Other Deity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Sacred Material *
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-medium"
              >
                <option value="Panchaloha (5-Metal Sacred Alloy)">Panchaloha (5-Metal Sacred Alloy)</option>
                <option value="Chola Lost-Wax Cast Bronze">Chola Lost-Wax Cast Bronze</option>
                <option value="Traditional Solid Bronze">Traditional Solid Bronze</option>
                <option value="Solid Pure Brass">Solid Pure Brass</option>
                <option value="Heavy Pure Brass">Heavy Pure Brass</option>
                <option value="Monolithic Black Granite Stone">Monolithic Black Granite Stone</option>
                <option value="Hand-Carved Teak Wood">Hand-Carved Teak Wood</option>
                <option value="Country Teak & Rosewood">Country Teak &amp; Rosewood</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Sacred Description &amp; Iconography
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the mudra, weapon attributes, vahana, and casting method..."
                className="w-full p-4 rounded-xl border border-sand-300 text-sm focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>
        </div>

        {/* 3. Dimensions, Weight & Finish */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-temple-950 pb-2 border-b border-sand-200">
            Dimensions &amp; Specifications
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Height (Inches) *
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Width (Inches)
              </label>
              <input
                type="number"
                step="0.5"
                value={width || ''}
                onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Depth (Inches)
              </label>
              <input
                type="number"
                step="0.5"
                value={depth || ''}
                onChange={(e) => setDepth(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Weight (KG)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight || ''}
                onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Finish / Polish Tone
              </label>
              <input
                type="text"
                placeholder="e.g. Traditional Antique Patina & Temple Gold Polish"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-medium"
              >
                <option value="in_stock">In Stock (Ready to Consecrate)</option>
                <option value="made_to_order">Made to Order (Casting upon Request)</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Pricing & Flags */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-temple-950 pb-2 border-b border-sand-200">
            Pricing &amp; Catalog Flags
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Price in INR (₹)
              </label>
              <input
                type="number"
                disabled={priceOnRequest}
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-bold disabled:bg-sand-100"
              />
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-0">
              <input
                type="checkbox"
                id="price_on_req"
                checked={priceOnRequest}
                onChange={(e) => setPriceOnRequest(e.target.checked)}
                className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500"
              />
              <label htmlFor="price_on_req" className="text-xs font-bold text-temple-900 cursor-pointer">
                Display "PRICE ON REQUEST" (for grand or bespoke idols)
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-sand-200">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-sand-50 border border-sand-300 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500"
              />
              <span className="text-xs font-bold text-temple-900">Featured on Homepage</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-sand-50 border border-sand-300 cursor-pointer">
              <input
                type="checkbox"
                checked={customizable}
                onChange={(e) => setCustomizable(e.target.checked)}
                className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500"
              />
              <span className="text-xs font-bold text-temple-900">Customizable Size</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-sand-50 border border-sand-300 cursor-pointer">
              <input
                type="checkbox"
                checked={madeToOrder}
                onChange={(e) => setMadeToOrder(e.target.checked)}
                className="w-4 h-4 rounded text-gold-600 focus:ring-gold-500"
              />
              <span className="text-xs font-bold text-temple-900">Made to Order Badge</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Button
            variant="gold"
            size="lg"
            type="submit"
            isLoading={isSaving}
            className="font-bold shadow-gold-md"
          >
            {isEditing ? 'UPDATE PRODUCT' : 'SAVE PRODUCT'}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};
