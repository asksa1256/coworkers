import { cn } from '@/lib/utils';
import type { NormalizedComment } from '@/types/commentType';
import EmptyContent from '../EmptyContent';
import CommentEmpty from './CommentEmpty';
import CommentForm from './CommentForm';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';

interface CommentSectionProps {
  comments: NormalizedComment[];
  commentCount: number;
  isPending: boolean;
  status: string;
  error: Error | null;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  className?: string;
}

export default function Comment({
  commentCount,
  comments,
  isPending,
  status,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  className,
}: CommentSectionProps) {
  const isEmpty = comments.length === 0;

  return (
    <div className={cn('mt-4 md:mt-[28px] lg:mt-10', className)}>
      <CommentHeader count={commentCount} />

      {/* <CommentForm onSubmit={onSubmit} /> */}

      {isPending && <p>불러오는 중...</p>}

      {status === 'error' && (
        <EmptyContent>
          <p className='text-text-default text-md font-medium lg:text-base'>
            {error?.message}
          </p>
        </EmptyContent>
      )}

      {isEmpty ? (
        <CommentEmpty />
      ) : (
        <CommentList
          comments={comments}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}

Comment.Header = CommentHeader;
Comment.Form = CommentForm;
Comment.List = CommentList;
Comment.Empty = CommentEmpty;
