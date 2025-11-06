import ArticleList from '@/components/feature/articles/ArticleList';
import SearchField from '@/components/feature/search/SearchField';
import Dropdown from '@/components/ui/Dropdown';
import { SEARCH_RANGE_MAP } from '@/constants';
import { useSearchParams } from 'react-router-dom';

export default function BoardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRange =
    searchParams.get('search_range') || SEARCH_RANGE_MAP[0].value;

  const handleSelectSearchRange = (value: string) => {
    setSearchParams(prevParams => ({
      ...Object.fromEntries(prevParams),
      search_range: value,
    }));
  };

  return (
    <div className='w-full max-w-280 pt-6 pb-10 md:pt-[77px] lg:mx-auto lg:pt-[87px]'>
      <div className='mb-5 flex flex-col gap-5 md:mb-[30px] lg:flex-row lg:items-center lg:justify-between'>
        <h2 className='text-xl font-bold md:text-2xl'>자유게시판</h2>

        <div className='flex items-center gap-2 md:gap-4'>
          <Dropdown
            type='select'
            menuItems={SEARCH_RANGE_MAP}
            value={searchRange}
            onSelect={handleSelectSearchRange}
          />
          <SearchField className='w-full' />
        </div>
      </div>

      <ArticleList />
    </div>
  );
}
