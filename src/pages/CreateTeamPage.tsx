import { groupQueries } from '@/api/queries';
import TeamForm, {
  type TeamFormDataType,
} from '@/components/feature/form/TeamForm';
import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import { useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CreateTeamPage() {
  const nav = useNavigate();
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: TeamFormDataType) => {
    try {
      const { data } = await axiosInstance.post('/groups', formData);

      toast.success('팀 생성에 성공하였습니다. 생성한 팀페이지로 이동합니다.');
      queryClient.invalidateQueries({ queryKey: groupQueries.groups(user) });
      nav(`/${data.id}`);
    } catch (error) {
      console.log(error);
      toast.error('팀 생성에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return <TeamForm onSubmit={handleSubmit} />;
}
