import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Search, Sparkles, Check, AlertCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { Product } from '@/types';
import { formatPrice, formatDimensions } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

import { getDeityImage } from '@/lib/statueAssets';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deityFilter, setDeityFilter] = useState('all');
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { success, error: toastError } = useToast();

  const loadProducts = async () => {
    const data = await db.getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (deityFilter !== 'all' && p.deity !== deityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.product_code.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = async () => {
    if (!deleteCandidate) return;
    setIsDeleting(true);
    try {
      await db.deleteProduct(deleteCandidate.id);
      success(`Product "${deleteCandidate.name}" removed from catalogue.`);
      setDeleteCandidate(null);
      await loadProducts();
    } catch (err: any) {
      toastError(err?.message || 'Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-temple-950">
              Product Catalogue Management
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-0.5">
              Manage handcrafted statues, 4-side image angles, pricing, and stock status.
            </p>
          </div>

          <Link to="/admin/products/new">
            <Button variant="gold" size="md" leftIcon={<Plus className="w-4 h-4" />}>
              ADD NEW STATUE
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sand-500" />
            <input
              type="text"
              placeholder="Search code, name, material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-sand-300 text-xs focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={deityFilter}
              onChange={(e) => setDeityFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-sand-300 text-xs bg-sand-50 font-medium"
            >
              <option value="all">All Deities</option>
              <option value="murugan">Murugan</option>
              <option value="vinayagar">Vinayagar</option>
              <option value="amman">Amman</option>
              <option value="shiva">Shiva</option>
              <option value="perumal">Perumal</option>
              <option value="krishna">Krishna</option>
              <option value="ayyappan">Ayyappan</option>
              <option value="anjaneyar">Anjaneyar</option>
            </select>

            <span className="text-xs text-sand-600 font-semibold">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-sand-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-sand-100/80 border-b border-sand-300 text-sand-800 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Statue</th>
                  <th className="p-4">Deity &amp; Code</th>
                  <th className="p-4">Material &amp; Size</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {filteredProducts.map((p) => {
                  const imgUrl = p.primary_image || p.images?.[0]?.image_url || getDeityImage(p.deity);
                  return (
                    <tr key={p.id} className="hover:bg-sand-50/60 transition-colors">
                      {/* Image & Title */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={imgUrl}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded-lg border border-gold-500/20 shrink-0"
                          />
                          <div>
                            <Link
                              to={`/admin/products/${p.id}/edit`}
                              className="font-serif font-bold text-sm text-temple-900 hover:text-gold-700 line-clamp-1"
                            >
                              {p.name}
                            </Link>
                            <span className="text-[11px] text-sand-600 block">{p.finish}</span>
                          </div>
                        </div>
                      </td>

                      {/* Deity & Code */}
                      <td className="p-4">
                        <span className="font-mono text-[11px] font-bold text-gold-800 bg-gold-100 px-2 py-0.5 rounded block w-max mb-1">
                          {p.product_code}
                        </span>
                        <span className="text-xs text-temple-700 capitalize font-medium">{p.deity}</span>
                      </td>

                      {/* Material & Size */}
                      <td className="p-4">
                        <span className="font-medium text-temple-900 block truncate max-w-xs">{p.material}</span>
                        <span className="text-[11px] text-sand-600">{formatDimensions(p.height, p.width, p.depth)}</span>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-serif font-bold text-temple-950">
                        {formatPrice(p.price, p.price_on_request)}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-sand-100 text-sand-800 border border-sand-300 uppercase">
                          {p.availability.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="p-4 text-center">
                        {p.featured ? (
                          <span className="inline-flex p-1 bg-gold-100 text-gold-800 rounded-full">
                            <Sparkles className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="text-sand-400">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <Link
                          to={`/product/${p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-sand-600 hover:text-temple-900 hover:bg-sand-100 inline-flex"
                          title="View on public site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          className="p-1.5 rounded-lg text-sand-600 hover:text-gold-700 hover:bg-sand-100 inline-flex"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteCandidate(p)}
                          className="p-1.5 rounded-lg text-sand-600 hover:text-rose-600 hover:bg-rose-50 inline-flex"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Accidental Delete Prevention Confirmation Modal */}
        <Modal
          isOpen={deleteCandidate !== null}
          onClose={() => setDeleteCandidate(null)}
          title="Delete Product Confirmation"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs sm:text-sm text-sand-800">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-terracotta-50 border border-terracotta-300 text-terracotta-900">
              <AlertCircle className="w-5 h-5 text-terracotta-600 shrink-0" />
              <span>
                Are you sure you want to permanently delete <strong>{deleteCandidate?.name}</strong>? This action cannot be undone.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteCandidate(null)}
              >
                Cancel
              </Button>
              <Button
                variant="terracotta"
                size="sm"
                isLoading={isDeleting}
                onClick={handleDelete}
              >
                Delete Product
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};
