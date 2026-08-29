import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  MessageSquare,
  ShoppingBag,
  Wand2,
  Landmark,
  Plus,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { db } from '@/lib/supabase';
import type { Product, Enquiry, Order, CustomOrder, TempleOrder } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/common/Button';

export const AdminDashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>([]);
  const [templeOrders, setTempleOrders] = useState<TempleOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      const [p, e, o, c, t] = await Promise.all([
        db.getProducts(),
        db.getEnquiries(),
        db.getOrders(),
        db.getCustomOrders(),
        db.getTempleOrders(),
      ]);
      setProducts(p);
      setEnquiries(e);
      setOrders(o);
      setCustomOrders(c);
      setTempleOrders(t);
      setIsLoading(false);
    }
    loadStats();
  }, []);

  const pendingEnquiries = enquiries.filter((e) => e.status === 'New').length;
  const pendingOrders = orders.filter((o) => o.status === 'Received').length;
  const pendingCustom = customOrders.filter((c) => c.status === 'Received').length;
  const pendingTemple = templeOrders.filter((t) => t.status === 'Received').length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-temple-950">
              Executive Overview
            </h1>
            <p className="text-xs sm:text-sm text-sand-700 mt-1">
              Real-time monitoring of customer enquiries, order requests, and sanctum commissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/products/new">
              <Button variant="gold" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                ADD NEW PRODUCT
              </Button>
            </Link>
          </div>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-sand-600">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Products</span>
              <Package className="w-4 h-4 text-gold-600" />
            </div>
            <div className="text-2xl font-bold font-serif text-temple-950">{products.length}</div>
            <span className="text-[11px] text-emerald-700 font-semibold">Active in Catalogue</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-sand-600">
              <span className="text-xs font-semibold uppercase tracking-wider">New Enquiries</span>
              <MessageSquare className="w-4 h-4 text-gold-600" />
            </div>
            <div className="text-2xl font-bold font-serif text-temple-950">{enquiries.length}</div>
            <span className="text-[11px] text-amber-700 font-semibold">{pendingEnquiries} awaiting response</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-sand-600">
              <span className="text-xs font-semibold uppercase tracking-wider">Order Requests</span>
              <ShoppingBag className="w-4 h-4 text-gold-600" />
            </div>
            <div className="text-2xl font-bold font-serif text-temple-950">{orders.length}</div>
            <span className="text-[11px] text-amber-700 font-semibold">{pendingOrders} pending confirmation</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-sand-600">
              <span className="text-xs font-semibold uppercase tracking-wider">Custom Requests</span>
              <Wand2 className="w-4 h-4 text-gold-600" />
            </div>
            <div className="text-2xl font-bold font-serif text-temple-950">{customOrders.length}</div>
            <span className="text-[11px] text-amber-700 font-semibold">{pendingCustom} received</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sand-300 shadow-sm space-y-2 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-sand-600">
              <span className="text-xs font-semibold uppercase tracking-wider">Temple Projects</span>
              <Landmark className="w-4 h-4 text-gold-600" />
            </div>
            <div className="text-2xl font-bold font-serif text-temple-950">{templeOrders.length}</div>
            <span className="text-[11px] text-amber-700 font-semibold">{pendingTemple} active proposals</span>
          </div>
        </div>

        {/* Recent Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <h3 className="font-serif font-bold text-lg text-temple-950">Recent Order Requests</h3>
              <Link to="/admin/orders" className="text-xs font-bold text-gold-800 hover:text-gold-900">
                View All ({orders.length}) →
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="divide-y divide-sand-200">
                {orders.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-gold-800 bg-gold-100 px-1.5 py-0.5 rounded">
                        {ord.request_id}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-temple-900 mt-0.5 truncate max-w-xs">
                        {ord.product_name}
                      </h4>
                      <p className="text-xs text-sand-600">
                        {ord.customer_name} • {ord.delivery_location}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-temple-950 block">
                        {formatPrice(ord.estimated_total, ord.price_on_request)}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sand-100 text-sand-800 border border-sand-300">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-sand-600 py-6 text-center">No order requests received yet.</p>
            )}
          </div>

          {/* Recent Enquiries */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <h3 className="font-serif font-bold text-lg text-temple-950">Recent Product Enquiries</h3>
              <Link to="/admin/enquiries" className="text-xs font-bold text-gold-800 hover:text-gold-900">
                View All ({enquiries.length}) →
              </Link>
            </div>

            {enquiries.length > 0 ? (
              <div className="divide-y divide-sand-200">
                {enquiries.slice(0, 5).map((enq) => (
                  <div key={enq.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-gold-800 bg-gold-100 px-1.5 py-0.5 rounded">
                        {enq.request_id}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-temple-900 mt-0.5">
                        {enq.customer_name}
                      </h4>
                      <p className="text-xs text-sand-600 line-clamp-1">{enq.message}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sand-100 text-sand-800 border border-sand-300">
                        {enq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-sand-600 py-6 text-center">No customer enquiries yet.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
