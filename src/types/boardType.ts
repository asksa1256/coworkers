interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}

export interface ArticleResponse {
  id: number;
  title: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  likeCount: number;
  commentCount: number;
}

export interface ArticleDetailResponse extends ArticleResponse {
  content: string;
  isLiked: boolean;
}

export interface ArticleListResponse {
  list: ArticleResponse[];
  totalCount: number;
}

export type ArticleCard = ArticleResponse & {
  content: string;
  isLiked?: boolean; // 상세 페이지에서만 필요
};

export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface ArticleCommentsResponse {
  list: CommentResponse[];
  nextCursor: number | null;
}
