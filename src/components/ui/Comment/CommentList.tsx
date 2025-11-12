import EmptyContent from '@/components/ui/EmptyContent';
import InfiniteScrollObserver from '@/components/ui/InfiniteScrollObserver';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { useCommentContext } from './CommentContext';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  itemActions?: React.ReactNode;
}

export default function CommentList({ itemActions }: CommentListProps) {
  const { comments, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCommentContext();

  const scrollRef = useRef(null);

  useIntersectionObserver({
    target: scrollRef,
    onIntersect: fetchNextPage || (() => {}),
    enabled: !!hasNextPage,
  });

  const isEmpty = comments.length === 0;

  if (isEmpty) {
    return (
      <EmptyContent className='[&_img]:w-[200px]'>
        <p className='text-text-default text-md font-medium lg:text-base'>
          아직 작성된 댓글이 없습니다.
        </p>
      </EmptyContent>
    );
  }

  return (
    <>
      <ol>
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            actions={itemActions}
          />
        ))}
      </ol>

      {/* 무한 스크롤 사용 시에만 렌더링 */}
      {hasNextPage && (
        <InfiniteScrollObserver
          ref={scrollRef}
          isLoading={!!isFetchingNextPage}
          hasNextPage={!!hasNextPage}
        />
      )}
    </>
  );
}
