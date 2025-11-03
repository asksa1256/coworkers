import ArticleList from '@/components/feature/articles/ArticleList';

export default function BoardPage() {
  return (
    <div className='w-full max-w-280 pt-6 pb-10 md:pt-[77px] lg:mx-auto lg:pt-[87px]'>
      <div className='mb-5 md:mb-[30px]'>
        <h2 className='text-xl font-bold md:text-2xl'>자유게시판</h2>
      </div>

      <ArticleList />
    </div>
  );
}
