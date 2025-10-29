import EditableAvatar from '@/components/feature/profile/EditableAvatar';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import useUploadImage from '@/hooks/useUploadImage';
import { Label } from '@radix-ui/react-label';
import type { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

export interface TeamFormDataType {
  image?: string | null;
  name: string;
}

interface Props {
  initialData?: TeamFormDataType;
  onSubmit: (formData: TeamFormDataType) => void;
}

export default function TeamForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<TeamFormDataType>({
    mode: 'onChange',
    defaultValues: {
      image: initialData?.image || null,
      name: initialData?.name || '',
    },
  });
  const { handleUploadImage } = useUploadImage();

  const imgSrc = watch('image');
  const isEditMode = !!initialData;

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = await handleUploadImage(e);
    if (url) {
      setValue('image', url, {
        shouldDirty: true,
      });
    }
  };

  const handleSubmitForm = (formData: TeamFormDataType) => {
    if (imgSrc === null) delete formData.image;

    onSubmit(formData);
  };

  return (
    <div className='my-5 flex grow-1 flex-col justify-center md:my-10'>
      <form
        className='bg-bg-primary mx-auto w-full max-w-[550px] rounded-[20px] px-5 pt-[52px] pb-[75px] md:px-[45px] md:pt-[60px] md:pb-[65px]'
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <h2 className='text-xl font-bold md:text-2xl'>
          {isEditMode ? '팀 수정하기' : '팀 생성하기'}
        </h2>
        <EditableAvatar
          imgSrc={imgSrc || null}
          onImageChange={handleChangeImage}
          className='mx-auto mt-9'
        />
        <div className='mt-[22px] md:mt-12'>
          <Label
            htmlFor='name'
            className='text-md mb-2 block font-medium md:text-base'
          >
            팀 이름
          </Label>
          <InputField
            id='name'
            type='text'
            placeholder='팀 이름을 입력해주세요.'
            {...register('name', {
              required: '팀 이름을 입력해주세요.',
            })}
            error={errors.name}
          />
        </div>

        <Button
          type='submit'
          className='mt-10 text-base'
          disabled={!isValid || isSubmitting || !isDirty}
        >
          {isEditMode ? '수정하기' : '생성하기'}
        </Button>
        <p className='text-text-default mt-5 text-center text-xs md:mt-6 md:text-base'>
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </form>
    </div>
  );
}
