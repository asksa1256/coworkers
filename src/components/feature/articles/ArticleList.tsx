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
  const searchRange = searchParams.get('search_range') || '';
  const scrollRef = useRef(null);

  const handleChangeSort = (value: string) => {
    setSearchParams(prevParams => ({
      ...Object.fromEntries(prevParams),
      sort: value,
      q: searchValue,
    })); // 정렬 + 검색어 필터 동시 적용
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    error,
  } = useInfiniteQuery(boardQueries.articlesOptions(sort, searchValue));

  const allData = data?.pages.flatMap(page => page.list);

  const filteredData = allData?.filter(data => {
    if (!searchValue) {
      return true; // 검색어 없음: 전체 데이터 리턴
    }

    if (searchRange === 'title') {
      return data.title.includes(searchValue); // 검색 범위가 '제목'일 경우, 제목에만 검색어가 포함된 게시글 리턴
    }

    return true; // 검색어가 있고, 검색 범위가 '제목'이 아닐 경우, 제목이나 내용에 검색어가 포함된 게시글 리턴
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

  const isEmpty = filteredData?.length === 0;
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
              setSearchParams(prevParams => {
                const newParams = new URLSearchParams(prevParams.toString());
                newParams.delete('q');
                return newParams;
              });
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
        {filteredData?.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ol>

      <InfiniteScrollObserver
        ref={scrollRef}
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
