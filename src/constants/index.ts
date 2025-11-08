export const BREAKPOINTS = {
  tablet: 639,
  web: 1279,
};

export const KAKAO_REDIRECT_URI = `${window.location.origin}/oauth/kakao`;

export const ARTICLE_SORT_LIST = [
  { label: '최신순', value: 'recent' },
  { label: '좋아요순', value: 'like' },
];

export const SEARCH_RANGE_MAP = [
  { label: '제목+내용', value: 'title_content' },
  { label: '제목', value: 'title' },
];

export const ARTICLE_DROPDOWN_MAP = [
  { label: '수정하기', onClick: () => console.log('수정하기') },
  { label: '삭제하기', onClick: () => console.log('삭제하기') },
];
