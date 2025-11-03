import axiosInstance from '@/lib/axios';
import type {
  ArticleDetailResponse,
  ArticleResponse,
} from '@/types/boardTypes';
import { useQuery } from '@tanstack/react-query';

interface ArticleCardProps {
  article: ArticleResponse;
  showContent?: boolean; // content 표시 여부를 제어
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, image, createdAt, writer, likeCount, commentCount } = article;

  // 각 카드마다 상세 데이터 fetch
  const { data: detail, isPending } = useQuery({
    queryKey: ['article', article.id],
    queryFn: async () => {
      const res = await axiosInstance(`/articles/${article.id}`);
      return res.data as ArticleDetailResponse;
    },
  });

  return (
    <div className='border-border-primary rounded-[20px] border p-4 md:px-6 md:py-5'>
      <div className='left'>
        <h6 className='md:text-2lg text-base font-bold'>{title}</h6>
        <p>{isPending ? <p>내용 불러오는 중...</p> : detail?.content}</p>

        <div className='flex'>
          <b>{writer.nickname}</b>|<span>{createdAt}</span>
        </div>
      </div>

      <div className='right'>
        <figure>
          <img src={image ?? ''} alt='이미지 미리보기' />
        </figure>

        <div className='flex'>
          <span className='flex'>
            좋아요
            {likeCount}개
          </span>
          <span className='flex'>
            댓글
            {commentCount}개
          </span>
        </div>
      </div>
    </div>
  );
}
