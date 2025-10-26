import type { TaskListsType } from './taskType';
import type { GroupType, MembershipsType } from './userType';

export interface GroupDetialType extends GroupType {
  members: Omit<MembershipsType, 'group'>[];
  taskLists: TaskListsType;
}
