import type { TaskListsResponse } from './taskType';
import type { GroupType, MembershipsType } from './userType';

export interface GroupDetailResponse extends GroupType {
  members: Omit<MembershipsType, 'group'>[];
  taskLists: TaskListsResponse;
}
