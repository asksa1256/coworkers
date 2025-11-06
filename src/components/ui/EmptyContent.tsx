import EmptyContentImg from '@/assets/images/EmptyContentImg.png';
import type { ReactNode } from 'react';

export default function EmptyContent({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col items-center justify-center gap-6 md:gap-8'>
      <div className='w-[184px] pt-8 md:w-[324px] lg:w-auto'>
        <img src={EmptyContentImg} alt='' className='h-auto w-full' />
      </div>

      {children}
    </div>
  );
}
