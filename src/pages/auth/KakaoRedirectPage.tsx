import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import { setTokens } from '@/utils/tokenStorage';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KakaoRedirectPage() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // URL 파라미터에 담긴 인가 코드

    if (!code) return;

    const handleSignInKakao = async () => {
      try {
        const res = await axiosInstance.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/signIn/KAKAO`,
          {
            state: '',
            redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
            token: code,
          },
        );

        setUser(res.data.user);
        setTokens(res.data.accessToken, res.data.refreshToken);
        navigate('/', { replace: true }); // 메인 페이지로 이동 + 파라미터의 1회용 인가 코드 제거
      } catch (error) {
        console.error(error);
      }
    };

    handleSignInKakao();
  }, []);

  return <section>카카오 로그인</section>;
}
