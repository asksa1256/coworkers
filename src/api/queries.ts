import { getGroup } from '@/api/api';
import axiosInstance from '@/lib/axios';
import { type ArticleListResponse } from '@/types/boardTypes';
import type { GroupType, UserType } from '@/types/userType';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { getArticles } from './api';

export const groupQueries = {
  group: (groupId: number) => ['group', groupId],
  groupOptions: (groupId: number) =>
    queryOptions({
      queryKey: ['group', groupId],
      queryFn: () => getGroup(groupId),
    }),

  // 그룹 리스트
  groups: (user: UserType | null) => ['userGroups', user?.id],
  groupsOptions: (user: UserType | null) =>
    queryOptions({
      queryKey: [...groupQueries.groups(user)],
      queryFn: async () => {
        const { data } = await axiosInstance.get<GroupType[]>('/user/groups');
        return data;
      },
      enabled: !!user?.id,
    }),
};

export const boardQueries = {
  articles: (sort: string) => ['articles', sort],
  articlesOptions: (sort: string) =>
    infiniteQueryOptions<ArticleListResponse>({
      queryKey: boardQueries.articles(sort),
      queryFn: async ({ pageParam = 1 }) =>
        getArticles(pageParam as number, sort),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const loadedCount = allPages.flatMap(p => p.list).length;
        return loadedCount < lastPage.totalCount
          ? allPages.length + 1 // nextPage
          : undefined; // nextPage 없음
      },
    }),
};
