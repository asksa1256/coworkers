import Dropdown from '@/components/ui/Dropdown';
import useSignOut from '@/hooks/useSignOut';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
}

export default function UserMenu({ children, align = 'start' }: Props) {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const userMenu = [
    {
      label: '마이 히스토리',
      onClick: () => navigate('/my-history'),
    },
    { label: '계정 설정', onClick: () => navigate('/mypage') },
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
