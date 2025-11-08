import { getArticle, getGroup } from '@/api/api';
import axiosInstance from '@/lib/axios';
import type {
  ArticleDetailResponse,
  ArticleListResponse,
} from '@/types/boardTypes';
import type { GroupType, UserType } from '@/types/userType';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { getArticles } from './api';

export const groupQueries = {
  group: (groupId: number) => ['group', groupId],
  groupOptions: (groupId: number) =>
    queryOptions({
      queryKey: [...groupQueries.group(groupId)],
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
  articles: (sort: string, searchValue: string, searchRange: string) => [
    'articles',
    sort,
    searchValue,
    searchRange,
  ],
  articlesOptions: (sort: string, searchValue: string, searchRange: string) =>
    infiniteQueryOptions<ArticleListResponse>({
      queryKey: boardQueries.articles(sort, searchValue, searchRange),
      queryFn: async ({ pageParam = 1 }) =>
        getArticles({ pageParam: pageParam as number, sort, searchValue }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const loadedCount = allPages.flatMap(p => p.list).length;
        return loadedCount < lastPage.totalCount
          ? allPages.length + 1 // nextPage
          : undefined; // nextPage 없음
      },
    }),

  article: (id: number) => ['article', id],
  articleOptions: (id: number) =>
    queryOptions<ArticleDetailResponse>({
      queryKey: boardQueries.article(id),
      queryFn: async () => getArticle(id),
    }),
};
