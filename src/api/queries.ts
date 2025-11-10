import {
  getArticle,
  getArticleComments,
  getArticles,
  getGroup,
} from '@/api/api';
import axiosInstance from '@/lib/axios';
import type { GroupType, UserType } from '@/types/userType';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

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
    infiniteQueryOptions({
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
    queryOptions({
      queryKey: boardQueries.article(id),
      queryFn: async () => getArticle(id),
    }),

  comments: (articleId: number, cursor?: number) => [
    'comments',
    articleId,
    cursor,
  ],
  commentsOptions: (articleId: number, cursor?: number) =>
    infiniteQueryOptions({
      queryKey: boardQueries.comments(articleId, cursor),
      queryFn: async ({ pageParam = null }) =>
        getArticleComments(articleId, pageParam as number | null),
      initialPageParam: null as number | null, // 첫 요청 시 커서 없음 + 커서 있는 경우 number 타입으로 바뀌므로 number | null로 pageParam 타입 단언
      getNextPageParam: lastPage => {
        return lastPage.nextCursor ?? undefined;
      },
    }),
};
