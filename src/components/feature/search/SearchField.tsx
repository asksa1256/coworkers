import SearchIcon from '@/assets/icons/SearchIcon.svg?react';
import XIcon from '@/assets/icons/XIcon.svg?react';
import { cn } from '@/lib/utils';
import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchFieldProps {
  className?: string;
  queryKey?: string;
}

export default function SearchField({
  className,
  queryKey = 'q',
}: SearchFieldProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(queryKey, inputValue);
      setSearchParams(newSearchParams);
    }
  };

  // url 쿼리 파라미터와 내부 상태(inputValue) 동기화
  useEffect(() => {
    const q = searchParams.get(queryKey) ?? '';
    setInputValue(q);
  }, [searchParams, queryKey]);

  return (
    <div className={cn('relative', className)}>
      <SearchIcon
        aria-label='검색하기'
        className='text-primary absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2 md:left-4 md:h-8 md:w-8'
      />
      <input
        type='search'
        value={inputValue}
        placeholder='검색어를 입력해주세요'
        onChange={handleChange}
        onKeyDown={handleSearch}
        className='border-primary w-full rounded-full border-2 py-3 pl-12 text-base md:w-auto md:px-4 md:pl-[60px] lg:w-[420px]'
      />

      <button
        type='button'
        className={cn(
          'absolute top-1/2 right-4 z-[1] -translate-y-1/2 p-2',
          inputValue.length > 0 ? 'block' : 'hidden',
        )}
        onClick={() => setInputValue('')}
      >
        <XIcon className='h-4 w-4' />
      </button>
    </div>
  );
}
