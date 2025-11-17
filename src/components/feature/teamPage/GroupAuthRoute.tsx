import { getGroupMembership } from '@/api/api';
import { GroupAuthContext } from '@/hooks/useGroupAuthContext';
import { userAtom } from '@/store/authAtom';
import { isAxiosError } from 'axios';
import { useAtomValue } from 'jotai';
import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function GroupAuthRoute({ children }: { children: ReactNode }) {
  const user = useAtomValue(userAtom);
  const params = useParams();
  const groupId = Number(params.groupId);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      if (!user) return;

      try {
        const data = await getGroupMembership(groupId, user.id);
        setIsAdmin(data.role === 'ADMIN');
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 404) {
          // 그룹 멤버 아닐 시 홈으로 이동
          navigate('/', { replace: true });
        } else {
          toast.error('사용자 권한을 가져올 수 없습니다. 다시 시도해주세요.');
        }
        throw e;
      }
    };

    setIsAdmin(null);
    getUserRole();
  }, [groupId, navigate, user]);

  if (isAdmin === null) return;

  return (
    <GroupAuthContext.Provider value={isAdmin}>
      {children}
    </GroupAuthContext.Provider>
  );
}
