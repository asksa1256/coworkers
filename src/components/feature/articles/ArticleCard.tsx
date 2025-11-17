import { boardQueries } from '@/api/queries';
import BestIcon from '@/assets/icons/BestIcon.svg';
import CommentIcon from '@/assets/icons/CommentIcon.svg?react';
import HeartIcon from '@/assets/icons/HeartIcon.svg?react';
import type { ArticleResponse } from '@/types/boardType';
import { formatRelativeTime } from '@/utils/formatters';
import highlightSearchValue from '@/utils/highlightSearchValue';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';

interface ArticleCardProps {
  article: ArticleResponse;
  isBest?: boolean;
}

export default function ArticleCard({
  article,
  isBest = false,
}: ArticleCardProps) {
  const { id, title, image, createdAt, writer, likeCount, commentCount } =
    article;

  // 각 카드마다 상세 데이터 fetch
  const { data, isPending } = useQuery(boardQueries.articleOptions(id));

  // 검색어 강조
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') || '';

  return (
    <Link
      to={`/board/${id}`}
      className='bg-bg-primary border-border-primary flex min-h-[148px] flex-col justify-between rounded-[20px] border p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md md:min-h-[164px] md:px-6 md:py-5'
    >
      <div className='flex items-center justify-between md:gap-6'>
        <div className='w-[60%] grow'>
          {isBest && (
            <span className='bg-bg-secondary text-primary text-md mb-3 inline-flex gap-1 rounded-full px-3 py-[6px] font-bold lg:mb-4'>
              <img src={BestIcon} alt='' />
              인기
            </span>
          )}

          <h6 className='md:text-2lg mb-2 truncate text-base font-bold'>
            {highlightSearchValue(title, searchValue)}
          </h6>
          <p className='text-text-default md:text-md pre-line line-clamp-2 text-sm break-keep'>
            {isPending
              ? '내용 불러오는 중...'
              : highlightSearchValue(data?.content ?? '', searchValue)}
          </p>
        </div>

        <div className='right'>
          {image && (
            <div className='h-18 w-18 overflow-hidden rounded-lg md:h-[76px] md:w-[76px]'>
              <img
                src={image}
                alt='이미지 미리보기'
                className='h-full w-full object-cover'
              />
            </div>
          )}
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div className='flex gap-1 text-sm'>
          <b className='text-text-primary font-medium'>{writer.nickname}</b>
          <span className='text-text-secondary'>|</span>
          <span className='text-text-default'>
            {formatRelativeTime(createdAt)}
          </span>
        </div>

        <div className='text-text-default flex gap-2 text-sm'>
          <span className='flex items-center gap-1'>
            <HeartIcon className='text-text-default h-4 w-4' />
            {likeCount > 99 ? '99+' : likeCount}
          </span>
          <span className='flex items-center gap-1'>
            <CommentIcon className='text-text-default h-4 w-4' />
            {commentCount > 99 ? '99+' : commentCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
