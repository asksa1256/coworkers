import { likeMutations } from '@/api/mutations';
import HeartFilledIcon from '@/assets/icons/HeartFilledIcon.svg?react';
import HeartIcon from '@/assets/icons/HeartIcon.svg?react';
import Button from '@/components/ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface Props {
  likeCount: number;
  isLiked: boolean;
}

export default function LikeFloatingButton({ likeCount, isLiked }: Props) {
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
    <div className='relative top-[50px] mt-[250px] hidden flex-col items-center gap-2 lg:sticky lg:flex'>
      <Button
        type='button'
        size='icon-xl'
        variant='ghost'
        round='full'
        className='group bg-bg-primary shadow-sm transition-transform hover:-translate-y-0.5'
        onClick={handleLike}
      >
        {isLiked ? (
          <HeartFilledIcon className='text-primary' />
        ) : (
          <HeartIcon className='text-text-default group-hover:text-primary transition-colors' />
        )}
      </Button>
      <span className='text-text-default'>{displayCount}</span>
    </div>
  );
}
