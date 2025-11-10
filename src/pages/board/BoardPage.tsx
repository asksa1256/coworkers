import ArticleList from '@/components/feature/articles/ArticleList';
import SearchField from '@/components/feature/search/SearchField';

export default function BoardPage() {
  return (
    <div className='bg-bg-primary view-white w-full max-w-280 pt-6 pb-10 md:pt-[77px] lg:mx-auto lg:pt-[87px]'>
      <div className='mb-5 flex flex-col gap-5 md:mb-[30px] md:flex-row md:items-center md:justify-between'>
        <h2 className='shrink-0 text-xl font-bold md:text-2xl'>자유게시판</h2>

        <div className='flex items-center gap-2 md:gap-4'>
          <SearchField className='w-full shrink' />
        </div>
      </div>

      <ArticleList />
    </div>
  );
}
