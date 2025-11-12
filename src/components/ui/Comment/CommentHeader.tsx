import { cn } from '@/lib/utils';

interface CommentHeaderProps {
  count: number;
  className?: string;
}

export default function CommentHeader({
  count,
  className,
}: CommentHeaderProps) {
  return (
    <h5 className={cn('md:text-2lg text-md mb-3 font-bold md:mb-4', className)}>
      댓글 <span className='text-primary'>{count}</span>
    </h5>
  );
}
