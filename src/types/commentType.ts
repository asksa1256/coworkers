import type { Writer } from './boardType';
import type { UserType } from './userType';

// 공통 필드
export interface CommentBaseResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 공통 핸들러
export interface CommentHandlers {
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleSubmit: (content: string) => void;
}

interface ArticleCommentResponse extends CommentBaseResponse {
  writer: Writer;
}

export interface ArticleCommentsResponse {
  list: ArticleCommentResponse[];
  nextCursor: number | null;
}

export interface TaskCommentResponse extends CommentBaseResponse {
  userId: number; // user.id와 동일?
  taskId: number;
  user: Pick<UserType, 'id' | 'image' | 'nickname'>;
}

/* CommentAuthor(user/writer) 관련 타입: 요청/응답 데이터가 아니라서 접미사를 붙이지 않았습니다. */
export interface CommentAuthor {
  id: number;
  nickname: string;
  image: string;
}

export interface NormalizedComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
}

export interface ArticleComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: CommentAuthor;
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
