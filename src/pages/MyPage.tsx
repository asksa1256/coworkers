import UserConfigForm from '@/components/feature/myPage/UserConfigForm';
import { userAtom } from '@/store/authAtom';
import type { UpdateUserRequestBody } from '@/types/userType';
import { useAtom } from 'jotai';

export default function MyPage() {
  const [user, setUser] = useAtom(userAtom);

  const handleUpdateUserAtom = (data: UpdateUserRequestBody) => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        nickname: data.nickname ? data.nickname : prev.nickname,
        image: data.image,
      };
    });
  };

  if (!user) return;

  return (
    <div className='py-18 md:py-44 lg:py-39'>
      <UserConfigForm userData={user} onSubmitSuccess={handleUpdateUserAtom} />
    </div>
  );
}
