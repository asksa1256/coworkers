import { cn } from '@/lib/utils';
import type { CommentData } from '@/types/commentType';
import { type ReactNode } from 'react';
import EmptyContent from '../EmptyContent';
import CommentEmpty from './CommentEmpty';
import CommentForm from './CommentForm';
import CommentHeader from './CommentHeader';
import CommentItem from './CommentItem';
import CommentList from './CommentList';

interface CommentSectionProps {
  comments: CommentData[];
  isPending: boolean;
  status: string;
  error: Error | null;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Comment({
  isPending,
  status,
  error,
  className,
  children,
}: CommentSectionProps) {
  return (
    <div className={cn('mt-4 md:mt-[28px] lg:mt-10', className)}>
      {isPending && <p>불러오는 중...</p>}

      {status === 'error' && (
        <EmptyContent>
          <p className='text-text-default text-md font-medium lg:text-base'>
            {error?.message}
          </p>
        </EmptyContent>
      )}

      {!isPending && status !== 'error' && children}
    </div>
  );
}

Comment.Header = CommentHeader;
Comment.Form = CommentForm;
Comment.List = CommentList;
Comment.Item = CommentItem;
Comment.Empty = CommentEmpty;
