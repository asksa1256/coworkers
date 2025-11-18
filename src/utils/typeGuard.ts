import type { CommentAuthor, CommentData } from '@/types/commentType';

export const getCommentAuthor = (comment: CommentData): CommentAuthor => {
  if ('writer' in comment) {
    return comment.writer;
  }

  return comment.user;
};
