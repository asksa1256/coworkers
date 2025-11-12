import type { CommentData } from '@/types/commentType';
import { createContext, useContext } from 'react';

interface CommentContextValue {
  comments: CommentData[]; // ArticleComment[] | TaskComment[]
  isPending: boolean;
  status: string;
  error: Error | null;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  className?: string;
}

export const CommentContext = createContext<CommentContextValue | null>(null);

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error(
      'useCommentContext는 Comment 컴포넌트 내부에서 사용되어야 합니다.',
    );
  }
  return context;
};
