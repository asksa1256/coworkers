import HeartIcon from '@/assets/icons/HeartIcon.svg?react';
import Button from '@/components/ui/Button';

interface LikeButtonProps {
  likeCount: number;
}

export default function LikeButton({ likeCount }: LikeButtonProps) {
  return (
    <div className='flex items-center justify-end gap-1 md:gap-2 lg:hidden'>
      <Button
        type='button'
        size='icon-sm'
        variant='ghost'
        className='bg-transparent [&_svg]:!size-4 md:[&_svg]:!size-6'
      >
        <HeartIcon className='text-text-default h-4 w-4 md:h-6 md:w-6' />
      </Button>
      <span className='text-text-default text-md md:text-base'>
        {likeCount > 99 ? '99+' : likeCount}
      </span>
    </div>
  );
}
