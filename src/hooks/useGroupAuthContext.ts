import { createContext, useContext } from 'react';

export const GroupAuthContext = createContext<boolean | null>(null);

export const useGroupAuthContext = () => {
  const context = useContext(GroupAuthContext);
  if (context === null) {
    throw new Error(
      'useGroupAuthContext는 groupId route에서 사용되어야 합니다.',
    );
  }
  return context;
};
