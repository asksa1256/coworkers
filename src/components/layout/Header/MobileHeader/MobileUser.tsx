import DefaultProfileIcon from '@/assets/images/icons/DefaultProfileIcon.svg?react';

export default function MobileUser() {
  return (
    <div className='relative'>
      <button className='flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-slate-300'>
        <DefaultProfileIcon className='w-6' />
      </button>
      {/* 드랍다운 메뉴 들어갈 자리 */}
    </div>
  );
}
