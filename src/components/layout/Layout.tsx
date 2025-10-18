import Header from '@/components/layout/Header/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1920px] flex-col md:flex-row">
      <Header />
      <main className="border-border-primary grow-1 border-t px-4 has-[.bt-none]:border-none md:border-none md:px-[26px] lg:px-[30px]">
        <Outlet />
      </main>
    </div>
  );
}
