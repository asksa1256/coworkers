import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import Button from '@/components/ui/Button';

export default function CreateTaskGroupListButton() {
  return (
    <Button
      className='bg-bg-primary h-10 w-[108px] gap-1 font-semibold shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)] lg:mx-auto lg:mt-[34px] lg:flex'
      variant='outline'
      round='full'
    >
      <GnbPlusIcon /> 목록 추가
    </Button>
  );
}
