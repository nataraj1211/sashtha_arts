import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Mail, Clock, Save, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { Enquiry, EnquiryStatus, OrderStatusHistory } from '@/types';
import { createWhatsAppUrl } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';

export const AdminEnquiryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [statusHistory, setStatusHistory] = useState<OrderStatusHistory[]>([]);
  const [status, setStatus] = useState<EnquiryStatus>('New');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadData = async () => {
    if (!id) return;
    const all = await db.getEnquiries();
    const found = all.find((e) => e.id === id);
    if (found) {
      setEnquiry(found);
      setStatus(found.status);
      setNotes(found.notes || '');
      const hist = await db.getStatusHistory(id);
      setStatusHistory(hist);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (!enquiry) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-sm font-serif">Enquiry record not found.</div>
      </AdminLayout>
    );
  }

  const handleSaveStatus = async () => {
    setIsSaving(true);
    try {
      await db.updateEnquiryStatus(enquiry.id, status, notes);
      success(`Updated enquiry status to ${status}.`);
      await loadData();
    } catch (err: any) {
      toastError('Failed to update status.');
    } finally {
      setIsSaving(false);
    }
  };

  const whatsappUrl = createWhatsAppUrl(
    enquiry.customer_whatsapp || enquiry.customer_phone,
    `Namaste ${enquiry.customer_name}, regards from Sashtha Arts & Crafts concerning your enquiry (${enquiry.request_id}) for "${enquiry.product_name}".`
  );

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-sand-300">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/enquiries"
              className="p-2 rounded-xl bg-white border border-sand-300 hover:bg-sand-100 text-sand-700"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gold-800 bg-gold-100 px-2 py-0.5 rounded">
                  {enquiry.request_id}
                </span>
                <span className="text-xs text-sand-600">
                  {enquiry.created_at ? new Date(enquiry.created_at).toLocaleString() : ''}
                </span>
              </div>
              <h1 className="font-serif font-bold text-2xl text-temple-950 mt-1">
                Enquiry from {enquiry.customer_name}
              </h1>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Customer & Enquiry Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Info Card */}
          <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-temple-950 pb-2 border-b border-sand-200">
              Customer Details
            </h3>
            <div className="space-y-3 text-xs text-temple-900">
              <div>
                <span className="text-sand-600 block font-semibold">Name</span>
                <strong className="text-sm">{enquiry.customer_name}</strong>
              </div>
              <div>
                <span className="text-sand-600 block font-semibold">Phone</span>
                <span className="font-bold">{enquiry.customer_phone}</span>
              </div>
              {enquiry.customer_whatsapp && (
                <div>
                  <span className="text-sand-600 block font-semibold">WhatsApp</span>
                  <span>{enquiry.customer_whatsapp}</span>
                </div>
              )}
              {enquiry.customer_email && (
                <div>
                  <span className="text-sand-600 block font-semibold">Email</span>
                  <span>{enquiry.customer_email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Enquiry Message Card */}
          <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-sand-300 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-temple-950 pb-2 border-b border-sand-200">
              Requested Product &amp; Message
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-sand-600 block font-semibold">Product Inquired</span>
                <strong className="text-sm text-temple-950 font-serif">
                  {enquiry.product_name || 'General Consultation'}
                </strong>
              </div>
              <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-xs sm:text-sm text-temple-900 leading-relaxed whitespace-pre-wrap">
                {enquiry.message}
              </div>
            </div>
          </div>
        </div>

        {/* Status Pipeline & Notes Editor */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-temple-950 pb-2 border-b border-sand-200">
            Status Management &amp; Sthapathi Notes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div>
              <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
                Update Status Pipeline
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-sm font-bold bg-sand-50 focus:ring-2 focus:ring-gold-500"
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
            </div>

            <Button
              variant="gold"
              size="md"
              isLoading={isSaving}
              onClick={handleSaveStatus}
              leftIcon={<Save className="w-4 h-4" />}
            >
              SAVE STATUS &amp; NOTES
            </Button>
          </div>

          <div>
            <label className="block text-xs font-bold text-temple-900 uppercase tracking-wider mb-1.5">
              Internal Admin Notes / Quotation Terms
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Quoted ₹72,000 for 28-inch version with custom peedam. Promised delivery by next month."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-sand-300 text-sm"
            />
          </div>
        </div>

        {/* Audit Status History Timeline */}
        {statusHistory.length > 0 && (
          <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-temple-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-600" />
              <span>Status History Audit Timeline</span>
            </h3>
            <div className="space-y-3">
              {statusHistory.map((hist) => (
                <div key={hist.id} className="text-xs flex items-start gap-3 p-3 rounded-xl bg-sand-50 border border-sand-200">
                  <span className="font-mono text-sand-500 shrink-0 mt-0.5">
                    {new Date(hist.created_at || '').toLocaleTimeString()}
                  </span>
                  <div>
                    <span className="font-bold text-temple-900">
                      Status changed from {hist.previous_status || 'Initial'} to <strong>{hist.new_status}</strong>
                    </span>
                    {hist.notes && <p className="text-sand-700 mt-0.5">{hist.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
