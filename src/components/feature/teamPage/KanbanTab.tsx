import PlusIcon from '@/assets/icons/PlusIcon.svg?react';
import Button from '@/components/ui/Button';

interface Props {
  title: string;
  onClick?: () => void;
}

export default function KanbanTab({ title, onClick }: Props) {
  return (
    <div className='bg-bg-tertiary text-md mb-3 flex w-full justify-between rounded-xl py-[10px] pr-2 pl-5 font-medium lg:mb-5'>
      <h3>{title}</h3>

      {title === '할 일' && (
        <Button
          className='bg-bg-primary hover:border-unset hover:bg-unset focus:border-unset border-icon-secondary hover:brightness-95 focus:brightness-90'
          variant='outline'
          size='icon-md'
          round='sm'
          onClick={onClick}
        >
          <PlusIcon />
        </Button>
      )}
    </div>
  );
}
