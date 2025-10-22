import { userAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';
import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useAtomValue(userAtom);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // atomWithStorage가 로컬 스토리지에서 값을 읽어올 때까지 기다림
  }, []);

  // jotai가 로컬 스토리지 값을 불러오기 전에는 아무것도 렌더하지 않음
  if (!isHydrated) return null;

  if (!user) return <Navigate to='/auth/signin' replace />;

  return <>{children}</>;
}
