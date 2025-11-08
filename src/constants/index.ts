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

export const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const FREQUENCY_TO_TEXT = {
  ONCE: '한 번만',
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
};
