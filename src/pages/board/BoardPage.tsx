import PencilIcon from '@/assets/icons/PencilIcon.svg?react';
import ArticleList from '@/components/feature/articles/ArticleList';
import BestArticleList from '@/components/feature/articles/BestArticleList';
import SearchField from '@/components/feature/search/SearchField';
import Button from '@/components/ui/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BoardPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q');
  const navigate = useNavigate();

  return (
    <div className='bg-bg-primary view-white w-full pt-6 pb-10 md:pt-[77px] lg:mx-auto lg:pt-[87px]'>
      <div className='mb-5 flex flex-col gap-5 md:mb-[30px] md:flex-row md:items-center md:justify-between'>
        <h2 className='shrink-0 text-xl font-bold md:text-2xl'>자유게시판</h2>

        <div className='flex items-center gap-2 md:gap-4'>
          <SearchField className='w-full shrink' />
        </div>
      </div>

      {/* 베스트 게시글은 검색 결과에서 제외 */}
      {!keyword && <BestArticleList />}

      <ArticleList />

      <Button
        size='icon-lg'
        round='full'
        title='글 작성하기'
        className='fixed right-10 bottom-10 z-10 h-14 w-14 shadow-lg lg:right-[76px] lg:bottom-10 xl:right-[5%] 2xl:right-[10%] [&_svg]:!size-5'
        onClick={() => navigate('/board/post')}
      >
        <PencilIcon />
      </Button>
    </div>
  );
}
