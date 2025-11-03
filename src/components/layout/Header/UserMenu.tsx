import Dropdown from '@/components/ui/Dropdown';
import useSignOut from '@/hooks/useSignOut';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
}

export default function UserMenu({ children, align = 'start' }: Props) {
  const signOut = useSignOut();

  const userMenu = [
    {
      label: '마이 히스토리',
      onClick: () => alert('마이 히스토리 페이지로 이동'),
    },
    { label: '계정 설정', onClick: () => alert('계정 설정 페이지로 이동') },
    { label: '로그아웃', onClick: () => signOut() },
  ];

  return (
    <Dropdown
      type='icon'
      triggerChildren={children}
      menuItems={userMenu}
      align={align}
    />
  );
}
