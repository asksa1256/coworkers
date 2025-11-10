import type { TeamFormDataType } from '@/components/feature/form/TeamForm';
import axiosInstance from '@/lib/axios';
import type { TaskListSchema } from '@/types/addTaskListSchema';
import type {
  ArticleCommentsResponse,
  ArticleDetailResponse,
  ArticleListResponse,
} from '@/types/boardType';
import type {
  CreateGroupResponse,
  GroupDetailResponse,
  JoinGroupPayload,
  JoinGroupResponse,
} from '@/types/groupType';
import type {
  TaskDetailResponse,
  TaskListOrderRequestBody,
  TaskListsResponse,
  TaskUpdateRequestBody,
} from '@/types/taskType';
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

export const deleteGroupMember = async (groupId: number, userId: number) => {
  try {
    await axiosInstance.delete(`/groups/${groupId}/member/${userId}`);
  } catch (e) {
    console.log('그룹에서 멤버 제외 에러: ', e);
    throw e;
  }
};

export const updateTaskListOrder = async (
  groupId: number,
  taskListId: number,
  payload: TaskListOrderRequestBody,
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

export const addTaskList = async (groupId: number, payload: TaskListSchema) => {
  try {
    await axiosInstance.post(`groups/${groupId}/task-lists`, payload);
  } catch (e) {
    console.log('태스크 리스트 추가 실패:', e);
    throw e;
  }
};

export const updateTaskList = async (
  groupId: number,
  taskListId: number,
  payload: TaskListSchema,
) => {
  try {
    await axiosInstance.patch(
      `groups/${groupId}/task-lists/${taskListId}`,
      payload,
    );
  } catch (e) {
    console.log('태스크 리스트 변경 실패:', e);
    throw e;
  }
};

export const deleteTaskList = async (taskListId: number) => {
  try {
    await axiosInstance.delete(`groups/{groupId}/task-lists/${taskListId}`);
  } catch (e) {
    console.log('태스크 리스트 삭제 실패:', e);
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

// 게시글 목록 불러오기
interface getArticlesProps {
  pageParam: number;
  sort: string;
  searchValue: string;
}
export const getArticles = async ({
  pageParam,
  sort,
  searchValue,
}: getArticlesProps): Promise<ArticleListResponse> => {
  try {
    const response = await axiosInstance(
      `/articles?page=${pageParam}&orderBy=${sort}&keyword=${searchValue}`,
    );
    return response.data;
  } catch (e) {
    console.log('게시글 불러오기 에러: ', e);
    throw e;
  }
};

// 게시글 불러오기
export const getArticle = async (
  id: number,
): Promise<ArticleDetailResponse> => {
  try {
    const response = await axiosInstance(`/articles/${id}`);
    return response.data;
  } catch (e) {
    console.log('게시글 불러오기 에러: ', e);
    throw e;
  }
};

// TaskLists/${id} 불러오기
export const getSingleTaskList = async (
  groupId: string,
  taskListId: string,
  date: Date,
): Promise<TaskListsResponse> => {
  const { data } = await axiosInstance.get(
    `/groups/${groupId}/task-lists/${taskListId}?date=${date}`,
  );
  return data;
};

// tasks 불러오기
export const getTasks = async (
  groupId: string,
  taskListId: string,
  date: Date,
): Promise<TaskDetailResponse[]> => {
  const { data } = await axiosInstance.get(
    `/groups/${groupId}/task-lists/${taskListId}/tasks?date=${date}`,
  );
  return data;
};

// 게시글 댓글 목록 불러오기
export const getArticleComments = async (
  articleId: number,
  cursor?: number | null,
): Promise<ArticleCommentsResponse> => {
  try {
    const response = await axiosInstance(
      `/articles/${articleId}/comments?limit=5${cursor ? `&cursor=${cursor}` : ''}`,
    );
    return response.data;
  } catch (e) {
    console.log('게시글 불러오기 에러: ', e);
    throw e;
  }
};
