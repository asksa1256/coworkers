import { joinGroup } from '@/api/api';
import { groupQueries } from '@/api/queries';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { Spinner } from '@/components/ui/spinner';
import { userAtom } from '@/store/authAtom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useAtomValue } from 'jotai';
import { UserRound } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function JoinTeamPage() {
  const searchParams = useSearchParams()[0];
  const token = searchParams.get('token');
  const groupId = Number(searchParams.get('groupId'));

  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const hasRetriedRef = useRef(false); // refetch 메서드 트리거용

  const queryClient = useQueryClient();
  const { mutate: joinGroupMutate, isPending: isJoinGroupPending } =
    useMutation({
      mutationFn: () =>
        joinGroup({
          userEmail: user!.email,
          token: token!,
        }),
      onSuccess: data => {
        toast.success('팀 참여하기 성공! 팀페이지로 이동합니다.');
        queryClient.invalidateQueries({ queryKey: groupQueries.groups(user) });
        navigate(`/${data.groupId}`);
      },
      onError: error => {
        const message = isAxiosError(error)
          ? error.response?.data?.message
          : '알 수 없는 에러가 발생했습니다.';
        toast.error(message);
      },
    });
  const {
    data: groupData,
    isLoading: isGroupLoading,
    isError: isGroupError,
    refetch: refetchGroup,
  } = useQuery({
    ...groupQueries.groupOptions(groupId),
    enabled: !!groupId && !!token,
    retry: 0,
  });

  useEffect(() => {
    // 링크에 token과 groupId가 존재하는지 여부 확인
    if (!token || !groupId) {
      toast.error(
        '잘못된 초대 링크입니다. 초대 링크를 다시 받아 시도해주세요.',
      );
      navigate('/', { replace: true });
      return;
    }
  }, [groupId, token, navigate]);

  useEffect(() => {
    // 유저 상호 작용으로 팀 정보 fetch를 retry 했을 때, 다시 실패시 메인페이지로 이동
    if (isGroupError && hasRetriedRef.current) {
      toast.error(
        '팀 정보를 불러오는데 실패했습니다. 초대 링크를 다시 받아 시도해주세요.',
      );
      navigate('/', { replace: true });
      return;
    }
  }, [isGroupError, hasRetriedRef, navigate]);

  const handleClickJoin = () => {
    joinGroupMutate();
  };

  const handleRefetch = () => {
    hasRetriedRef.current = true;
    refetchGroup();
  };

  return (
    <div className='my-5 flex grow-1 flex-col justify-center md:my-10'>
      <div className='bg-bg-primary mx-auto w-full max-w-[550px] rounded-[20px] px-5 pt-[46px] pb-[60px] md:px-[45px] md:pt-[60px] md:pb-[62px]'>
        <h2 className='text-xl font-bold md:text-2xl'>팀 참여하기</h2>

        <div className='mt-5 text-center'>
          {isGroupLoading && (
            <div className='flex justify-center py-5'>
              <Spinner />
            </div>
          )}

          {isGroupError && (
            <>
              <p className='text-2lg my-3 font-medium'>
                팀 정보를 불러오지 못하였습니다.
              </p>
              <Button
                size='sm'
                type='button'
                variant='outline'
                className='w-auto'
                onClick={handleRefetch}
                disabled={isGroupLoading}
              >
                다시 시도
              </Button>
            </>
          )}

          {groupData && (
            <>
              <Avatar
                imgSrc={groupData.image || null}
                size='lg'
                className='h-16 w-16 rounded-full! md:h-[100px] md:w-[100px] lg:h-[100px] lg:w-[100px]'
              />
              <h3 className='mt-2 text-lg font-bold md:text-xl'>
                {groupData.name}
              </h3>
              <span className='text-text-default text-md mt-1 flex items-center justify-center gap-1'>
                <UserRound className='w-4' /> {groupData.members.length ?? 1}명
              </span>
            </>
          )}
        </div>

        <Button
          type='button'
          className='mt-10 text-base'
          onClick={handleClickJoin}
          disabled={isJoinGroupPending || !groupData}
        >
          {isJoinGroupPending ? '참여 요청 중...' : '참여하기'}
        </Button>
        <p className='text-text-default mt-5 text-center text-xs md:mt-6 md:text-base'>
          {`참여를 원하시면, '참여하기' 버튼을 클릭해주세요.`}
        </p>
      </div>
    </div>
  );
}
