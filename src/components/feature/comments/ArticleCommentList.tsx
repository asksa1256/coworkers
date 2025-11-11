import { boardQueries } from '@/api/queries';
import Avatar from '@/components/ui/Avatar';
import EmptyContent from '@/components/ui/EmptyContent';
import InfiniteScrollObserver from '@/components/ui/InfiniteScrollObserver';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { userAtom } from '@/store/authAtom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import CommentCard from './CommentCard';
import InputReply from './InputReply';

interface Props {
  articleId: number;
  commentCount: number;
}

export default function ArticleCommentList({ articleId, commentCount }: Props) {
  const user = useAtomValue(userAtom);
  const scrollRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    error,
  } = useInfiniteQuery(boardQueries.commentsOptions(articleId));

  const allData = data?.pages.flatMap(page => page.list);

  useIntersectionObserver({
    target: scrollRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (status === 'error')
    return (
      <EmptyContent>
        <p className='text-text-default text-md font-medium lg:text-base'>
          {error.message}
        </p>
      </EmptyContent>
    );

  if (isPending) {
    return <p>불러오는 중...</p>;
  }

  const isEmpty = allData?.length === 0;

  if (!allData) return;

  return (
    <div className='mt-4 md:mt-[28px] lg:mt-10'>
      <h5 className='md:text-2lg text-md mb-3 font-bold md:mb-4'>
        댓글 <span className='text-primary'>{commentCount}</span>
      </h5>

      <div className='mb-[28px] flex gap-3 md:mb-9 md:gap-4'>
        <Avatar size='md' imgSrc={user!.image} className='mt-3 md:mt-2' />
        <InputReply />
      </div>

      {isEmpty ? (
        <EmptyContent className='[&_img]:w-[200px]'>
          <p className='text-text-default text-md font-medium lg:text-base'>
            아직 작성된 댓글이 없습니다.
          </p>
        </EmptyContent>
      ) : (
        <>
          <ol>
            {allData?.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </ol>

          <InfiniteScrollObserver
            ref={scrollRef}
            isLoading={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </div>
  );
}
