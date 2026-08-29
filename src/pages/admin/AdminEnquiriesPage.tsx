import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Eye, Phone, MessageCircle, Mail, Search } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { Enquiry, EnquiryStatus } from '@/types';
import { createWhatsAppUrl } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { success } = useToast();

  const loadEnquiries = async () => {
    const data = await db.getEnquiries();
    setEnquiries(data);
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    await db.updateEnquiryStatus(id, newStatus);
    success(`Enquiry status updated to ${newStatus}.`);
    await loadEnquiries();
  };

  const filtered = enquiries.filter((e) => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        (e.request_id || e.id).toLowerCase().includes(q) ||
        e.customer_name.toLowerCase().includes(q) ||
        e.customer_phone.toLowerCase().includes(q) ||
        (e.product_name || '').toLowerCase().includes(q)
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
              Customer Enquiries
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-0.5">
              Track customer questions, quotations sent, and status pipeline history.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sand-500" />
            <input
              type="text"
              placeholder="Search Request ID, customer, phone..."
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
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Quote Sent">Quote Sent</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Crafting">In Crafting</option>
              <option value="Ready">Ready</option>
              <option value="Dispatched">Dispatched</option>
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
                  <th className="p-4">Product / Context</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200">
                {filtered.map((enq) => {
                  const whatsappUrl = createWhatsAppUrl(
                    enq.customer_whatsapp || enq.customer_phone,
                    `Namaste ${enq.customer_name}, regards from Sashtha Arts & Crafts concerning your enquiry (${enq.request_id}) for ${enq.product_name || 'statue consultation'}.`
                  );

                  return (
                    <tr key={enq.id} className="hover:bg-sand-50/60 transition-colors">
                      <td className="p-4">
                        <Link
                          to={`/admin/enquiries/${enq.id}`}
                          className="font-mono text-[11px] font-bold text-gold-800 bg-gold-100 hover:bg-gold-200 px-2 py-0.5 rounded"
                        >
                          {enq.request_id}
                        </Link>
                      </td>

                      <td className="p-4">
                        <strong className="text-temple-900 block">{enq.customer_name}</strong>
                        <span className="text-sand-600 block">{enq.customer_phone}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-medium text-temple-900 block max-w-xs truncate">
                          {enq.product_name || 'General Statue Consultation'}
                        </span>
                        <span className="text-sand-600 line-clamp-1 max-w-xs">{enq.message}</span>
                      </td>

                      <td className="p-4 text-sand-600">
                        {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : 'Recent'}
                      </td>

                      <td className="p-4">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg border border-sand-300 text-xs font-bold bg-white text-temple-900 focus:ring-2 focus:ring-gold-500"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quote Sent">Quote Sent</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Crafting">In Crafting</option>
                          <option value="Ready">Ready</option>
                          <option value="Dispatched">Dispatched</option>
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
                          title="Contact Customer on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <Link
                          to={`/admin/enquiries/${enq.id}`}
                          className="p-1.5 rounded-lg text-sand-600 hover:text-temple-900 hover:bg-sand-100 inline-flex"
                          title="View full enquiry details & notes"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
