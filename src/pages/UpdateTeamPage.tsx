import { groupMutations } from '@/api/mutations';
import { groupQueries } from '@/api/queries';
import TeamForm, {
  type TeamFormDataType,
} from '@/components/feature/form/TeamForm';
import { userAtom } from '@/store/authAtom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UpdateTeamPage() {
  const params = useParams();
  const groupId = Number(params.groupId);
  const queryClient = useQueryClient();
  const { data: groupData } = useQuery(groupQueries.groupOptions(groupId));
  const [user, setUser] = useAtom(userAtom);
  const {
    mutateAsync,
    isSuccess,
    data: mutationResponse,
  } = useMutation(
    groupMutations.updateGroupOptions(groupId, user!, queryClient),
  );

  useEffect(() => {
    //userAtom에 그룹정보 동기화
    if (isSuccess) {
      const nextUser = produce(user, draft => {
        if (!draft) return user;

        const membership = draft.memberships.find(
          membership => membership.groupId === groupId,
        );

        if (!membership) return user;

        membership.group.image = mutationResponse.image;
        membership.group.name = mutationResponse.name;
      });

      setUser(nextUser);
    }
  }, [isSuccess]);

  if (!groupData) return;

  return (
    <TeamForm
      onSubmit={async (formData: TeamFormDataType) => {
        await mutateAsync({ groupId: groupId, payload: formData });
      }}
      initialData={{ name: groupData.name, image: groupData.image }}
    />
  );
}
