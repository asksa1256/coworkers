import { userAtom } from '@/store/authAtom';
import { removeTokens } from '@/utils/tokenStorage';
import { useSetAtom } from 'jotai';

const useSignOut = () => {
  const setUser = useSetAtom(userAtom);

  const signOut = () => {
    removeTokens();
    setUser(null);
  };

  return signOut;
};

export default useSignOut;
