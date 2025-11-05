import { boardQueries } from '@/api/queries';
import TriangleDownIcon from '@/assets/icons/TriangleDownIcon.svg?react';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import EmptyContent from '@/components/ui/EmptyContent';
import InfiniteScrollObserver from '@/components/ui/InfiniteScrollObserver';
import { ARTICLE_SORT_LIST } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';

export default function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || ARTICLE_SORT_LIST[0].value;
  const searchValue = searchParams.get('q') || '';
  const scrollRef = useRef(null);

  const handleChangeSort = (value: string) => {
    setSearchParams({ sort: value, q: searchValue }); // 정렬 + 검색어 필터 동시 적용
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    error,
  } = useInfiniteQuery(boardQueries.articlesOptions(sort));

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

  const isEmpty = data.pages[0].totalCount === 0;
  const isSearching = searchValue !== '';

  if (isEmpty) {
    return (
      <EmptyContent>
        <p className='text-text-default text-md font-medium lg:text-base'>
          {isSearching ? '검색 결과가 없습니다.' : '아직 작성된 글이 없습니다.'}
        </p>

        {!isSearching ? (
          <Button size='lg' className='w-auto'>
            글 작성하기
          </Button>
        ) : (
          <Button
            size='lg'
            className='w-auto'
            onClick={() => {
              searchParams.delete('q');
              setSearchParams(searchParams);
            }}
          >
            돌아가기
          </Button>
        )}
      </EmptyContent>
    );
  }

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
