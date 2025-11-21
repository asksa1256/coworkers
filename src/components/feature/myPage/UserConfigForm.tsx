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
import type React from 'react';
import { useForm } from 'react-hook-form';
import ResetPasswordForm from '../auth/ResetPasswordForm';
import EditableAvatar from '../profile/EditableAvatar';
import DeleteAccountModal from './DeleteAccountModal';

interface Props {
  userData: UserType;
  onSubmitSuccess: (data: UserType) => void;
}

export default function UserConfigForm({ userData }: Props) {
  const { openModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, isSubmitting, errors, isValid },
  } = useForm<UserConfigSchema>({
    resolver: zodResolver(userConfigSchema),
    defaultValues: {
      nickname: userData.nickname,
      image: userData.image,
    },
  });
  const { handleUploadImage } = useUploadImage();

  const LABEL_STYLE =
    'text-md mb-2 md:mb-3 inline-block font-medium md:text-base';

  const imgSrc = watch('image');

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await handleUploadImage(e);
    if (url) {
      setValue('image', url, {
        shouldDirty: true,
      });
    }
  };

  return (
    <form className='mx-auto w-full max-w-235 rounded-[20px] bg-white px-5 py-12 md:px-14 md:pt-[66px] md:pb-20'>
      <h2 className='mb-8 text-xl font-bold md:mb-10'>계정 설정</h2>

      <div className='mb-3 flex justify-center md:mb-9'>
        <EditableAvatar imgSrc={imgSrc} onImageChange={handleChangeImage} />
      </div>

      <div className='mb-9 flex flex-col gap-6 md:mb-10 lg:mb-7'>
        <div>
          <label className={LABEL_STYLE} htmlFor='nickname'>
            이름
          </label>
          <InputField id='nickname' {...register('nickname')} />
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

      <Button className='md:py-4 md:text-lg' disabled={!isDirty}>
        변경사항 저장
      </Button>
    </form>
  );
}
