import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  `inline-flex items-center justify-center w-full gap-2 whitespace-nowrap text-sm font-medium transition-all outline-none

  disabled:pointer-events-none disabled:bg-primary-inactive

  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0

  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]

  aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 aria-invalid:border-danger`,
  {
    variants: {
      variant: {
        default: `
          bg-primary text-white hover:bg-primary-hover focus:bg-primary-pressed
          disabled:bg-primary-inactive
        `,
        secondary: `
          bg-transparent border border-primary text-primary
          hover:bg-secondary/80 hover:border-primary-hover hover:text-primary-hover
          focus:border-primary-pressed focus:text-primary-pressed
          disabled:border-primary-inactive disabled:text-primary-inactive
        `,
        outline: `
          border bg-background border border-primary text-primary
          hover:bg-secondary/80 hover:border-primary-hover hover:text-primary-hover
          focus:border-primary-pressed
          disabled:border-primary-inactive disabled:text-primary-inactive disabled:bg-bg-tertiary disabled:
        `,
        danger: `
          bg-danger text-white
          hover:bg-danger/90
          disabled:bg-primary-inactive
        `,
        ghost:
          'hover:bg-bg-secondary hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-4 py-3 rounded-xl has-[>svg]:px-3 text-md font-semibold',
        sm: '!rounded-[8px] gap-1 md:px-[14px] md:py-2 md:text-md px-2.5 py-1.5 text-sm',
        lg: 'py-[14px] rounded-xl px-6 has-[>svg]:px-4 text-base',
        'icon-sm': 'size-[18px] [&_svg]:!size-[10px]',
        'icon-md': 'size-6 [&_svg]:!size-4',
        'icon-lg': 'size-8 [&_svg]:!size-4',
        'icon-xl': 'size-14 [&_svg]:!size-6',
      },
      round: {
        sm: 'rounded-lg',
        lg: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      round: 'lg',
    },
  },
);

function Button({
  className,
  variant,
  size,
  round,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, round, className }))}
      {...props}
    />
  );
}

export default Button;
