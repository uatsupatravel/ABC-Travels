import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
      ghost: 'hover:bg-muted text-foreground',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
    };

    const sizes = {
      default: 'h-10 px-5 py-2 text-sm rounded-md',
      sm: 'h-8 px-3 text-xs rounded-md',
      lg: 'h-12 px-8 text-base rounded-md',
      icon: 'h-9 w-9 rounded-md',
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
