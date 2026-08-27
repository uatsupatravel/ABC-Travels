import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'accent';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center px-3 py-1 font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-200 rounded';

  const variants = {
    default: 'bg-ink-black/80 backdrop-blur-sm text-alabaster-cream',
    secondary: 'bg-secondary/90 backdrop-blur-sm text-alabaster-cream',
    outline: 'border border-silk-border text-ink-black bg-transparent',
    accent: 'bg-bronze-hover text-ink-black',
  };

  return <div className={cn(baseStyles, variants[variant], className)} {...props} />;
}
