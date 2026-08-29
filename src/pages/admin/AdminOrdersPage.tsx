import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, MessageCircle, Phone, Search } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { Order, OrderStatus } from '@/types';
import { formatPrice, createWhatsAppUrl } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { success } = useToast();

  const loadOrders = async () => {
    const data = await db.getOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    await db.updateOrderStatus(id, newStatus);
    success(`Order status updated to ${newStatus}.`);
    await loadOrders();
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.request_id.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_phone.toLowerCase().includes(q) ||
        o.product_name.toLowerCase().includes(q) ||
        o.delivery_location.toLowerCase().includes(q)
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
              Direct Order Requests
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-0.5">
              Manage product order requests submitted by customers without login.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sand-500" />
            <input
              type="text"
              placeholder="Search Request ID, customer, location..."
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
              <option value="Confirmed">Confirmed</option>
              <option value="In Crafting">In Crafting</option>
              <option value="Quality Check">Quality Check</option>
              <option value="Ready">Ready</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
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
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product &amp; Qty</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Estimated Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {filtered.map((ord) => {
                  const whatsappUrl = createWhatsAppUrl(
                    ord.customer_whatsapp || ord.customer_phone,
                    `Namaste ${ord.customer_name}, regards from Vetri Arts & Crafts concerning your Order Request (${ord.request_id}) for "${ord.product_name}".`
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
                        <strong className="text-temple-900 block truncate max-w-xs">{ord.product_name}</strong>
                        <span className="text-sand-600 text-[11px]">Qty: {ord.quantity}</span>
                      </td>

                      <td className="p-4 text-temple-900">{ord.delivery_location}</td>

                      <td className="p-4 font-serif font-bold text-temple-950">
                        {formatPrice(ord.estimated_total, ord.price_on_request)}
                      </td>

                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg border border-sand-300 text-xs font-bold bg-white text-temple-900 focus:ring-2 focus:ring-gold-500"
                        >
                          <option value="Received">Received</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Crafting">In Crafting</option>
                          <option value="Quality Check">Quality Check</option>
                          <option value="Ready">Ready</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
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
                          title="View Order Details"
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

        {/* Order Details Modal */}
        <Modal
          isOpen={selectedOrder !== null}
          onClose={() => setSelectedOrder(null)}
          title={`Order Request: ${selectedOrder?.request_id}`}
          subtitle={`Submitted on ${selectedOrder?.created_at ? new Date(selectedOrder.created_at).toLocaleString() : ''}`}
          maxWidth="lg"
        >
          {selectedOrder && (
            <div className="space-y-4 text-xs sm:text-sm text-temple-900">
              <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 space-y-2">
                <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
                <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                {selectedOrder.customer_whatsapp && <p><strong>WhatsApp:</strong> {selectedOrder.customer_whatsapp}</p>}
                {selectedOrder.customer_email && <p><strong>Email:</strong> {selectedOrder.customer_email}</p>}
                <p><strong>Delivery Location:</strong> {selectedOrder.delivery_location}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-sand-300 space-y-2">
                <p><strong>Product:</strong> {selectedOrder.product_name} (Qty: {selectedOrder.quantity})</p>
                <p><strong>Preferred Size:</strong> {selectedOrder.preferred_size || 'Standard'}</p>
                <p><strong>Material &amp; Finish:</strong> {selectedOrder.preferred_material} — {selectedOrder.preferred_finish}</p>
                {selectedOrder.special_requirements && (
                  <p><strong>Special Requirements:</strong> {selectedOrder.special_requirements}</p>
                )}
                {selectedOrder.reference_image_url && (
                  <div className="pt-2">
                    <span className="font-bold block mb-1">Attached Reference Image:</span>
                    <img
                      src={selectedOrder.reference_image_url}
                      alt="Reference"
                      className="w-32 h-32 object-cover rounded-xl border border-sand-300"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-sm">Estimated Total:</span>
                <span className="font-serif font-bold text-lg text-temple-950">
                  {formatPrice(selectedOrder.estimated_total, selectedOrder.price_on_request)}
                </span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};
