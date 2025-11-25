import type { FrequencyType } from '@/types/taskType';

export interface UserType {
  teamId: string;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: MembershipsType[];
}

export interface MembershipsType {
  group: GroupType;
  role: 'ADMIN' | 'MEMBER';
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface GroupType {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  id: number;
}

export type MemberType = Omit<MembershipsType, 'group'>;

export interface MyHistoryTaskDoneItem {
  date: string;
  deletedAt: string | null;
  description: string | null;
  displayIndex: number;
  doneAt: string;
  frequency: FrequencyType;
  id: number;
  name: string;
  recurringId: number;
  updatedAt: string;
  userId: number;
  writerId: number;
}

export interface MyHistoryResponse {
  tasksDone: MyHistoryTaskDoneItem[];
}

export interface HistoryByDateType {
  dateTitle: string;
  tasks: MyHistoryTaskDoneItem[];
}

export interface UpdateUserRequestBody {
  nickname?: string;
  image: string | null;
}
