import Button from '@/components/ui/Button';
import EmptyContent from '@/components/ui/EmptyContent';
import { useInView } from '@/hooks/useInView';
import axiosInstance from '@/lib/axios';
import { type ArticleListResponse } from '@/types/boardTypes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function ArticleList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    error,
  } = useInfiniteQuery<ArticleListResponse>({
    queryKey: ['articles'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance(`/articles?page=${pageParam}`);
      return res.data as ArticleListResponse;
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.flatMap(p => p.list).length;
      return loadedCount < lastPage.totalCount
        ? allPages.length + 1 // nextPage
        : undefined; // nextPage 없음
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

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

  if (data.pages.length === 0)
    return (
      <EmptyContent>
        <p className='text-text-default text-md font-medium lg:text-base'>
          아직 작성된 글이 없습니다.
        </p>
        <Button size='lg' className='w-auto'>
          글 작성하기
        </Button>
      </EmptyContent>
    );

  return (
    <>
      <ol>
        {data.pages.flatMap(page =>
          page.list.map(a => <li key={a.id}>{a.title}</li>),
        )}
      </ol>
      <div ref={ref} />
      {isFetchingNextPage && <p>다음 페이지 불러오는 중...</p>}
    </>
  );
}
