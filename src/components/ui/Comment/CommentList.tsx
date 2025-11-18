import EmptyContent from '@/components/ui/EmptyContent';
import type { CommentData } from '@/types/commentType';
import { getCommentAuthor } from '@/utils/typeGuard';
import type { ReactNode } from 'react';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: CommentData[];
  itemActions?: React.ReactNode;
  children: ReactNode;
  className?: string;
}

export default function CommentList({
  comments,
  itemActions,
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

  return (
    <div className={className}>
      <ol>
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            author={getCommentAuthor(comment)}
            actions={itemActions}
          />
        ))}
      </ol>

      {/* 무한 스크롤 요소 등 추가 컴포넌트 */}
      {children}
    </div>
  );
}
