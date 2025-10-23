import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ModalBody({ children, className }: Props) {
  return (
    <div className={cn('grow-1 overflow-auto', className)}>{children}</div>
  );
}
