import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: 'minimal' | 'bordered';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputStyle = 'bordered', ...props }, ref) => {
    const styles = {
      minimal:
        'flex w-full minimal-input py-2 font-body-base text-body-base text-ink-black placeholder:text-slate-taupe disabled:cursor-not-allowed disabled:opacity-50',
      bordered:
        'flex h-10 w-full rounded border border-silk-border bg-surface-container-lowest px-3 py-2 font-body-base text-sm text-ink-black placeholder:text-slate-taupe focus-visible:outline-none focus-visible:border-ink-black focus-visible:ring-1 focus-visible:ring-ink-black/10 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300',
    };

    return (
      <input
        type={type}
        className={cn(styles[inputStyle], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded border border-silk-border bg-surface-container-lowest px-3 py-2 font-body-base text-sm text-ink-black placeholder:text-slate-taupe focus-visible:outline-none focus-visible:border-ink-black focus-visible:ring-1 focus-visible:ring-ink-black/10 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('h-px w-full bg-silk-border', className)} {...props} />;
}
