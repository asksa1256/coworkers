import HeartFilledIcon from '@/assets/icons/HeartFilledIcon.svg?react';
import HeartSmallIcon from '@/assets/icons/HeartSmallIcon.svg?react';
import Button from '@/components/ui/Button';
import { useState } from 'react';

interface LikeButtonProps {
  likeCount: number;
}

export default function LikeButton({ likeCount }: LikeButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleLike = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div className='flex items-center justify-end gap-1 md:gap-2 lg:hidden'>
      <Button
        type='button'
        size='icon-sm'
        variant='ghost'
        className='group bg-transparent [&_svg]:!size-4 md:[&_svg]:!size-6'
        onClick={handleLike}
      >
        {isActive ? (
          <HeartFilledIcon className='text-primary' />
        ) : (
          <HeartSmallIcon className='text-text-default group-hover:text-primary transition-colors' />
        )}
      </Button>
      <span className='text-text-default text-md md:text-base'>
        {likeCount > 99 ? '99+' : likeCount}
      </span>
    </div>
  );
}
