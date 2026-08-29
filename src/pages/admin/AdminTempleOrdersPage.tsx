import React, { useState, useEffect } from 'react';
import { Landmark, Eye, MessageCircle, Phone, Search } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { TempleOrder, OrderStatus } from '@/types';
import { createWhatsAppUrl } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { Modal } from '@/components/common/Modal';

export const AdminTempleOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<TempleOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<TempleOrder | null>(null);
  const { success } = useToast();

  const loadData = async () => {
    const data = await db.getTempleOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    await db.updateTempleOrderStatus(id, newStatus);
    success(`Temple order status updated to ${newStatus}.`);
    await loadData();
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.request_id.toLowerCase().includes(q) ||
        o.organization_name.toLowerCase().includes(q) ||
        o.contact_person.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q) ||
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
              Temple &amp; Bulk Order Projects
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-0.5">
              Manage temple trusts, sanctorum projects, pillars, doors, and large sculptures.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sand-500" />
            <input
              type="text"
              placeholder="Search Temple, Trust, Location..."
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
                  <th className="p-4">Temple / Organization</th>
                  <th className="p-4">Project Type</th>
                  <th className="p-4">Deity &amp; Size</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {filtered.map((ord) => {
                  const whatsappUrl = createWhatsAppUrl(
                    ord.phone,
                    `Namaste ${ord.contact_person}, regards from Sashtha Arts & Crafts concerning the Temple Project (${ord.request_id}) for ${ord.organization_name}.`
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
                        <strong className="text-temple-900 block">{ord.organization_name}</strong>
                        <span className="text-sand-600">{ord.contact_person} ({ord.phone})</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-temple-900 uppercase text-[10px] bg-sand-100 px-2 py-0.5 rounded">
                          {(ord.project_type || 'Temple Commission').replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="font-medium text-temple-900 block">{ord.deity}</span>
                        <span className="text-sand-600 text-[11px]">{ord.required_height || 'Custom'}</span>
                      </td>

                      <td className="p-4 text-temple-900">{ord.location}</td>

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
                          title="WhatsApp Trustee"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 rounded-lg text-sand-600 hover:text-temple-900 hover:bg-sand-100 inline-flex"
                          title="View Full Proposal Details"
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
          title={`Temple Project: ${selectedOrder?.request_id}`}
          maxWidth="lg"
        >
          {selectedOrder && (
            <div className="space-y-4 text-xs sm:text-sm text-temple-900">
              <div className="p-4 rounded-2xl bg-sand-100 border border-sand-300 space-y-2">
                <p><strong>Organization:</strong> {selectedOrder.organization_name}</p>
                <p><strong>Location:</strong> {selectedOrder.location}</p>
                <p><strong>Contact Person:</strong> {selectedOrder.contact_person} ({selectedOrder.phone})</p>
                {selectedOrder.email && <p><strong>Email:</strong> {selectedOrder.email}</p>}
                <p><strong>Expected Timeline:</strong> {selectedOrder.expected_timeline || 'Standard'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-sand-300 space-y-2">
                <p><strong>Project Category:</strong> {(selectedOrder.project_type || 'Temple Commission').replace('_', ' ').toUpperCase()}</p>
                <p><strong>Deity:</strong> {selectedOrder.deity}</p>
                <p><strong>Required Height / Specs:</strong> {selectedOrder.required_height}</p>
                <p><strong>Preferred Material:</strong> {selectedOrder.material}</p>
                <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                {selectedOrder.requirements && (
                  <p><strong>Sanctorum Notes / Requirements:</strong> {selectedOrder.requirements}</p>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};
