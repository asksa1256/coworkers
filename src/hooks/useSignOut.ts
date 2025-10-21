import { userAtom } from '@/store/authAtom';
import { removeTokens } from '@/utils/tokenStorage';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const signOut = () => {
    removeTokens();
    setUser(null);
    navigate('/auth/signin');
  };

  return signOut;
};

export default useSignOut;
