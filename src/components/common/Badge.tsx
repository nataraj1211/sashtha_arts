import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'temple' | 'terracotta' | 'success' | 'sand';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'gold',
  size = 'sm',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center font-medium uppercase tracking-wider rounded-md border';

  const variants = {
    gold: 'bg-gold-100 text-gold-900 border-gold-400/50 shadow-sm',
    temple: 'bg-temple-800 text-sand-100 border-gold-500/30',
    terracotta: 'bg-terracotta-100 text-terracotta-800 border-terracotta-300',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    sand: 'bg-sand-200 text-sand-800 border-sand-300',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
