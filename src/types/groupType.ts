import type { TaskListsResponse } from './taskType';
import type { GroupType, MembershipsType } from './userType';

export interface GroupDetailResponse extends GroupType {
  members: Omit<MembershipsType, 'group'>[];
  taskLists: TaskListsResponse;
}

export interface CreateGroupResponse {
  createdAt: string;
  id: number;
  image: string | null;
  name: string;
  updatedAt: string;
}

export interface JoinGroupPayload {
  userEmail: string;
  token: string;
}
export interface JoinGroupResponse {
  groupId: number;
}
