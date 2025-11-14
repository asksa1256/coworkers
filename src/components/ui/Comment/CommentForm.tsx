import Avatar from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import { userAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';
import InputReply from './InputReply';

interface CommentFormProps {
  className?: string;
  onSubmit: () => void;
}

export default function CommentForm({ className, onSubmit }: CommentFormProps) {
  const user = useAtomValue(userAtom);

  return (
    <form
      onSubmit={onSubmit}
      className={cn('mb-[28px] flex gap-3 md:mb-9 md:gap-4', className)}
    >
      <Avatar size='md' imgSrc={user?.image ?? null} className='mt-3 md:mt-2' />
      <InputReply />
    </form>
  );
}
