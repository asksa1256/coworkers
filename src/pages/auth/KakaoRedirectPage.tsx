import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import { setTokens } from '@/utils/tokenStorage';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
          redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          token: code,
        });

        setTokens(data.accessToken, data.refreshToken);

        if (state === 'signin') {
          setUser(data.user);
          navigate('/', { replace: true });
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

  return <section>카카오 로그인</section>;
}
