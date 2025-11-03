import Button from '@/components/ui/Button';
import PasswordField from '@/components/ui/Input/PasswordField';
import { Label } from '@/components/ui/Label';
import useSignOut from '@/hooks/useSignOut';
import axiosInstance from '@/lib/axios';
import { type ErrorResponse } from '@/types';
import {
  type ResetPasswordFormRequest,
  resetPasswordFormRequestSchema,
} from '@/types/ResetPasswordSchema';
import { getAccessToken } from '@/utils/tokenStorage';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ResetPasswordForm() {
  const [globalError, setGlobalError] = useState('');
  const [token, setToken] = useState(''); // 비밀번호 변경용 토큰
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const signOut = useSignOut();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormRequest>({
    resolver: zodResolver(resetPasswordFormRequestSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ResetPasswordFormRequest) => {
    try {
      if (accessToken) {
        // 로그인 사용자
        await axiosInstance.patch('/user/password', data);

        // 강제 로그아웃 (로그인 페이지에서 재로그인 유도)
        signOut();
      } else {
        // 로그인하지 않은 사용자
        const payload = {
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          token,
        };

        await axiosInstance.patch('/user/reset-password', payload);
      }

      toast.success('비밀번호 변경이 완료되었습니다.');
      navigate('/auth/signIn');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          const { status, data } = axiosError.response;

          switch (status) {
            case 400:
              setGlobalError(data.message);
              break;
            case 500:
              setGlobalError('서버 오류가 발생했습니다.');
              break;
            default:
              setGlobalError('로그인에 실패했습니다.');
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    setToken(token || '');
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-[550px] rounded-[20px] bg-white px-[22px] py-[56px] shadow md:px-[44px] md:py-[70px]'
    >
      <h3 className='mb-8 text-center text-xl font-bold md:mb-16 md:text-2xl'>
        비밀번호 재설정
      </h3>

      <div className='mb-10 space-y-6'>
        {/* 새 비밀번호 */}
        <div className='flex flex-col gap-3'>
          <Label htmlFor='password'>새 비밀번호</Label>
          <PasswordField
            id='pw'
            placeholder='비밀번호(영문, 숫자 포함 8자 이상)를 입력해주세요.'
            autoComplete='new-password'
            {...register('password')}
            error={errors.password}
          />
        </div>

        {/* 비밀번호 */}
        <div className='flex flex-col gap-3'>
          <Label htmlFor='pw'>비밀번호 확인</Label>
          <PasswordField
            id='pw'
            placeholder='비밀번호 확인을 입력해주세요.'
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
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? '재설정 중...' : '재설정'}
        </Button>
      </div>
    </form>
  );
}
