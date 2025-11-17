import DefaultProfileIcon from '@/assets/icons/DefaultProfileIcon.svg?react';
import GnbFoldIcon from '@/assets/icons/GnbFoldIcon.svg?react';
import HeaderGnb from '@/components/layout/Header/HeaderGnb';
import HeaderLogo from '@/components/layout/Header/HeaderLogo';
import SidebarUser from '@/components/layout/Header/SidebarHeader/SidebarUser';
import { cn } from '@/lib/utils';
import type { GroupType } from '@/types/userType';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
  currentGroup: GroupType | null;
  onUpdateCurrentGroup: (group: GroupType | null) => void;
}

export default function SidebarHeader({
  isLoggedIn,
  currentGroup,
  onUpdateCurrentGroup,
}: Props) {
  const [isFold, setIsFold] = useState(false);

  return (
    <header
      className={cn(
        'bg-bg-primary border-border-primary group sticky top-0 flex h-screen w-[270px] flex-col border-r transition-all',
        isFold && 'is-fold w-[72px] lg:w-[72px]',
      )}
    >
      {/* 상단 영역 */}
      <div
        className={cn(
          'relative flex shrink-0 items-center justify-between px-4 py-8 lg:px-[26px]',
          'group-[.is-fold]:px-6',
        )}
      >
        <HeaderLogo iconOnly={isFold} />
        <button
          className={cn(
            'border-border-primary bg-bg-primary translate-x-2 rounded-full border p-0.5 lg:translate-x-0 lg:rounded-none lg:border-0 lg:p-0',
            'group-[.is-fold]:bg-bg-primary group-[.is-fold]:border-border-primary group-[.is-fold]:absolute group-[.is-fold]:top-1/2 group-[.is-fold]:right-0 group-[.is-fold]:h-8 group-[.is-fold]:w-8 group-[.is-fold]:translate-x-[18px] group-[.is-fold]:-translate-y-1/2 group-[.is-fold]:rounded-full group-[.is-fold]:border',
          )}
          onClick={() => {
            setIsFold(prev => !prev);
          }}
        >
          <GnbFoldIcon className='mx-auto group-[.is-fold]:w-6 group-[.is-fold]:rotate-180' />
        </button>
      </div>
      {/* 중간 영역 */}
      {isLoggedIn && (
        <div
          className={cn(
            'mt-6 flex grow-1 flex-col overflow-hidden px-4',
            'group-[.is-fold]:px-[10px]',
          )}
        >
          <HeaderGnb
            currentGroup={currentGroup}
            onUpdateCurrentGroup={onUpdateCurrentGroup}
          />
        </div>
      )}
      {/* 하단 영역 */}
      <div className='mt-auto shrink-0'>
        {isLoggedIn ? (
          <SidebarUser currentGroup={currentGroup} />
        ) : (
          <Link
            className={cn(
              'border-border-primary mx-4 flex items-center gap-3 border-t pt-5 pb-6 text-center leading-10 font-medium whitespace-nowrap',
              'group-[.is-fold]:text-text-default',
            )}
            to='/login'
          >
            <span
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200',
                'group-[.is-fold]:hidden',
              )}
            >
              <DefaultProfileIcon />
            </span>
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
