import CommentIcon from '@/assets/icons/CommentIcon.svg?react';
import HeartIcon from '@/assets/icons/HeartIcon.svg?react';
import axiosInstance from '@/lib/axios';
import type {
  ArticleDetailResponse,
  ArticleResponse,
} from '@/types/boardTypes';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: ArticleResponse;
  showContent?: boolean; // content 표시 여부를 제어
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { id, title, image, createdAt, writer, likeCount, commentCount } =
    article;

  // 각 카드마다 상세 데이터 fetch
  const { data: detail, isPending } = useQuery({
    queryKey: ['article', article.id],
    queryFn: async () => {
      const res = await axiosInstance(`/articles/${article.id}`);
      return res.data as ArticleDetailResponse;
    },
  });

  return (
    <Link
      to={`/board/${id}`}
      className='border-border-primary flex flex-col justify-between rounded-[20px] border p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md md:px-6 md:py-5'
    >
      <div className='flex items-center justify-between md:gap-6'>
        <div className='w-[60%]'>
          <h6 className='md:text-2lg mb-2 text-base font-bold'>{title}</h6>
          <p className='text-text-default md:text-md pre-line line-clamp-2 text-sm break-keep'>
            {isPending ? '내용 불러오는 중...' : detail?.content}
          </p>
        </div>

        <div className='right'>
          {image && (
            <figure className='h-20 w-20 overflow-hidden rounded-lg md:h-[88px] md:w-[88px]'>
              <img src={image} alt='이미지 미리보기' />
            </figure>
          )}
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div className='flex gap-1 text-sm'>
          <b className='text-text-primary font-medium'>{writer.nickname}</b>
          <span className='text-text-secondary'>|</span>
          <span className='text-text-default'>{createdAt}</span>
        </div>

        <div className='text-text-default flex gap-2 text-sm'>
          <span className='flex items-center gap-1'>
            <HeartIcon className='text-text-default h-4 w-4' />
            {likeCount}
          </span>
          <span className='flex items-center gap-1'>
            <CommentIcon className='text-text-default h-4 w-4' />
            {commentCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
