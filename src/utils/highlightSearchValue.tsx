import type { ReactNode } from 'react';

/**
 * 텍스트 내에서 검색어와 일치하는 부분을 강조(하이라이팅)하여 반환하는 함수
 * @param text 원본 문자열 (title)
 * @param term 검색어 (searchValue)
 * @returns ReactNode 배열 또는 원본 문자열
 */
const highlightSearchValue = (
  text: string,
  value: string,
): (string | ReactNode)[] | string => {
  if (!value || !text) {
    return text; // 검색어 또는 텍스트가 없으면 하이라이팅 X
  }

  const regex = new RegExp(`(${value})`, 'gi'); // 'gi' 플래그: g(전역), i(대소문자 무시)
  const parts = text.split(regex);

  // parts 배열 요소 중 일치하는 검색어가 있으면 하이라이트된 ReactNode 리턴
  return parts.map((part, index) => {
    if (part.toLowerCase() === value.toLowerCase()) {
      return (
        <span key={index} className='font-bold text-blue-600'>
          {part}
        </span>
      );
    }

    // 일치하는 검색어 없으면 하이라이팅 X, string 리턴
    return part;
  });
};

export default highlightSearchValue;
