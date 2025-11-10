import type { UserType } from './userType';

type FrequencyType = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface RecurringResponse {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  frequencyType: FrequencyType;
  weekDays: number[];
  monthDay: number | null;
  taskListId: number;
  groupId: number;
  writerId: number;
}

export interface TaskDetailResponse {
  id: number;
  name: string;
  description: string | null;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  recurringId: number;
  deletedAt: string | null;
  displayIndex: 0;
  recurring: RecurringResponse;
  writer: Pick<UserType, 'id' | 'nickname' | 'image'>;
  doneBy: {
    user: Pick<UserType, 'id' | 'nickname' | 'image'> | null;
  };
  commentCount: number;
  frequency: FrequencyType;
}

//swagger상으로 user에 대한 schema가 정확하지 않고 응답도 null만 확인되어 일단 조건부 처리
export type TasksResponse = (Omit<TaskDetailResponse, 'recurring'> & {
  user?: Pick<UserType, 'id' | 'nickname' | 'image'> | null;
})[];

export type TaskListsResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: TasksResponse;
};

export interface TaskUpdateRequestBody {
  name: string;
  description: string | null;
  done: boolean;
}

export interface TaskListOrderRequestBody {
  displayIndex: number;
}
