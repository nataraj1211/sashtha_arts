import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@sashthaarts.com');
  const [password, setPassword] = useState('sashthaarts123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { success } = useToast();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      success('Welcome back, Sthapathi Admin.');
      navigate(from, { replace: true });
    } else {
      setErrorMsg(result.error || 'Invalid credentials. Please verify.');
    }
  };

  return (
    <div className="min-h-screen bg-temple-950 flex flex-col justify-center items-center p-4 text-sand-50 relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-gold-500/30 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-sand-400 hover:text-gold-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Storefront</span>
        </Link>

        {/* Card */}
        <div className="bg-temple-900/90 rounded-3xl p-8 sm:p-10 border border-gold-500/30 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gold-500 p-0.5 mx-auto mb-2 shadow-gold-sm">
              <div className="w-full h-full bg-temple-950 rounded-[14px] flex items-center justify-center font-serif font-bold text-xl text-gold-400">
                S
              </div>
            </div>
            <h1 className="font-serif font-bold text-2xl text-sand-50">Sashtha Arts &amp; Crafts</h1>
            <p className="text-xs text-sand-400 uppercase tracking-widest font-mono">
              Protected Admin Portal
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-terracotta-900/80 border border-terracotta-500/40 text-sand-100 text-xs leading-relaxed">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-sand-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-sand-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-temple-950/80 border border-sand-700 text-sand-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="admin@sashthaarts.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-sand-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-sand-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-temple-950/80 border border-sand-700 text-sand-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="gold"
                size="lg"
                type="submit"
                isLoading={isSubmitting}
                className="w-full font-bold shadow-gold-sm"
              >
                SECURE ADMIN LOGIN
              </Button>
            </div>
          </form>

          <div className="pt-2 border-t border-temple-800 flex items-center justify-center gap-1 text-[11px] text-sand-400">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Supabase Auth &amp; Server-Side Role Guard Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
