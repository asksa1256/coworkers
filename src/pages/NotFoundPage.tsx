import { useEffect } from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.history.back();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4'>
      <div className='relative'>
        <div className='absolute -top-20 -left-20 h-40 w-40 rounded-full bg-blue-200 opacity-20 blur-3xl'></div>
        <div className='absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-indigo-200 opacity-20 blur-3xl'></div>

        <div className='relative rounded-3xl bg-white p-12 shadow-2xl shadow-blue-100'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <h1 className='bg-gradient-to-r from-[#5189fa] to-indigo-500 bg-clip-text text-6xl font-black text-transparent md:text-9xl'>
              404
            </h1>

            <div className='space-y-2'>
              <p className='text-2xl font-semibold text-gray-800'>
                페이지를 찾을 수 없습니다.
              </p>
              <p className='max-w-md text-gray-500'>
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                <br />
                3초 후 이전 페이지로 이동합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
