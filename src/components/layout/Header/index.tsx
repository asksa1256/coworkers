import MobileHeader from '@/components/layout/Header/MobileHeader';
import SidebarHeader from '@/components/layout/Header/SidebarHeader';
import useCurrentView from '@/hooks/useCurrentView';
import type { MembershipsType, UserType } from '@/types/userType';
import { useState } from 'react';

const TEST_USER: UserType = {
  id: 2318,
  nickname: 'aaa1111',
  createdAt: '2025-10-21T01:01:25+09:00',
  updatedAt: '2025-10-21T01:01:25+09:00',
  image: null,
  teamId: '16-16',
  email: 'aaa1111@aaaa.com',
  memberships: [
    {
      userId: 2318,
      groupId: 3244,
      userName: 'aaa1111',
      userEmail: 'aaa1111@aaaa.com',
      userImage: null,
      role: 'ADMIN',
      group: {
        id: 3244,
        name: '스누피처럼살자',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/2318/images.jpg',
        createdAt: '2025-10-21T01:05:40+09:00',
        updatedAt: '2025-10-21T01:05:40+09:00',
        teamId: '16-16',
      },
    },
    {
      userId: 2318,
      groupId: 3245,
      userName: 'aaa1111',
      userEmail: 'aaa1111@aaaa.com',
      userImage: null,
      role: 'MEMBER',
      group: {
        id: 3245,
        name: '도비는자유에요',
        image:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/2319/dobbyisfree.jpg',
        createdAt: '2025-10-21T01:20:24+09:00',
        updatedAt: '2025-10-21T01:20:24+09:00',
        teamId: '16-16',
      },
    },
  ],
};

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentGroup, setCurrentGroup] = useState<MembershipsType | null>(
    null,
  );
  const currentView = useCurrentView();
  const handleUpdateCurrentGroup = (group: MembershipsType) => {
    setCurrentGroup(group);
  };

  // 로그인 후 jotai를 통해 유저 정보 전역에서 관리할 수 있게 처리
  // 로그인 작업 후에 적용 예정, 현재 프롭스드릴링으로 적용

  return (
    <>
      {currentView === 'MOBILE' ? (
        <MobileHeader
          isLoggedIn={isLoggedIn}
          user={TEST_USER}
          currentGroup={currentGroup}
          onUpdateCurrentGroup={handleUpdateCurrentGroup}
        />
      ) : (
        <SidebarHeader
          isLoggedIn={isLoggedIn}
          user={TEST_USER}
          currentGroup={currentGroup}
          onUpdateCurrentGroup={handleUpdateCurrentGroup}
        />
      )}
    </>
  );
}
