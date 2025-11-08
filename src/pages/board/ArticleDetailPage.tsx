import { boardQueries } from '@/api/queries';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import LikeButton from '@/components/feature/like/LikeButton';
import LikeFloatingButton from '@/components/feature/like/LikeFloatingButton';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { Spinner } from '@/components/ui/spinner';
import { formatRelativeTime } from '@/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function ArticleDetailPage() {
  const { articleId } = useParams();
  const { data, isPending } = useQuery(
    boardQueries.articleOptions(Number(articleId)),
  );

  if (!data) return;

  if (isPending)
    return (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Spinner />
        불러오는 중...
      </div>
    );

  return (
    <article className='lg:mx-auto lg:flex lg:gap-[26px]'>
      <div className='bg-bg-primary relative mt-4 w-full max-w-280 rounded-[20px] px-[22px] py-10 shadow-sm md:mt-[68px] md:px-10 md:pt-[54px] md:pb-[120px] lg:px-[60px] lg:py-[88px]'>
        <div className='border-border-primary flex flex-col gap-4 border-b pb-3'>
          <div className='flex items-center justify-between'>
            <h4 className='text-2lg font-bold md:text-xl'>{data.title}</h4>
            <Button
              type='button'
              size='icon-md'
              variant='ghost'
              round='sm'
              className='[&_svg]:!size-6'
            >
              <KebabIcon />
            </Button>
          </div>

          <div className='md:text-md flex items-center gap-2 text-xs'>
            <Avatar size='sm' imgSrc={null} />
            <span className='font-medium'>{data.writer.nickname}</span>|
            <span className='text-text-default font-medium'>
              {formatRelativeTime(data.createdAt)}
            </span>
          </div>
        </div>

        <div className='mt-4 md:mt-[28px]'>
          <p className='text-md mb-5 md:mb-6 md:text-base'>{data.content}</p>
          {data.image && (
            <div className='aspect-square w-[140px] overflow-hidden rounded-xl md:w-[200px]'>
              <img src={data.image} alt='' />
            </div>
          )}

          {/* 좋아요 버튼 (mobile ~ tablet: 컨텐츠 내부) */}
          <LikeButton likeCount={data.likeCount} />
        </div>
      </div>

      {/* 좋아요 버튼 (desktop: floating) */}
      <LikeFloatingButton likeCount={data.likeCount} />
    </article>
  );
}
