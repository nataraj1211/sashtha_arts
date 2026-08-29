import React, { useState, useEffect } from 'react';
import { Wand2, Eye, MessageCircle, Phone, Search, X } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { CustomOrder, OrderStatus } from '@/types';
import { createWhatsAppUrl } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { Modal } from '@/components/common/Modal';

export const AdminCustomOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<CustomOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const { success } = useToast();

  const loadData = async () => {
    const data = await db.getCustomOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    await db.updateCustomOrderStatus(id, newStatus);
    success(`Custom order status updated to ${newStatus}.`);
    await loadData();
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.request_id.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_phone.toLowerCase().includes(q) ||
        o.deity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-temple-950">
              Custom Statue Commission Requests
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-0.5">
              Review bespoke deity dimensions, customer reference photos, and casting requirements.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sand-500" />
            <input
              type="text"
              placeholder="Search Request ID, customer, deity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-sand-300 text-xs focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-sand-300 text-xs bg-sand-50 font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="Received">Received</option>
              <option value="Contacted">Contacted</option>
              <option value="Quote Sent">Quote Sent</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Crafting">In Crafting</option>
              <option value="Ready">Ready</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <span className="text-xs text-sand-600 font-semibold">{filtered.length} total</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-sand-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-sand-100/80 border-b border-sand-300 text-sand-800 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Request ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Deity &amp; Material</th>
                  <th className="p-4">Dimensions</th>
                  <th className="p-4">Photos</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {filtered.map((ord) => {
                  const whatsappUrl = createWhatsAppUrl(
                    ord.customer_whatsapp || ord.customer_phone,
                    `Namaste ${ord.customer_name}, regards from Vetri Arts & Crafts concerning your Custom Statue Commission (${ord.request_id}) for a ${ord.deity} murti.`
                  );

                  return (
                    <tr key={ord.id} className="hover:bg-sand-50/60 transition-colors">
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="font-mono text-[11px] font-bold text-gold-800 bg-gold-100 hover:bg-gold-200 px-2 py-0.5 rounded"
                        >
                          {ord.request_id}
                        </button>
                      </td>

                      <td className="p-4">
                        <strong className="text-temple-900 block">{ord.customer_name}</strong>
                        <span className="text-sand-600">{ord.customer_phone}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold capitalize text-temple-900 block">{ord.deity}</span>
                        <span className="text-sand-600 truncate block max-w-xs">{ord.material}</span>
                      </td>

                      <td className="p-4 font-medium text-temple-900">{ord.height || 'Custom'}</td>

                      <td className="p-4">
                        {ord.reference_images && ord.reference_images.length > 0 ? (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {ord.reference_images.length} photo(s)
                          </span>
                        ) : (
                          <span className="text-sand-400">None</span>
                        )}
                      </td>

                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg border border-sand-300 text-xs font-bold bg-white text-temple-900 focus:ring-2 focus:ring-gold-500"
                        >
                          <option value="Received">Received</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quote Sent">Quote Sent</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Crafting">In Crafting</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 inline-flex"
                          title="WhatsApp Customer"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 rounded-lg text-sand-600 hover:text-temple-900 hover:bg-sand-100 inline-flex"
                          title="View Full Custom Specs"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={selectedOrder !== null}
          onClose={() => setSelectedOrder(null)}
          title={`Custom Statue Request: ${selectedOrder?.request_id}`}
          maxWidth="lg"
        >
          {selectedOrder && (
            <div className="space-y-4 text-xs sm:text-sm text-temple-900">
              <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 space-y-2">
                <p><strong>Customer:</strong> {selectedOrder.customer_name} ({selectedOrder.customer_phone})</p>
                {selectedOrder.customer_email && <p><strong>Email:</strong> {selectedOrder.customer_email}</p>}
                <p><strong>Location:</strong> {selectedOrder.delivery_location || 'Not specified'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-sand-300 space-y-2">
                <p><strong>Deity:</strong> <span className="capitalize font-bold">{selectedOrder.deity}</span></p>
                <p><strong>Material:</strong> {selectedOrder.material}</p>
                <p><strong>Dimensions:</strong> Height: {selectedOrder.height || 'Custom'} {selectedOrder.width ? `• Width: ${selectedOrder.width}` : ''} {selectedOrder.depth ? `• Depth: ${selectedOrder.depth}` : ''}</p>
                <p><strong>Pose &amp; Mudra:</strong> {selectedOrder.pose}</p>
                {selectedOrder.requirements && (
                  <p><strong>Requirements / Notes:</strong> {selectedOrder.requirements}</p>
                )}
              </div>

              {selectedOrder.reference_images && selectedOrder.reference_images.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-xs uppercase tracking-wider block">Customer Reference Photos (Click to Zoom):</span>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedOrder.reference_images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Reference"
                        onClick={() => setFullscreenImage(img)}
                        className="w-full h-24 object-cover rounded-xl border border-sand-300 cursor-pointer hover:scale-105 transition-transform"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>

        {/* Fullscreen Single Image Viewer */}
        {fullscreenImage && (
          <div
            className="fixed inset-0 z-50 bg-temple-950/95 flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <img src={fullscreenImage} alt="" className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl" />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
