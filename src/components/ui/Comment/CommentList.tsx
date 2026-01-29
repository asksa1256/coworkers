import EmptyContent from '@/components/ui/EmptyContent';
import type { CommentData } from '@/types/commentType';
import type { ReactNode } from 'react';

interface CommentListProps {
  comments: CommentData[];
  children: ReactNode;
  className?: string;
}

export default function CommentList({
  comments,
  children,
  className,
}: CommentListProps) {
  const isEmpty = comments.length === 0;

  if (isEmpty) {
    return (
      <EmptyContent className='[&_img]:w-[200px]'>
        <p className='text-text-default text-md font-medium lg:text-base'>
          아직 작성된 댓글이 없습니다.
        </p>
      </EmptyContent>
    );
  }

  return <div className={className}>{children}</div>;
}
