import Avatar from '@/components/ui/Avatar';
import Dropdown from '@/components/ui/Dropdown';
import useSignOut from '@/hooks/useSignOut';
import { userAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';

export default function MobileUser() {
  const user = useAtomValue(userAtom);
  const signOut = useSignOut();

  if (!user) return;

  const userMenu = [
    {
      label: '마이 히스토리',
      onClick: () => alert('마이 히스토리 페이지로 이동'),
    },
    { label: '계정 설정', onClick: () => alert('계정 설정 페이지로 이동') },
    { label: '로그아웃', onClick: () => signOut() },
  ];

  return (
    <div className='relative'>
      <Dropdown
        type='icon'
        triggerChildren={
          <Avatar
            imgSrc={user.image}
            size='md'
            className='flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-slate-300'
          />
        }
        menuItems={userMenu}
        align='end'
      />
    </div>
  );
}
