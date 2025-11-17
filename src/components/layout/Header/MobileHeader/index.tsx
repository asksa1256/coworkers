import HeaderLogo from '@/components/layout/Header/HeaderLogo';
import MobileMenu from '@/components/layout/Header/MobileHeader/MobileMenu';
import MobileUser from '@/components/layout/Header/MobileHeader/MobileUser';
import type { GroupType } from '@/types/userType';
import { Link } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
  currentGroup: GroupType | null;
  onUpdateCurrentGroup: (group: GroupType | null) => void;
}

export default function MobileHeader({
  isLoggedIn,
  currentGroup,
  onUpdateCurrentGroup,
}: Props) {
  return (
    <header className='bg-bg-primary border-border-primary sticky top-0 z-40 flex h-[52px] shrink-0 items-center justify-between border-b px-4'>
      <div className='flex h-full items-center gap-3'>
        {isLoggedIn && (
          <MobileMenu
            currentGroup={currentGroup}
            onUpdateCurrentGroup={onUpdateCurrentGroup}
          />
        )}
        <HeaderLogo iconOnly={isLoggedIn} />
      </div>
      <div className='flex h-full items-center'>
        {isLoggedIn ? (
          <MobileUser />
        ) : (
          <Link
            to='/login'
            className='text-md text-text-default flex h-full items-center'
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
