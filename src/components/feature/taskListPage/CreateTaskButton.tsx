import GnbPlusIcon from '@/assets/icons/GnbPlusIcon.svg?react';
import Button from '@/components/ui/Button';

export default function CreateTaskButton() {
  return (
    <>
      <Button
        size='icon-xl'
        round='full'
        className='fixed right-[14px] bottom-5 z-[1] ml-auto flex shadow-[0px_5px_5px_0px_rgba(49,84,153,0.2)] lg:sticky lg:right-auto lg:bottom-2 lg:ml-auto lg:translate-x-[calc(60%+30px)]'
      >
        <GnbPlusIcon className='size-6 brightness-0 invert-100' />
      </Button>
    </>
  );
}
