import type { TeamFormDataType } from '@/components/feature/form/TeamForm';
import axiosInstance from '@/lib/axios';
import type {
  CreateGroupResponse,
  GroupDetailResponse,
  JoinGroupPayload,
  JoinGroupResponse,
} from '@/types/groupType';
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
  payload: {
    displayIndex: number;
  },
) => {
  try {
    await axiosInstance.patch(
      `/groups/${groupId}/task-lists/${taskListId}/order`,
      payload,
    );
  } catch (e) {
    console.log('리스트 항목 순서 변경 실패:', e);
    throw e;
  }
};

export const updateTask = async (
  taskId: number,
  payload: TaskUpdateRequestBody,
) => {
  try {
    await axiosInstance.patch(
      `/groups/{groupId}/task-lists/{taskListId}/tasks/${taskId}`,
      payload,
    );
  } catch (e) {
    console.log('태스크 업데이트 실패:', e);
    throw e;
  }
};

export const addTaskList = async (
  groupId: number,
  payload: { name: string },
) => {
  try {
    await axiosInstance.post(`groups/${groupId}/task-lists`, payload);
  } catch (e) {
    console.log('태스크 리스트 추가 실패:', e);
    throw e;
  }
};

export const joinGroup = async (
  payload: JoinGroupPayload,
): Promise<JoinGroupResponse> => {
  const { data } = await axiosInstance.post(
    '/groups/accept-invitation',
    payload,
  );
  return data;
};

export const createGroup = async (
  formData: TeamFormDataType,
): Promise<CreateGroupResponse> => {
  const { data } = await axiosInstance.post('/groups', formData);
  return data;
};

export const createInviteToken = async (groupId: string): Promise<string> => {
  const { data: token } = await axiosInstance.get(
    `/groups/${groupId}/invitation`,
  );
  return token;
};
