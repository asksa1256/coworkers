import Avatar from '@/components/ui/Avatar';
import { userAtom } from '@/store/authAtom';
import type { CommentData } from '@/types/commentType';
import { formatRelativeTime } from '@/utils/formatters';
import { useAtomValue } from 'jotai';
import { type ReactNode } from 'react';

interface CommentItemProps {
  comment: CommentData;
  actions?: ReactNode;
}

export function CommentItem({ comment, actions }: CommentItemProps) {
  let author;

  if ('writer' in comment) {
    author = comment.writer;
  } else if ('user' in comment) {
    author = comment.user;
  }

  const user = useAtomValue(userAtom);

  const showActions = author?.id === user?.id;

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

      {showActions && actions}
    </li>
  );
}
