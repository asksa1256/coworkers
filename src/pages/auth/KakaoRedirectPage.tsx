import { KAKAO_REDIRECT_URI } from '@/constants';
import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import { setTokens } from '@/utils/tokenStorage';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function KakaoRedirectPage() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // URL 파라미터에 담긴 인가 코드
    const state = params.get('state'); // signin | signup

    if (!code) return;

    const handleSignInKakao = async () => {
      try {
        const { data } = await axiosInstance.post('/auth/signIn/KAKAO', {
          state,
          redirectUri: KAKAO_REDIRECT_URI,
          token: code,
        });

        setTokens(data.accessToken, data.refreshToken);

        if (state === 'signin') {
          setUser(data.user);
          navigate('/', { replace: true });
          toast.success(`환영합니다, ${data.user.nickname}님!`);
        } else {
          navigate('/oauth/signup/kakao', { replace: true });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            'Axios Error:',
            error.response?.status,
            error.response?.data,
          );
        } else {
          console.error('Unexpected Error:', error);
        }
      }
    };

    handleSignInKakao();
  }, [navigate, setUser]);

  return (
    <section className='flex min-h-screen flex-col items-center justify-center transition-colors dark:bg-gray-900'>
      <div className='animate-fadeIn flex flex-col items-center gap-4'>
        <Loader2 className='text-primary size-10 animate-spin' />
        <p className='font-medium text-gray-700 dark:text-gray-200'>
          카카오 계정 연동중...
        </p>
      </div>
    </section>
  );
}
