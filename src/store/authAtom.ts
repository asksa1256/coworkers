import { atomWithStorage } from 'jotai/utils';

export interface User {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
}

export const userAtom = atomWithStorage<User | null>('user', null);
