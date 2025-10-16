import { cn } from '@/lib/utils';
import { type FieldError } from '@/types/types';
import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  error?: FieldError | null;
}

export default function Input({
  className,
  type,
  error = null,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'text-md text-text-primary w-full min-w-0 rounded-[12px] border border-[#e2e8f0] bg-transparent px-4 py-[12px] transition-colors outline-none md:px-4 md:py-[13px] md:text-base',
        'placeholder:text-text-default selection:text-text-primary',
        'hover:border-primary focus-visible:border-primary-pressed',
        'disabled:bg-bg-secondary disabled:text-disabled disabled:pointer-events-none disabled:cursor-not-allowed',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        'dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        { 'border-destructive': error },
        className,
      )}
      {...props}
    />
  );
}
