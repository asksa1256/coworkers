import EmptyContent from '@/components/ui/EmptyContent';
import type { CommentData } from '@/types/commentType';
import type { ReactNode } from 'react';

interface CommentListProps {
  comments: CommentData[];
  // itemActions?: React.ReactNode;
  // itemActions: (commentId: number) => {
  //   dropdown: ReactNode;
  //   editActions: CommentItemProps['actions']; // CommentItemProps의 actions 타입 재사용
  // };
  children: ReactNode;
  className?: string;
}

export default function CommentList({
  comments,
  // itemActions,
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
