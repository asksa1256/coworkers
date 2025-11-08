import HeartIcon from '@/assets/icons/HeartIcon.svg?react';
import Button from '@/components/ui/Button';

interface LikeButtonProps {
  likeCount: number;
}

export default function LikeButton({ likeCount }: LikeButtonProps) {
  return (
    <div className='flex items-center justify-end gap-1 lg:hidden'>
      <Button
        type='button'
        size='icon-sm'
        variant='ghost'
        className='bg-transparent [&_svg]:!size-6'
      >
        <HeartIcon />
      </Button>
      <span className='text-text-default'>
        {likeCount > 99 ? '99+' : likeCount}
      </span>
    </div>
  );
}
