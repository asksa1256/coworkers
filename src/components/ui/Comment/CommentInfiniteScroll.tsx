import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import InfiniteScrollObserver from '../InfiniteScrollObserver';

interface CommentInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function CommentInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CommentInfiniteScrollProps) {
  const scrollRef = useRef(null);

  useIntersectionObserver({
    target: scrollRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (!hasNextPage) return null;

  return (
    <InfiniteScrollObserver
      ref={scrollRef}
      isLoading={isFetchingNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
