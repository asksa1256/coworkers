import LoggedInHeader from '@/components/layout/Header/LoggedInHeader';
import LoggedOutHeader from '@/components/layout/Header/LoggedOutHeader';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  return (
    <header
      className={cn(
        'bg-bg-primary md:border-border-primary sticky top-0 h-[52px] shrink-0 transition-[width] md:h-screen md:w-[72px] md:border-r lg:w-[270px]',
        // toggle && 'md:w-[180px] lg:w-[270px]',
      )}
    >
      {isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
    </header>
  );
}
