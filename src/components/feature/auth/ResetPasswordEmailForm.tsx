import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import Modal from '@/components/ui/Modal';
import useModal from '@/hooks/useModal';
import axiosInstance from '@/lib/axios';
import { type ErrorResponse } from '@/types';
import {
  resetPasswordEmailRequestSchema,
  type ResetPasswordEmailRequest,
} from '@/types/ResetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ResetPasswordEmailForm() {
  const { closeModal } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordEmailRequest>({
    resolver: zodResolver(resetPasswordEmailRequestSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: ResetPasswordEmailRequest) => {
    const payload = {
      email: data.email,
      redirectUrl: window.location.origin,
    };

    try {
      const res = await axiosInstance.post(
        '/user/send-reset-password-email',
        payload,
      );

      toast.success(`${res.data.message}`);
    } catch (error) {
      let errorMessage: string;

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;

        if (axiosError.response) {
          const { status } = axiosError.response;

          switch (status) {
            case 400:
              errorMessage = '등록되지 않은 유저입니다.';
              break;
            case 500:
              errorMessage = '서버 오류가 발생했습니다.';
              break;
            default:
              errorMessage = '비밀번호 재설정 메일 전송에 실패했습니다.';
          }
        } else if (axiosError.request) {
          // 요청은 보냈지만 응답을 받지 못한 경우
          errorMessage = '서버와 연결할 수 없습니다.';
        } else {
          // 요청 설정 중 오류 발생
          errorMessage = '요청 처리 중 오류가 발생했습니다.';
        }
      } else {
        console.error('예상치 못한 에러:', error);
        errorMessage = '알 수 없는 오류가 발생했습니다.';
      }

      toast.error(errorMessage);
    }
  };

  return (
    <form
      className='flex flex-col items-center justify-center'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Modal.Body className='w-full'>
        <div className='mb-4 flex flex-col gap-2 text-center'>
          <h4 className='text-text-primary text-base leading-none font-medium'>
            비밀번호 재설정
          </h4>
          <p className='text-md text-gray-400'>
            비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <InputField
            id='email'
            type='email'
            placeholder='이메일을 입력해주세요.'
            {...register('email')}
            error={errors.email}
          />
        </div>
      </Modal.Body>
      <Modal.Foot className='w-full'>
        <Button
          size='lg'
          type='button'
          variant='outline'
          className='w-[50%]'
          onClick={() => {
            reset();
            closeModal();
          }}
        >
          닫기
        </Button>
        <Button
          size='lg'
          className='w-[50%]'
          disabled={isSubmitting || !isValid}
          type='submit'
        >
          {isSubmitting ? '링크 전송중...' : '링크 보내기'}
        </Button>
      </Modal.Foot>
    </form>
  );
}
