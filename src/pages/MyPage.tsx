import UserConfigForm from '@/components/feature/myPage/UserConfigForm';
import { userAtom } from '@/store/authAtom';
import type { UserType } from '@/types/userType';
import { useAtom } from 'jotai';

export default function MyPage() {
  const [user, setUser] = useAtom(userAtom);

  const handleUpdateUserAtom = (data: UserType) => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        nickname: data.nickname,
        image: data.image,
      };
    });
  };

  if (!user) return;

  return (
    <div className='flex h-[100vh] items-center'>
      <UserConfigForm userData={user} onSubmitSuccess={handleUpdateUserAtom} />
    </div>
  );
}
