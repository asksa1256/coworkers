import { type UserType } from '@/types/userType';
import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage<UserType | null>('user', null);
