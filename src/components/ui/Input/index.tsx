import { cn } from '@/lib/utils';
import * as React from 'react';
import { type FieldError } from 'react-hook-form';

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
      data-slot='input'
      className={cn(
        'text-md text-text-primary border-border-primary w-full min-w-0 rounded-[12px] border bg-transparent px-4 py-[12px] transition-colors outline-none md:px-4 md:py-[13px] md:text-base',
        'placeholder:text-text-default',
        'hover:border-primary focus-visible:border-primary-pressed',
        'disabled:bg-bg-secondary disabled:text-disabled disabled:pointer-events-none disabled:cursor-not-allowed',
        'aria-invalid:ring-danger/20 aria-invalid:border-danger',
        'dark:bg-input/30 dark:aria-invalid:ring-danger/40',
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        { 'border-danger': error },
        className,
      )}
      {...props}
    />
  );
}
