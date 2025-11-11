import { groupMutations } from '@/api/mutations';
import { groupQueries } from '@/api/queries';
import TeamForm, {
  type TeamFormDataType,
} from '@/components/feature/form/TeamForm';
import { userAtom } from '@/store/authAtom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';

export default function UpdateTeamPage() {
  const params = useParams();
  const groupId = Number(params.groupId);
  const queryClient = useQueryClient();
  const { data: groupData } = useQuery(groupQueries.groupOptions(groupId));
  const user = useAtomValue(userAtom);
  const { mutate } = useMutation(
    groupMutations.updateGroupOptions(groupId, user!, queryClient),
  );

  if (!groupData) return;

  return (
    <TeamForm
      onSubmit={(formData: TeamFormDataType) => {
        mutate({ groupId: groupId, payload: formData });
      }}
      initialData={{ name: groupData.name, image: groupData.image }}
    />
  );
}
