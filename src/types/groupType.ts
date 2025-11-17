import type { TaskListsResponse } from './taskType';
import type { GroupType, MemberType } from './userType';

export interface GroupDetailResponse extends GroupType {
  members: MemberType[];
  taskLists: TaskListsResponse[];
}

export interface CreateGroupResponse {
  createdAt: string;
  id: number;
  image: string | null;
  name: string;
  updatedAt: string;
}

export interface UpdateGroupResponse extends CreateGroupResponse {
  teamId: string;
}

export interface JoinGroupPayload {
  userEmail: string;
  token: string;
}
export interface JoinGroupResponse {
  groupId: number;
}
