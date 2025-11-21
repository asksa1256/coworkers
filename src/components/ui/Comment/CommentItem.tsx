import Avatar from '@/components/ui/Avatar';
import { userAtom } from '@/store/authAtom';
import type { CommentAuthor, CommentData } from '@/types/commentType';
import { formatRelativeTime } from '@/utils/formatters';
import { useAtomValue } from 'jotai';
import { type ReactNode } from 'react';

export interface CommentItemProps {
  comment: CommentData;
  author: CommentAuthor;
  children: ReactNode;
}

export default function CommentItem({
  comment,
  author,
  children,
}: CommentItemProps) {
  const user = useAtomValue(userAtom);
  const showActions = author?.id === user?.id;

  return (
    <li className='border-border-primary flex items-start gap-2 border-t py-3 md:gap-4 md:py-5'>
      <Avatar size='md' imgSrc={author?.image ?? null} />

      <div className='md:text-md w-full text-xs'>
        <span className='mb-[6px] inline-block font-bold'>
          {author?.nickname}
        </span>
        <p className='mb-1 whitespace-pre-wrap'>{comment.content}</p>
        <span className='text-text-default'>
          {formatRelativeTime(comment.createdAt)}
        </span>
      </div>

      {/* 수정/삭제 드롭다운 */}
      {showActions && children}
    </li>
  );
}
