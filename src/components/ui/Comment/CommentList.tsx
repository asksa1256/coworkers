import EmptyContent from '@/components/ui/EmptyContent';
import InfiniteScrollObserver from '@/components/ui/InfiniteScrollObserver';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import type { NormalizedComment } from '@/types/commentType';
import { useRef } from 'react';
import { CommentItem } from './CommentItem';

interface Props {
  comments: NormalizedComment[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function CommentList({
  comments,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
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
          <CommentItem key={comment.id} comment={comment} />
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
