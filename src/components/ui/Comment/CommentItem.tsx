import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import Dropdown from '@/components/ui/Dropdown';
import { MODIFY_DELETE_DROPDOWN_MAP } from '@/constants';
import { userAtom } from '@/store/authAtom';
import { formatRelativeTime } from '@/utils/formatters';
import { useAtomValue } from 'jotai';

interface CommentItemProps {
  comment: {
    id: number;
    writer?: { id: number; nickname: string; image: string };
    user?: { id: number; nickname: string; image: string };
    content: string;
    createdAt: string;
  };
}

export function CommentItem({ comment }: CommentItemProps) {
  const author = comment.writer ?? comment.user;
  const user = useAtomValue(userAtom);

  return (
    <li className='border-border-primary flex items-start gap-2 border-t py-3 md:gap-4 md:py-5'>
      <Avatar size='md' imgSrc={author?.image ?? null} />
      <div className='md:text-md w-full text-xs'>
        <span className='mb-[6px] font-bold'>{author?.nickname}</span>
        <p className='mb-1'>{comment.content}</p>
        <span className='text-text-default'>
          {formatRelativeTime(comment.createdAt)}
        </span>
      </div>

      {author?.id === user?.id && (
        <Dropdown
          type='icon'
          menuItems={MODIFY_DELETE_DROPDOWN_MAP}
          triggerChildren={<KebabIcon className='h-5 w-5' />}
          align='end'
          className='text-center'
        />
      )}
    </li>
  );
}
