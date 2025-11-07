import { WEEK_DAYS } from '@/constants';

export const getWeekDates = (date: Date = new Date()) => {
  const day = date.getDay(); // 0 일 1 월 2 화 3 수 4 목 5 금 6 토
  const diffToMonday = day === 0 ? -6 : 1 - day; // 월요일과 현재 요일 차이
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const week = Array.from({ length: 7 }, (_, i) => {
    const newDate = new Date(monday);
    newDate.setDate(monday.getDate() + i);
    return {
      week: WEEK_DAYS[i],
      date: newDate,
    };
  });

  return week;
};
