import type { UserType } from './userType';

// 공통 필드
export interface CommentBaseResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// CommentAuthor(user/writer) 관련 타입: 요청/응답 데이터가 아니라서 접미사를 붙이지 않았습니다.
export interface CommentAuthor {
  id: number;
  nickname: string;
  image: string | null;
}

export interface ArticleCommentResponse extends CommentBaseResponse {
  writer: CommentAuthor;
}

export interface ArticleCommentsResponse {
  list: ArticleCommentResponse[];
  nextCursor: number | null;
}

export interface TaskCommentResponse extends CommentBaseResponse {
  taskId: number;
  user: Pick<UserType, 'id' | 'image' | 'nickname'>;
}

export interface TaskComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  taskId: number;
  user: CommentAuthor;
}

export type CommentData = ArticleCommentResponse | TaskComment;
