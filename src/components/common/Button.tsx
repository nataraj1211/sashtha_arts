import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'temple' | 'outline' | 'ghost' | 'terracotta';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', isLoading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl';

    const variants = {
      gold: 'bg-gold-gradient text-temple-950 font-semibold shadow-gold-sm hover:shadow-gold-md hover:brightness-105 focus:ring-gold-500',
      temple: 'bg-temple-800 text-sand-50 border border-gold-500/30 hover:bg-temple-900 hover:border-gold-500/60 shadow-temple-sm focus:ring-temple-700',
      outline: 'border-2 border-gold-500/60 text-temple-900 bg-transparent hover:bg-gold-500/10 focus:ring-gold-500',
      ghost: 'text-temple-800 hover:bg-sand-200/60 focus:ring-gold-400',
      terracotta: 'bg-terracotta-600 text-sand-50 hover:bg-terracotta-700 focus:ring-terracotta-500 shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-2 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-7 py-3.5 gap-2.5 tracking-wide',
      icon: 'p-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
