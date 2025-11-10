import { likeMutations } from '@/api/mutations';
import HeartFilledIcon from '@/assets/icons/HeartFilledIcon.svg?react';
import HeartSmallIcon from '@/assets/icons/HeartSmallIcon.svg?react';
import Button from '@/components/ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface LikeButtonProps {
  likeCount: number;
  isLiked: boolean;
}

export default function LikeButton({ likeCount, isLiked }: LikeButtonProps) {
  const queryClient = useQueryClient();
  const { articleId } = useParams();

  const { mutate: likeMutate } = useMutation(
    likeMutations.likeMutationOptions({
      articleId: Number(articleId),
      queryClient,
    }),
  );

  const { mutate: unlikeMutate } = useMutation(
    likeMutations.unlikeMutationOptions({
      articleId: Number(articleId),
      queryClient,
    }),
  );

  const handleLike = () => {
    if (isLiked) {
      unlikeMutate(Number(articleId));
    } else {
      likeMutate(Number(articleId));
    }
  };

  const displayCount = likeCount > 99 ? '99+' : likeCount;

  return (
    <div className='flex items-center justify-end gap-1 md:gap-2 lg:hidden'>
      <Button
        type='button'
        size='icon-sm'
        variant='ghost'
        className='group bg-transparent [&_svg]:!size-4 md:[&_svg]:!size-6'
        onClick={handleLike}
      >
        {isLiked ? (
          <HeartFilledIcon className='text-primary' />
        ) : (
          <HeartSmallIcon className='text-text-default group-hover:text-primary transition-colors' />
        )}
      </Button>
      <span className='text-text-default text-md md:text-base'>
        {displayCount}
      </span>
    </div>
  );
}
