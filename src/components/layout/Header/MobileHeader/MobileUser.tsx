import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon.svg?react';
import { userAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';

export default function MobileUser() {
  const user = useAtomValue(userAtom);

  if (!user) return;

  const { image, nickname } = user;

  return (
    <div className='relative'>
      <button className='flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-slate-300'>
        {image ? (
          <img src={image} alt={`${nickname}님의 프로필 사진`} />
        ) : (
          <DefaultProfileIcon className='w-6' />
        )}
      </button>
      {/* 드랍다운 메뉴 들어갈 자리 */}
    </div>
  );
}
