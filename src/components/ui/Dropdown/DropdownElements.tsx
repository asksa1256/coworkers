import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface MenuItem {
  label: string;
  onClick?: () => void;
}

interface DropdownBaseProps {
  align?: 'start' | 'center' | 'end';
}

// 셀렉트 형태 드롭다운
export interface SelectDropdownProps extends DropdownBaseProps {
  triggerChildren: string;
  menuItems: string[];
  suffix: React.ReactNode;
  onSelect?: (value: string) => void;
}

// 아이콘 형태 드롭다운
export interface IconDropdownProps extends DropdownBaseProps {
  triggerChildren: React.ReactNode;
  menuItems: MenuItem[];
  suffix?: never;
  onSelect?: never;
}

export type DropdownProps = SelectDropdownProps | IconDropdownProps;

export const Dropdown = ({
  triggerChildren,
  suffix,
  menuItems,
  align = 'start',
  onSelect,
}: DropdownProps) => {
  const handleItemClick = (item: string | MenuItem) => {
    if (typeof item === 'string') {
      // 셀렉트 형태: onSelect 호출
      onSelect?.(item);
    } else {
      // 아이콘 형태: onClick 실행
      item.onClick?.();
    }
  };

  const isSelectTrigger = typeof triggerChildren === 'string';

  return (
    <DropdownMenu>
      {isSelectTrigger ? (
        <DropdownMenuTrigger suffix={suffix as React.ReactNode}>
          {triggerChildren}
        </DropdownMenuTrigger>
      ) : (
        <DropdownMenuTrigger>{triggerChildren}</DropdownMenuTrigger>
      )}

      <DropdownMenuContent align={align}>
        {menuItems.map((item, i) => {
          const text = typeof item === 'string' ? item : item.label;

          return (
            <DropdownMenuItem key={i} onClick={() => handleItemClick(item)}>
              {text}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />;
}

export function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
  );
}

// 셀렉트 형태 드롭다운 (문자열 children + suffix)
interface SelectTriggerProps {
  children: string;
  suffix: React.ReactNode;
  className?: string;
}

// 아이콘 트리거 형태 드롭다운 (ReactNode children only)
interface IconTriggerProps {
  children: React.ReactNode;
  suffix?: never;
  className?: string;
}

type DropdownMenuTriggerProps = (SelectTriggerProps | IconTriggerProps) &
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>,
    'children'
  >;

export function DropdownMenuTrigger({
  suffix,
  children,
  className,
  ...props
}: DropdownMenuTriggerProps) {
  const isSelectTrigger = typeof children === 'string';

  return (
    <DropdownMenuPrimitive.Trigger
      data-slot='dropdown-menu-trigger'
      className={cn(
        'group',
        isSelectTrigger &&
          'text-text-default border-border-primary md:text-md flex h-10 min-w-[94px] items-center justify-between gap-2 rounded-lg border bg-white p-2 text-xs md:h-11 md:min-w-[120px] md:rounded-xl md:px-3.5 md:py-2.5',
        className,
      )}
      {...props}
    >
      {children}
      {isSelectTrigger && suffix && (
        <span className='transition-transform duration-200 group-data-[state=open]:rotate-180 [&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6'>
          {suffix}
        </span>
      )}
    </DropdownMenuPrimitive.Trigger>
  );
}

interface DropdownMenuContentProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Content> {
  align?: 'start' | 'center' | 'end';
}

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = 'start',
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'text-text-primary border-border-primary md:text-md z-30 overflow-x-hidden overflow-y-auto rounded-lg border bg-white text-xs shadow-md md:rounded-xl',

          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',

          'max-h-(--radix-dropdown-menu-content-available-height) min-w-[94px] origin-(--radix-dropdown-menu-content-transform-origin) md:min-w-[120px]',

          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot='dropdown-menu-item'
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'hover:bg-bg-secondary relative cursor-pointer px-4 py-3 text-left outline-hidden select-none md:py-3.5',

        'focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive',

        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8',

        "[&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:!text-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        className,
      )}
      {...props}
    />
  );
}
