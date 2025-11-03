interface Writer {
  id: number;
  nickname: string;
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

export interface ArticleListResponse {
  list: ArticleResponse[];
  totalCount: number;
}
