import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-black/20 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      default: 'bg-ink-black text-alabaster-cream hover:bg-slate-taupe',
      secondary: 'bg-cream-container text-ink-black hover:bg-surface-container-low border border-silk-border',
      outline: 'border border-silk-border bg-transparent hover:border-ink-black text-ink-black',
      ghost: 'hover:bg-cream-container text-ink-black',
      accent: 'bg-bronze-hover text-alabaster-cream hover:bg-secondary',
    };

    const sizes = {
      default: 'h-10 px-6 py-2 rounded',
      sm: 'h-8 px-4 text-[10px] rounded',
      lg: 'h-12 px-8 rounded',
      icon: 'h-9 w-9 rounded',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
