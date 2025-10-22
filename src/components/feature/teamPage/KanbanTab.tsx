import PlusIcon from '@/assets/icons/PlusIcon.svg?react';
import Button from '@/components/ui/Button';

interface Props {
  title: string;
}

export default function KanbanTab({ title }: Props) {
  return (
    <div className='bg-bg-tertiary text-md flex w-full justify-between rounded-xl py-[10px] pr-2 pl-5 font-medium lg:mb-3'>
      <h3>{title}</h3>
      <Button
        className='border-icon-primary bg-bg-primary hover:border-unset hover:bg-unset focus:border-unset hover:brightness-95 focus:brightness-90'
        variant='outline'
        size='icon-md'
        round='sm'
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
