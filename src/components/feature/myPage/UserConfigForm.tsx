import { userMutations } from '@/api/mutations';
import DeleteAccountIcon from '@/assets/icons/DeleteAccountIcon.svg?react';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import PasswordChangeField from '@/components/ui/Input/PasswordChangeField';
import useModal from '@/hooks/useModal';
import useUploadImage from '@/hooks/useUploadImage';
import {
  userConfigSchema,
  type UserConfigSchema,
} from '@/types/userConfigSchema';
import type { UserType } from '@/types/userType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';
import { toast } from 'sonner';
import ResetPasswordForm from '../auth/ResetPasswordForm';
import EditableAvatar from '../profile/EditableAvatar';
import DeleteAccountModal from './DeleteAccountModal';

interface Props {
  userData: UserType;
  onSubmitSuccess: (data: UserConfigSchema) => void;
}

export default function UserConfigForm({ userData, onSubmitSuccess }: Props) {
  const { openModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty, errors, isValid },
  } = useForm<UserConfigSchema>({
    resolver: zodResolver(userConfigSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname: userData.nickname,
      image: userData.image,
    },
  });
  // 미저장 변경내용 경고를 띄웠는지 확인하는 상태
  const [hasWarned, setHasWarned] = useState(false);
  // 변경 내용 저장하지 않았을 때 다른 페이지로 라우팅 방지, 경고를 한 번 보여줬다면 라우팅 허용
  const shouldBlock = isDirty && !hasWarned;
  const blocker = useBlocker(shouldBlock);

  const {
    mutate: updateUserMutate,
    isSuccess,
    isPending,
    variables: requestPayload,
  } = useMutation(userMutations.updateUserMutationOptions());

  const LABEL_STYLE =
    'text-md mb-2 md:mb-3 inline-block font-medium md:text-base';

  const { handleUploadImage } = useUploadImage();
  const imgSrc = watch('image');

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await handleUploadImage(e);
    if (url) {
      setValue('image', url, {
        shouldDirty: true,
      });
    }
  };

  const onSubmit = async (data: UserConfigSchema) => {
    updateUserMutate(data);
  };

  useEffect(() => {
    // 헤더와 유저정보를 받아오는 userAtom 동기화, isDirty와 경고 플래그 초기화
    if (isSuccess) {
      onSubmitSuccess(requestPayload);
      reset(requestPayload);
      setHasWarned(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    // 브라우저의 새로고침, 종료, url 이동 방지
    if (shouldBlock) {
      window.onbeforeunload = e => {
        e.preventDefault();
        // 브라우저 경고 출력시 플래그 활성
        setHasWarned(true);
      };
    }

    // 클라이언트 라우팅 또는 뒤로가기 방지
    if (blocker.state === 'blocked') {
      toast.info('저장하지 않은 변경사항이 있어요!', {
        action: {
          label: '변경사항 저장하기',
          onClick: handleSubmit(onSubmit),
        },
      });

      // 토스트 출력시 플래그 활성
      setHasWarned(true);
      blocker.reset();
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [shouldBlock, blocker.state]);

  return (
    <form
      className='mx-auto w-full max-w-235 rounded-[20px] bg-white px-5 py-12 md:px-14 md:pt-[66px] md:pb-20'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className='mb-8 text-xl font-bold md:mb-10'>계정 설정</h2>

      <div className='mb-3 flex justify-center md:mb-9'>
        <EditableAvatar
          imgSrc={imgSrc || null}
          onImageChange={handleChangeImage}
        />
      </div>

      <div className='mb-9 flex flex-col gap-6 md:mb-10 lg:mb-7'>
        <div>
          <label className={LABEL_STYLE} htmlFor='nickname'>
            이름
          </label>
          <InputField
            id='nickname'
            {...register('nickname')}
            error={errors.nickname}
          />
        </div>

        <div>
          <label className={LABEL_STYLE} htmlFor='email'>
            이메일
          </label>
          <InputField id='email' disabled={true} value={userData.email} />
        </div>

        <div>
          <label className={LABEL_STYLE} htmlFor='passwordPlaceholder'>
            비밀번호
          </label>
          <PasswordChangeField
            id='passwordPlaceholder'
            placeholder='●●●●●●●●'
            onClick={() => {
              openModal({
                children: <ResetPasswordForm />,
                closeIconButton: false,
                className: 'md:w-105',
              });
            }}
          />
        </div>
      </div>

      <Button
        className='text-danger mb-6 flex w-auto items-center gap-2 py-0 font-medium has-[>svg]:px-0 md:mb-8 md:text-base'
        variant='ghost'
        type='button'
        onClick={() => {
          openModal({
            children: <DeleteAccountModal />,
            closeIconButton: false,
          });
        }}
      >
        <DeleteAccountIcon className='svg:size-6' /> 회원 탈퇴하기
      </Button>

      <Button
        className='md:py-4 md:text-lg'
        disabled={!isDirty || !isValid || isPending}
      >
        {isPending ? '저장중...' : '변경사항 저장'}
      </Button>
    </form>
  );
}
