import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import Modal from '@/components/ui/Modal';
import useModal from '@/hooks/useModal';
import axiosInstance from '@/lib/axios';
import {
  type ResetPasswordData,
  resetPasswordSchema,
} from '@/types/ResetPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export default function ResetPasswordModal() {
  const { openModal, closeModal, modal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
        console.error(error);
      }
    },
    [reset],
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
      closeIconButton: true,
      children: modalContent,
    });
  };

  useEffect(() => {
    if (modal.isOpen) {
      // [errors, isSubmitting] 상태가 변경될 때마다 2가지 동작 실행
      // 1. 최신 errors가 반영된 modalContent 리렌더링 (useMemo)
      // 2. openModal을 호출하여 모달의 children 옵션 갱신
      openModal({
        mode: 'normal',
        closeIconButton: true,
        children: modalContent, // 최신 errors 상태가 반영된 children 전달
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
