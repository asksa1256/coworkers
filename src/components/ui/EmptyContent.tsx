import EmptyContentImg from '@/assets/images/EmptyContentImg.png';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function EmptyContent({ children, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 md:gap-8',
        className,
      )}
    >
      <div className='w-[184px] pt-8 md:w-[324px] lg:w-auto'>
        <img src={EmptyContentImg} alt='' className='mx-auto h-auto w-full' />
      </div>

      {children}
    </div>
  );
}
