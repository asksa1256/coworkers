import { userAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';

export default function useGroupRole(groupId: number) {
  const user = useAtomValue(userAtom);

  const membership = user?.memberships.find(
    membership => membership.groupId === groupId,
  );

  return membership ? membership.role : null;
}
