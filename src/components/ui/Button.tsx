import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center w-full gap-2 whitespace-nowrap text-sm font-medium transition-all outline-none 

  disabled:pointer-events-none

  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0

  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]

  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`,
  {
    variants: {
      variant: {
        default: `
          bg-primary text-primary-foreground hover:bg-primary-hover focus:bg-primary-pressed
          disabled:bg-disabled
        `,
        secondary: `
          bg-transparent border border-primary text-primary 
          hover:bg-secondary/80 hover:border-primary-hover hover:text-primary-hover
          focus:border-primary-pressed focus:text-primary-pressed
          disabled:border-disabled disabled:text-disabled
        `,
        outline: `
          border bg-background border border-primary text-primary 
          hover:bg-secondary/80 hover:border-primary-hover hover:text-primary-hover
          focus:border-primary-pressed focus:text-primary-pressed
          disabled:border-disabled disabled:text-disabled
        `,
        destructive: `
          bg-destructive text-white 
          hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 
          disabled:bg-disabled
        `,
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'px-4 py-[12px] rounded-[12px] has-[>svg]:px-3 text-md font-semibold',
        sm: 'rounded-[8px] gap-1 px-[12px] py-2 text-md',
        lg: 'py-[14px] rounded-[12px] px-6 has-[>svg]:px-4 text-base',
        'icon-sm': 'size-[18px] [&_svg]:!size-[10px]',
        'icon-md': 'size-6 [&_svg]:!size-4',
        'icon-lg': 'size-8 [&_svg]:!size-4',
        'icon-xl': 'size-14 [&_svg]:!size-6',
      },
      round: {
        sm: 'rounded-[8px]',
        lg: 'rounded-[12px]',
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
      data-slot="button"
      className={cn(buttonVariants({ variant, size, round, className }))}
      {...props}
    />
  );
}

export default Button;
