import UserMenu from '@/components/layout/Header/UserMenu';
import Avatar from '@/components/ui/Avatar';
import { userAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';

export default function MobileUser() {
  const user = useAtomValue(userAtom);

  if (!user) return;

  return (
    <div className='relative'>
      <UserMenu align='end'>
        <Avatar
          imgSrc={user.image}
          size='md'
          className='flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-slate-300'
        />
      </UserMenu>
    </div>
  );
}
