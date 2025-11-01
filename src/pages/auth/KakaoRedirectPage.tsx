import { KAKAO_REDIRECT_URI } from '@/constants';
import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import { setTokens } from '@/utils/tokenStorage';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function KakaoRedirectPage() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const hasExecuted = useRef(false); // handleSignInKakao 2회 실행 방지

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // URL 파라미터에 담긴 인가 코드

    if (!code) return;

    const handleSignInKakao = async () => {
      try {
        const { data } = await axiosInstance.post('/auth/signIn/KAKAO', {
          redirectUri: KAKAO_REDIRECT_URI,
          token: code,
        });

        setTokens(data.accessToken, data.refreshToken);

        // 기존 카카오 계정 유저는 간편 회원가입 생략하고 간편 로그인 바로 진행
        if (data.user.createdAt !== data.user.updatedAt) {
          // /user 데이터 저장
          const { data: userRes } = await axiosInstance('/user');
          setUser(userRes);
          navigate('/', { replace: true });
          toast.success(`환영합니다, ${data.user.nickname}님!`);
        } else if (data.user.createdAt === data.user.updatedAt) {
          // 신규 카카오 계정 유저는 간편 회원가입 페이지로 이동
          navigate('/oauth/signup/kakao', { replace: true });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            'Axios 에러:',
            error.response?.status,
            error.response?.data,
          );
        } else {
          console.error('예상치 못한 에러 발생:', error);
        }

        toast.error('카카오 계정 연동에 실패했습니다.');
        navigate('/auth/signIn');
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
