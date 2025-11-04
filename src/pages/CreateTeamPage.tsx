import { groupQueries } from '@/api/queries';
import TeamForm, {
  type TeamFormDataType,
} from '@/components/feature/form/TeamForm';
import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import type { CreateGroupResponse } from '@/types/groupType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const createGroups = async (
  formData: TeamFormDataType,
): Promise<CreateGroupResponse> => {
  const { data } = await axiosInstance.post('/groups', formData);
  return data;
};

export default function CreateTeamPage() {
  const nav = useNavigate();
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (formData: TeamFormDataType) => createGroups(formData),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: groupQueries.groups(user) });
      toast.success('팀 생성에 성공하였습니다. 생성한 팀페이지로 이동합니다.');
      nav(`/${data.id}`);
    },
    onError: () => {
      toast.error('팀 생성에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  const handleSubmit = (formData: TeamFormDataType) => {
    mutate(formData);
  };

  return <TeamForm onSubmit={handleSubmit} />;
}
