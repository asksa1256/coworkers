import CustomCheckIcon from '@/assets/icons/CustomCheckIcon.svg?react';
import { cn } from '@/lib/utils';

interface Props {
  isCheck: boolean;
  onChangeDone: () => void;
}

export default function TaskDetailDone({ isCheck, onChangeDone }: Props) {
  return (
    <label
      className={cn(
        'fixed right-5 bottom-[30px] md:static',
        'border-primary text-md inline-flex h-10 cursor-pointer items-center gap-1 rounded-full border pr-5 pl-4 font-semibold shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)]',
        isCheck ? 'text-primary' : 'text-text-inverse bg-primary',
      )}
    >
      <input
        type='checkbox'
        className='hidden'
        checked={isCheck}
        onChange={onChangeDone}
      />
      <CustomCheckIcon
        className={cn(
          'size-4',
          isCheck ? 'text-icon-brand' : 'text-text-inverse',
        )}
      />
      {isCheck ? '완료 취소하기' : '완료하기'}
    </label>
  );
}
