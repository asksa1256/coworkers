import { cn } from '@/lib/utils';
import type { NormalizedComment } from '@/types/commentType';
import { type ReactNode } from 'react';
import EmptyContent from '../EmptyContent';
import { CommentContext } from './CommentContext';
import CommentEmpty from './CommentEmpty';
import CommentForm from './CommentForm';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';

interface CommentSectionProps {
  comments: NormalizedComment[];
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
  comments,
  isPending,
  status,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  className,
  children,
}: CommentSectionProps) {
  const contextValue = {
    comments,
    isPending,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };

  return (
    <CommentContext.Provider value={contextValue}>
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
    </CommentContext.Provider>
  );
}

Comment.Header = CommentHeader;
Comment.Form = CommentForm;
Comment.List = CommentList;
Comment.Empty = CommentEmpty;
