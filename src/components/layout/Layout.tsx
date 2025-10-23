import Header from '@/components/layout/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function Layout() {
  return (
    <div className='mx-auto flex min-h-screen max-w-[1920px] flex-col md:flex-row'>
      <Header />
      <main className='flex grow-1 flex-col px-4 md:px-[26px] lg:px-[30px]'>
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
}
