import { atom } from 'jotai';

export interface User {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
}

export const userAtom = atom<User | null>(null);
