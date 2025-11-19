import type { TeamFormDataType } from '@/components/feature/form/TeamForm';
import axiosInstance from '@/lib/axios';
import type {
  ArticleDetailResponse,
  ArticleListResponse,
} from '@/types/boardType';
import type {
  ArticleCommentResponse,
  ArticleCommentsResponse,
} from '@/types/commentType';
import type {
  CreateGroupResponse,
  GroupDetailResponse,
  JoinGroupPayload,
  JoinGroupResponse,
  UpdateGroupResponse,
} from '@/types/groupType';
import type { TaskFormSchema } from '@/types/taskFormSchema';
import type { TaskListSchema } from '@/types/taskListSchema';
import type {
  RecurringResponse,
  TaskDetailResponse,
  TaskListOrderRequestBody,
  TaskListsResponse,
  TaskUpdateRequestBody,
} from '@/types/taskType';
import type { MembershipsType } from '@/types/userType';
import type { AxiosResponse } from 'axios';

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

export const updateGroup = async (
  groupId: number,
  payload: TeamFormDataType,
): Promise<UpdateGroupResponse> => {
  try {
    const { data } = await axiosInstance.patch(`/groups/${groupId}`, payload);
    return data;
  } catch (e) {
    console.log('팀 정보 수정 에러:', e);
    throw e;
  }
};

export const deleteGroup = async (groupId: number) => {
  try {
    await axiosInstance.delete(`/groups/${groupId}`);
  } catch (e) {
    console.log('팀 삭제 에러:', e);
    throw e;
  }
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

// 베스트 게시글 목록 불러오기
export const getBestArticles = async (
  pageSize: number,
): Promise<ArticleListResponse> => {
  try {
    const response = await axiosInstance(
      `/articles?page=1&pageSize=${pageSize}&orderBy=like`,
    );
    return response.data;
  } catch (e) {
    console.log('베스트 게시글 불러오기 에러: ', e);
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
    console.log('댓글 불러오기 에러: ', e);
    throw e;
  }
};

// 게시글 댓글 추가
export const createArticleComment = async (
  articleId: number,
  content: string,
): Promise<ArticleCommentResponse> => {
  try {
    const response = await axiosInstance.post(
      `/articles/${articleId}/comments`,
      { content },
    );
    return response.data;
  } catch (e) {
    console.log('댓글 추가 에러: ', e);
    throw e;
  }
};

// 게시글 댓글 수정
export const updateArticleComment = async (
  commentId: number,
  content: string,
): Promise<ArticleCommentResponse> => {
  try {
    const response = await axiosInstance.patch(`/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (e) {
    console.log('댓글 수정 에러: ', e);
    throw e;
  }
};

// 게시글 좋아요 추가
export const likeArticle = async (
  articleId: number,
): Promise<ArticleDetailResponse> => {
  try {
    const response = await axiosInstance.post(`/articles/${articleId}/like`, {
      articleId,
    });
    return response.data;
  } catch (e) {
    console.log('좋아요 추가 에러: ', e);
    throw e;
  }
};

// 게시글 좋아요 취소
export const unlikeArticle = async (
  articleId: number,
): Promise<ArticleDetailResponse> => {
  try {
    const response = await axiosInstance.delete(`/articles/${articleId}/like`);
    return response.data;
  } catch (e) {
    console.log('좋아요 취소 에러: ', e);
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

// 할일 생성하기
export const createTask = async (
  groupId: string,
  taskListId: string,
  payload: TaskFormSchema,
): Promise<RecurringResponse> => {
  const newStartDate = payload.startDate || new Date();

  // shadcnui의 calendar에서 로컬 일자/시간으로 value를 보내주는데,
  // 서버에서 한번 더 보정을 하는지 선택한 일자와 실제로 서버에 등록되는 일자에 불일치 발생
  // 그래서 서버에 보내기전에 shadcnui에서 보정 해준 시간을 utc 기준으로 다시 변환함.
  const adjustedStartDate = new Date(
    newStartDate.getTime() - newStartDate.getTimezoneOffset() * 60000,
  ).toISOString();

  const newPayload = {
    ...payload,
    startDate: adjustedStartDate,
  };

  const { data } = await axiosInstance.post(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    newPayload,
  );

  return data;
};

// 태스크 삭제
export const deleteTask = async ({
  groupId,
  taskListId,
  taskId,
}: {
  groupId: string;
  taskListId: string;
  taskId: string;
}): Promise<AxiosResponse<void>> => {
  // 특정 할 일 삭제
  return await axiosInstance.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
};

// 반복 설정된 태스크의 모든 일정 삭제
export const deleteTaskRecurring = async ({
  groupId,
  taskListId,
  taskId,
  recurringId,
}: {
  groupId: string;
  taskListId: string;
  taskId: string;
  recurringId: string;
}): Promise<AxiosResponse<void>> => {
  // 반복 할 일 삭제
  return await axiosInstance.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
  );
};
