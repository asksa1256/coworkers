import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import Modal from '@/components/ui/Modal';
import useModal from '@/hooks/useModal';
import axiosInstance from '@/lib/axios';
import { type ErrorResponse } from '@/types';
import {
  type ResetPasswordData,
  resetPasswordSchema,
} from '@/types/ResetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function ResetPasswordModal() {
  const { openModal, closeModal, modal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onSubmit',
  });

  const onSubmit = useCallback(
    // useCallback(() => async () => {...})로 전달할 시 리액트 훅폼의 handleSubmit이 기대한 타입과 달라서 폼이 제출되지 않음
    // handleSubmit이 기대하는 onSubmit 타입: (data: FormData) => void | Promise<void>
    // onSubmit = useCallback(() => async () => {...})의 타입: () => async (data: ResetPasswordData) => {...}
    // 따라서 useCallback의 화살표 함수 형태 생략
    async (data: ResetPasswordData) => {
      const payload = {
        email: data.email,
        redirectUrl: window.location.origin,
      };

      try {
        const res = await axiosInstance.post(
          '/user/send-reset-password-email',
          payload,
        );
        console.log(res);
        reset();
      } catch (error) {
        let errorMessage: string;

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;

          if (axiosError.response) {
            const { status } = axiosError.response;

            switch (status) {
              case 400:
                // 400: 유효성 검사 오류 (등록되지 않은 유저 등)
                errorMessage = '등록되지 않은 유저입니다.';
                break;
              case 500:
                // 500: 서버 오류
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
          errorMessage = '요청 처리 중 오류가 발생했습니다.';
        }

        // API 에러 메시지 'email' 필드에 적용
        setError('email', {
          type: 'manual',
          message: errorMessage,
        });
      }
    },
    [reset, setError],
  );

  const modalContent = useMemo(
    () => (
      <form
        className='flex flex-col items-center justify-center px-9 pt-8'
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
            disabled={isSubmitting}
            type='submit'
          >
            {isSubmitting ? '링크 전송중...' : '링크 보내기'}
          </Button>
        </Modal.Foot>
      </form>
    ),
    [errors, isSubmitting, handleSubmit, onSubmit, register, closeModal, reset],
  );

  const handleOpenModal = () => {
    reset();
    openModal({
      mode: 'normal',
      closeIconButton: false,
      children: modalContent,
    });
  };

  useEffect(() => {
    if (modal.isOpen) {
      // [errors, isSubmitting] 상태가 변경될 때마다 2가지 동작 실행
      // 1. 최신 errors가 반영된 modalContent 리렌더링 (useMemo)
      // 2. openModal을 호출하여 모달의 children 옵션 갱신
      // 이 useEffect를 사용하지 않으면 유효성 검사 에러 피드백이 지연되어 적용됨 (모달을 닫았다가 열어야 에러 메시지 렌더링)
      openModal({
        mode: 'normal',
        closeIconButton: false,
        children: modalContent, // 최신 errors 상태가 반영된 children 전달 -> 에러 ui 즉시 반영
      });
    }
  }, [errors, isSubmitting, openModal, modal.isOpen, modalContent]);

  return (
    <Button
      type='button'
      variant='link'
      className='text-md w-auto p-0 font-normal underline underline-offset-4 hover:font-medium md:text-base'
      onClick={handleOpenModal}
    >
      비밀번호를 잊으셨나요?
    </Button>
  );
}
