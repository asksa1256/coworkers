import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import { Label } from '@/components/ui/Label';
import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import {
  type SignUpRequest,
  SignUpRequestSchema,
} from '@/types/SignUpRequestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ErrorResponse {
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
}

type KakaoSignUpRequest = Pick<SignUpRequest, 'nickname'>;

export default function KakaoSignUpPage() {
  const [globalError, setGlobalError] = useState('');
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KakaoSignUpRequest>({
    resolver: zodResolver(SignUpRequestSchema.pick({ nickname: true })), // 닉네임만 검증
    mode: 'onBlur',
  });

  const onSubmit = async (data: KakaoSignUpRequest) => {
    const payload = {
      nickname: data.nickname,
      image: '',
    };

    try {
      await axiosInstance.patch('/user', payload);

      const res = await axiosInstance.get('/user');

      const user = res.data;

      if (!user) {
        console.error(res.data);
        setGlobalError('회원 정보를 불러오지 못했습니다.');
        return;
      }

      setUser(user);
      toast.success(`환영합니다, ${user.nickname}님!`);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          const { status, data } = axiosError.response;

          switch (status) {
            case 400:
              setGlobalError(data.message || '이미 있는 닉네임입니다.');
              break;
            case 500:
              setGlobalError('서버 오류가 발생했습니다.');
              break;
            default:
              setGlobalError('카카오 간편 회원가입에 실패했습니다.');
          }
        } else if (axiosError.request) {
          // 요청은 보냈지만 응답을 받지 못한 경우
          setGlobalError('서버와 연결할 수 없습니다.');
        } else {
          // 요청 설정 중 오류 발생
          setGlobalError('요청 처리 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <section className='flex min-h-screen items-center justify-center py-[30px] md:py-[120px] lg:py-6'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-[550px] rounded-[20px] bg-white px-[22px] py-[56px] shadow md:px-[44px] md:py-[70px]'
      >
        <div className='mb-8 text-center md:mb-16'>
          <h3 className='mb-2 text-xl font-bold md:text-2xl'>간편 회원가입</h3>
          <p className='text-text-default text-md'>
            카카오 계정으로 간편 회원가입을 진행합니다.
          </p>
        </div>

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
      </form>
    </section>
  );
}
