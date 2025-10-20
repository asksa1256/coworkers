import MobileHeader from '@/components/layout/Header/MobileHeader';
import SidebarHeader from '@/components/layout/Header/SidebarHeader';
import useCurrentView from '@/hooks/useCurrentView';
import { useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentView = useCurrentView();

  return (
    <>
      {currentView === 'MOBILE' ? (
        <MobileHeader isLoggedIn={isLoggedIn} />
      ) : (
        <SidebarHeader />
      )}
    </>
  );
}
