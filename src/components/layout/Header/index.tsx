import MobileHeader from '@/components/layout/Header/MobileHeader';
import SidebarHeader from '@/components/layout/Header/SidebarHeader';
import useCurrentView from '@/hooks/useCurrentView';
import { userAtom } from '@/store/authAtom';
import type { GroupType } from '@/types/userType';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<GroupType | null>(null);
  const currentView = useCurrentView();
  const handleUpdateCurrentGroup = (group: GroupType) => {
    setCurrentGroup(group);
  };
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <>
      {currentView === 'WEB' ? (
        <SidebarHeader
          isLoggedIn={isLoggedIn}
          currentGroup={currentGroup}
          onUpdateCurrentGroup={handleUpdateCurrentGroup}
        />
      ) : (
        <MobileHeader
          isLoggedIn={isLoggedIn}
          currentGroup={currentGroup}
          onUpdateCurrentGroup={handleUpdateCurrentGroup}
        />
      )}
    </>
  );
}
