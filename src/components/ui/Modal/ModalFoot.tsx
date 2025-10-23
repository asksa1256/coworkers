import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ModalFoot({ children, className }: Props) {
  return (
    <div className={cn('bg-bg-primary mt-6 flex shrink-0 gap-2', className)}>
      {children}
    </div>
  );
}
