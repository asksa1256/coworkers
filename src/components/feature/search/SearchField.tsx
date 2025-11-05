import SearchIcon from '@/assets/icons/SearchIcon.svg?react';
import { cn } from '@/lib/utils';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
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
        className='border-primary w-full rounded-full border-2 py-3 pl-12 text-base md:w-[420px] md:px-4 md:pl-[60px]'
      />
    </div>
  );
}
