import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  ShoppingBag,
  Wand2,
  Landmark,
  Image as ImageIcon,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Route Guard: Unauthenticated users are redirected to /admin/login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { label: 'Order Requests', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Custom Orders', path: '/admin/custom-orders', icon: Wand2 },
    { label: 'Temple Orders', path: '/admin/temple-orders', icon: Landmark },
    { label: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { label: 'Homepage CMS', path: '/admin/homepage', icon: Home },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-sand-100/90 flex flex-col md:flex-row text-temple-900 font-sans">
      {/* Mobile Top Nav */}
      <div className="md:hidden bg-temple-950 text-sand-50 p-4 flex items-center justify-between border-b border-gold-500/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-gold-500 text-temple-950 flex items-center justify-center font-serif font-bold text-sm">
            V
          </div>
          <span className="font-serif font-bold text-base text-gold-300">Vetri Arts Admin</span>
        </div>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 text-sand-300 hover:text-white"
        >
          {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`${
          isMobileNavOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-temple-950 text-sand-100 flex flex-col justify-between shrink-0 border-r border-gold-500/20 min-h-screen z-30`}
      >
        {/* Brand Top */}
        <div className="p-6">
          <div className="flex items-center gap-3 pb-6 border-b border-temple-800">
            <div className="w-10 h-10 rounded-xl bg-gold-500 p-0.5 shrink-0">
              <div className="w-full h-full bg-temple-950 rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-bold text-lg text-gold-400">V</span>
              </div>
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-gold-300 leading-tight">
                Vetri Arts
              </h2>
              <span className="text-[10px] text-sand-400 uppercase tracking-widest font-mono">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gold-500 text-temple-950 shadow-gold-sm font-bold'
                      : 'text-sand-300 hover:bg-temple-900 hover:text-gold-300'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer & Logout */}
        <div className="p-6 border-t border-temple-800 space-y-3">
          <div className="text-xs text-sand-400 truncate">
            <span className="text-[10px] text-sand-500 uppercase block">Signed In As</span>
            <strong className="text-sand-200">{user?.email}</strong>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"
            >
              <span>View Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-8 lg:p-10 max-w-7xl w-full">
        {children}
      </main>
    </div>
  );
};
