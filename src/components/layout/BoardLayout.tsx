import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { Outlet, useLocation } from 'react-router-dom';

export default function BoardLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      className={cn(
        'mx-auto flex min-h-screen max-w-[1920px] flex-col lg:flex-row',
        pathname === '/board' ? 'bg-bg-primary' : '',
      )}
    >
      <Header />
      <main className='flex grow-1 flex-col px-4 md:px-[26px] lg:px-[30px]'>
        <Outlet />
      </main>
    </div>
  );
}
