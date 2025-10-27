import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import PasswordField from '@/components/ui/Input/PasswordField';
import { Label } from '@/components/ui/Label';
import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import { type ErrorResponse } from '@/types';
import {
  type SignUpRequest,
  SignUpRequestSchema,
} from '@/types/SignUpRequestSchema';
import { setTokens } from '@/utils/tokenStorage';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import KakaoOAuthButton from './KakaoOAuthButton';

export default function SignInForm() {
  const [globalError, setGlobalError] = useState('');
  const setUser = useSetAtom(userAtom);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpRequestSchema),
    mode: 'onBlur',
  });

  const password = watch('password');
  const passwordConfirmation = watch('passwordConfirmation');

  useEffect(() => {
    if (passwordConfirmation) {
      trigger('passwordConfirmation');
    }
  }, [password, passwordConfirmation, trigger]);

  const onSubmit = async (data: SignUpRequest) => {
    try {
      const res = await axiosInstance.post('/auth/signup', data);

      const { user, accessToken, refreshToken } = res.data;

      // 토큰 저장
      setTokens(accessToken, refreshToken); // 로컬 스토리지
      setUser(user); // 전역 상태

      toast.success(`환영합니다, ${user.nickname}님!`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          const { status, data } = axiosError.response;

          switch (status) {
            case 400:
              setGlobalError(
                data.message || '이메일 혹은 비밀번호를 확인해주세요.',
              );
              break;
            case 500:
              setGlobalError('서버 오류가 발생했습니다.');
              break;
            default:
              setGlobalError('회원가입에 실패했습니다.');
          }
        } else if (axiosError.request) {
          // 요청은 보냈지만 응답을 받지 못한 경우
          setGlobalError('서버와 연결할 수 없습니다.');
        } else {
          // 요청 설정 중 오류 발생
          setGlobalError('요청 처리 중 오류가 발생했습니다.');
        }
      } else {
        console.error('예상치 못한 에러:', error);
        setGlobalError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-[550px] rounded-[20px] bg-white px-[22px] py-[56px] shadow md:px-[44px] md:py-[70px]'
    >
      <h3 className='mb-8 text-center text-xl font-bold md:mb-16 md:text-2xl'>
        회원가입
      </h3>

      <div className='mb-10 space-y-6'>
        {/* 이름 */}
        <div className='flex flex-col gap-3'>
          <Label htmlFor='nickname'>이름</Label>
          <InputField
            id='nickname'
            type='text'
            placeholder='이름을 입력해주세요.'
            {...register('nickname')}
            error={errors.nickname}
          />
        </div>

        {/* 이메일 */}
        <div className='flex flex-col gap-3'>
          <Label htmlFor='email'>이메일</Label>
          <InputField
            id='email'
            type='email'
            placeholder='이메일을 입력해주세요.'
            {...register('email')}
            error={errors.email}
          />
        </div>

        {/* 비밀번호 */}
        <div className='flex flex-col gap-3'>
          <Label htmlFor='pw'>비밀번호</Label>
          <PasswordField
            id='pw'
            placeholder='비밀번호를 입력해주세요.'
            autoComplete='new-password'
            {...register('password')}
            error={errors.password}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className='flex flex-col gap-3'>
          <Label htmlFor='pwConfirm'>비밀번호 확인</Label>
          <PasswordField
            id='pwConfirm'
            placeholder='비밀번호를 다시 한 번 입력해주세요.'
            autoComplete='new-password'
            {...register('passwordConfirmation')}
            error={errors.passwordConfirmation}
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {globalError && <p className='text-danger text-md'>{globalError}</p>}
        <Button
          type='submit'
          className='mb-6 text-base'
          disabled={isSubmitting}
        >
          {isSubmitting ? '회원가입 중...' : '회원가입'}
        </Button>
      </div>

      <div className='mb-4 flex items-center justify-between gap-6'>
        <span className='bg-border-primary inline-block h-[1px] w-full'></span>
        <span className='text-text-default text-md md:text-base'>OR</span>
        <span className='bg-border-primary inline-block h-[1px] w-full'></span>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-md text-text-default md:text-base'>
          간편 회원가입하기
        </span>
        {/* <Button
          type='button'
          size='icon-lg'
          variant='ghost'
          className='h-[42px] w-[42px]'
        >
          <img src={KakaotalkIcon} alt='카카오톡 로그인' />
        </Button> */}
        <KakaoOAuthButton authType='signup' />
      </div>
    </form>
  );
}
