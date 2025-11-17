import { createGroup } from '@/api/api';
import { groupQueries } from '@/api/queries';
import TeamForm, {
  type TeamFormDataType,
} from '@/components/feature/form/TeamForm';
import { userAtom } from '@/store/authAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CreateTeamPage() {
  const nav = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: (formData: TeamFormDataType) => createGroup(formData),
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

  useEffect(() => {
    //userAtom에 그룹정보 동기화
    if (isSuccess) {
      const nextUser = produce(user, draft => {
        if (!draft) return user;

        draft.memberships.push({
          userId: draft.id,
          groupId: data.id,
          userName: draft.nickname,
          userEmail: draft.email,
          userImage: draft.image,
          role: 'ADMIN',
          group: {
            ...data,
            teamId: draft.teamId,
          },
        });
      });

      setUser(nextUser);
    }
  }, [isSuccess]);

  return <TeamForm onSubmit={handleSubmit} />;
}
