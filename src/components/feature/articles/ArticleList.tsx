import TriangleDownIcon from '@/assets/icons/TriangleDownIcon.svg?react';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import EmptyContent from '@/components/ui/EmptyContent';
import InfiniteScrollObserver from '@/components/ui/InfiniteScrollObserver';
import { ARTICLE_SORT_LIST } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import axiosInstance from '@/lib/axios';
import { type ArticleListResponse } from '@/types/boardTypes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';

export default function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || ARTICLE_SORT_LIST[0].value;
  const scrollRef = useRef(null);

  const handleChangeSort = (value: string) => {
    setSearchParams({ sort: value });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    error,
  } = useInfiniteQuery<ArticleListResponse>({
    queryKey: ['articles', sort],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance(
        `/articles?page=${pageParam}&orderBy=${sort}`,
      );
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
      <div className='mb-5 flex items-center justify-between'>
        <h3 className='text-2lg font-bold md:text-xl'>전체</h3>
        <Dropdown
          type='select'
          value={sort}
          suffix={<TriangleDownIcon />}
          menuItems={ARTICLE_SORT_LIST}
          onSelect={handleChangeSort}
        />
      </div>

      <ol className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {data.pages.flatMap(page =>
          page.list.map(article => (
            <ArticleCard key={article.id} article={article} />
          )),
        )}
      </ol>

      <InfiniteScrollObserver
        ref={scrollRef}
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
