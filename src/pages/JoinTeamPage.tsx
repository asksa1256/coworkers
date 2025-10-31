import { getGroup } from '@/api/api';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import axiosInstance from '@/lib/axios';
import { userAtom } from '@/store/authAtom';
import type { GroupDetailResponse } from '@/types/groupType';
import type { AxiosError } from 'axios';
import { useAtomValue } from 'jotai';
import { UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function JoinTeamPage() {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const searchParams = useSearchParams()[0];
  const token = searchParams.get('token');
  const groupId = searchParams.get('groupId');
  const [groupInfo, setGroupInfo] = useState<GroupDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token || !groupId) {
      toast.error('잘못된 초대 링크입니다. 메인 페이지로 이동합니다.');
      navigate('/', { replace: true });
      return;
    }

    const getInfo = async () => {
      try {
        const groupData = await getGroup<GroupDetailResponse>(Number(groupId));
        setGroupInfo(groupData);
      } catch (error) {
        console.error(error);
        toast.error('팀 정보를 불러오지 못했습니다.');
      }
    };
    getInfo();
  }, [token, groupId, navigate]);

  const handleClickJoin = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const payload = {
        userEmail: user.email,
        token: token,
      };

      const { data } = await axiosInstance.post(
        '/groups/accept-invitation',
        payload,
      );

      toast.success('팀 참여하기 성공! 팀페이지로 이동합니다.');
      navigate(`/${data.groupId}`);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message ?? '알 수 없는 에러가 발생했습니다.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='my-5 flex grow-1 flex-col justify-center md:my-10'>
      <div className='bg-bg-primary mx-auto w-full max-w-[550px] rounded-[20px] px-5 pt-[46px] pb-[60px] md:px-[45px] md:pt-[60px] md:pb-[62px]'>
        <h2 className='text-xl font-bold md:text-2xl'>팀 참여하기</h2>

        {groupInfo && (
          <div className='mt-5 text-center'>
            <Avatar
              imgSrc={groupInfo.image || null}
              size='lg'
              className='h-16 w-16 rounded-full! md:h-[100px] md:w-[100px] lg:h-[100px] lg:w-[100px]'
            />
            <h3 className='mt-2 text-lg font-bold md:text-xl'>
              {groupInfo.name}
            </h3>
            <span className='text-text-default text-md mt-1 flex items-center justify-center gap-1'>
              <UserRound className='w-4' /> {groupInfo.members.length ?? 1}명
            </span>
          </div>
        )}

        <Button
          type='button'
          className='mt-10 text-base'
          onClick={handleClickJoin}
          disabled={isLoading}
        >
          {isLoading ? '참여 요청 중...' : '참여하기'}
        </Button>
        <p className='text-text-default mt-5 text-center text-xs md:mt-6 md:text-base'>
          {`참여를 원하시면, '참여하기' 버튼을 클릭해주세요.`}
        </p>
      </div>
    </div>
  );
}
