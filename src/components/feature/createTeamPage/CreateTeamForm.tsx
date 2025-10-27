import EditableAvatar from '@/components/feature/profile/EditableAvatar';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

export default function CreateTeamForm() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const handleChangeFile = (file: File) => {
    console.log(file);
  };

  return (
    <div className='my-5 flex grow-1 flex-col justify-center md:my-10'>
      <form className='bg-bg-primary mx-auto w-full max-w-[550px] rounded-[20px] px-5 pt-[52px] pb-[75px] md:px-[45px] md:pt-[60px] md:pb-[65px]'>
        <h2 className='text-xl font-bold md:text-2xl'>팀 생성하기</h2>
        <EditableAvatar
          imgSrc={imgSrc}
          onImageChange={handleChangeFile}
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
          />
        </div>

        <Button type='submit' className='mt-10 text-base'>
          생성하기
        </Button>
        <p className='text-text-default mt-5 text-center text-xs md:mt-6 md:text-base'>
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </form>
    </div>
  );
}
