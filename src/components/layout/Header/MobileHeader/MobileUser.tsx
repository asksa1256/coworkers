import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon.svg?react';
import type { UserType } from '@/types/userType';

interface Props {
  user: UserType;
}

export default function MobileUser({ user }: Props) {
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
