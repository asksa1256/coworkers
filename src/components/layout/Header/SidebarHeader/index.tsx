import GnbFoldIcon from '@/assets/icons/GnbFoldIcon.svg?react';
import HeaderLogo from '@/components/layout/Header/HeaderLogo';
import { useState } from 'react';

interface Props {
  isLoggedIn: boolean;
}

export default function SidebarHeader({ isLoggedIn }: Props) {
  const [isFold, setIsFold] = useState(false);

  return (
    <header className='bg-bg-primary border-border-primary sticky top-0 h-screen w-[270px] border-r'>
      <div>
        <HeaderLogo />
        <button>
          <GnbFoldIcon />
        </button>
      </div>
      <div></div>
    </header>
  );
}
