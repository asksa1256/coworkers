import TeamForm, {
  type TeamFormDataType,
} from '@/components/feature/form/TeamForm';
import axiosInstance from '@/lib/axios';
import { getAccessToken } from '@/utils/tokenStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CreateTeamPage() {
  const nav = useNavigate();

  const handleSubmit = async (formData: TeamFormDataType) => {
    try {
      const { data } = await axiosInstance.post('/groups', formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      toast.success('팀 생성에 성공하였습니다. 생성한 팀페이지로 이동합니다.');
      nav(`/${data.id}`);
    } catch (error) {
      console.log(error);
      toast.error('팀 생성에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return <TeamForm onSubmit={handleSubmit} />;
}
