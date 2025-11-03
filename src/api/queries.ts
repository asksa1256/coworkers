import axiosInstance from '@/lib/axios';
import type { GroupType, UserType } from '@/types/userType';
import { queryOptions } from '@tanstack/react-query';

export const groupQueries = {
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
