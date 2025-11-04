import axiosInstance from '@/lib/axios';
import type { GroupDetailResponse } from '@/types/groupType';
import type { TaskUpdateRequestBody } from '@/types/taskType';
import type { MembershipsType } from '@/types/userType';

export const getGroup = async (
  groupId: number,
): Promise<GroupDetailResponse> => {
  try {
    const response = await axiosInstance(`/groups/${groupId}`);
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
  try {
    const response = await axiosInstance(
      `/groups/${groupId}/member/${memberId}`,
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
  try {
    await axiosInstance.patch(
      `/groups/${groupId}/task-lists/${taskListId}/order`,
      body,
    );
  } catch (e) {
    console.log('리스트 항목 순서 변경 실패:', e);
    throw e;
  }
};

export const updateTask = async (
  taskId: number,
  body: TaskUpdateRequestBody,
) => {
  try {
    await axiosInstance.patch(
      `/groups/{groupId}/task-lists/{taskListId}/tasks/${taskId}`,
      body,
    );
  } catch (e) {
    console.log('태스크 업데이트 실패:', e);
    throw e;
  }
};
