import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon.svg?react';
import type { MembershipsType, UserType } from '@/types/userType';

interface Props {
  user: UserType;
  currentGroup: MembershipsType | null;
}

export default function SidebarUser({ user, currentGroup }: Props) {
  const { nickname, image } = user;

  return (
    <div className='border-border-primary relative mx-4 border-t pt-5 pb-6'>
      <button className='flex w-full items-center gap-3 text-left'>
        {/* 프로필 사진 */}
        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200'>
          {image ? (
            <img src={image} alt={`${nickname}님의 프로필 사진`} />
          ) : (
            <DefaultProfileIcon />
          )}
        </span>
        <div className='grow-1 overflow-hidden group-[.is-fold]:hidden'>
          <strong className='block overflow-hidden leading-[1.35] font-medium text-ellipsis whitespace-nowrap'>
            {nickname}
          </strong>
          {currentGroup && (
            <span className='text-md mt-0.5 block overflow-hidden leading-[1.1] text-ellipsis whitespace-nowrap text-slate-400'>
              {currentGroup.group.name}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
