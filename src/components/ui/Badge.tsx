import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'accent';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200';

  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-muted text-muted-foreground',
    outline: 'border border-border text-foreground',
    accent: 'bg-accent/15 text-accent border border-accent/30',
  };

  return <div className={cn(baseStyles, variants[variant], className)} {...props} />;
}
