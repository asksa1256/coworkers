import axiosInstance from '@/lib/axios';
import type { MembershipsType } from '@/types/userType';
import { getAccessToken } from '@/utils/tokenStorage';

export const getGroup = async <GroupDetialType>(
  groupId: number,
): Promise<GroupDetialType> => {
  // Todo - 인터셉터 구현 후 삭제
  try {
    const response = await axiosInstance.get(`/groups/${groupId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log('그룹 데이터 에러: ', e);
    throw e;
  }
};

export const getGroupMembership = async <T = Omit<MembershipsType, 'group'>>(
  groupId: number,
  memberId: number,
): Promise<T> => {
  // Todo - 인터셉터 구현 후 삭제
  try {
    const response = await axiosInstance.get(
      `/groups/${groupId}/member/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log('그룹 멤버십 에러: ', e);
    throw e;
  }
};

export const updateTaskListOrder = async (
  groupId: number,
  taskListId: number,
  body: {
    displayIndex: number;
  },
) => {
  // Todo - 인터셉터 구현 후 삭제
  try {
    await axiosInstance.patch(
      `/groups/${groupId}/task-lists/${taskListId}/order`,
      body,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
  } catch (e) {
    console.log('리스트 항목 순서 변경 실패:', e);
    throw e;
  }
};
