import { forwardRef } from 'react';

interface InfiniteScrollObserverProps {
  isLoading: boolean;
  hasNextPage: boolean;
}

function InfiniteScrollObserver(
  { isLoading, hasNextPage }: InfiniteScrollObserverProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      className='text-text-default md:text-md py-10 text-center text-sm'
      ref={ref}
    >
      {isLoading && <p>다음 페이지 불러오는 중...</p>}
      {!hasNextPage && <p>마지막 페이지입니다.</p>}
    </div>
  );
}

export default forwardRef<HTMLDivElement, InfiniteScrollObserverProps>(
  InfiniteScrollObserver,
);
