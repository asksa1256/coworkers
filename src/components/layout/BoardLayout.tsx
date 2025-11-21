import Header from '@/components/layout/Header';
import { Outlet } from 'react-router-dom';
import Modal from '../ui/Modal';
import Toast from '../ui/Toast';

export default function BoardLayout() {
  return (
    <div className='mx-auto flex min-h-screen max-w-[1920px] flex-col lg:flex-row'>
      <Header />
      <main className='flex grow-1 flex-col px-4 md:px-[26px] lg:px-[30px]'>
        <Outlet />
      </main>
      <Modal />
      <Toast />
    </div>
  );
}
