import type {
  ArticleComment,
  NormalizedComment,
  TaskComment,
} from '@/types/commentType';

export function normalizeArticleComment(
  comment: ArticleComment,
): NormalizedComment {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    author: comment.writer,
  };
}

export function normalizeTaskComment(comment: TaskComment): NormalizedComment {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    author: comment.user,
  };
}
