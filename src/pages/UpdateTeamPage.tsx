import { groupMutations } from '@/api/mutations';
import { groupQueries } from '@/api/queries';
import TeamForm, {
  type TeamFormDataType,
} from '@/components/feature/form/TeamForm';
import { userAtom } from '@/store/authAtom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function UpdateTeamPage() {
  const navigate = useNavigate();
  const params = useParams();
  const groupId = Number(params.groupId);
  const { state: redirectUrl } = useLocation();
  const queryClient = useQueryClient();
  const { data: groupData } = useQuery(groupQueries.groupOptions(groupId));
  const user = useAtomValue(userAtom);
  const { mutateAsync } = useMutation(
    groupMutations.updateGroupOptions(groupId, user!, queryClient),
  );

  const handleSubmit = async (formData: TeamFormDataType) => {
    await mutateAsync(
      { groupId: groupId, payload: formData },
      {
        onSuccess: () => {
          navigate(redirectUrl ? redirectUrl : `/${groupId}`);
        },
      },
    );
  };

  if (!groupData) return;

  return (
    <TeamForm
      onSubmit={handleSubmit}
      initialData={{ name: groupData.name, image: groupData.image }}
    />
  );
}
