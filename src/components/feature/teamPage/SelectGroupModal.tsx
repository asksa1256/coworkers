import { groupQueries } from '@/api/queries';
import Avatar from '@/components/ui/Avatar';
import useModal from '@/hooks/useModal';
import { userAtom } from '@/store/authAtom';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';

export default function SelectGroupModal() {
  const { closeModal } = useModal();
  const user = useAtomValue(userAtom);
  const { data: userGroups } = useQuery(groupQueries.groupsOptions(user));

  return (
    <div className='text-center'>
      <div className='mb-6'>
        <h3 className='mb-1 font-medium'>팀 선택</h3>
        <p className='text-md text-text-default'>
          이동할 팀 페이지를 선택해주세요.
        </p>
      </div>

      <ol className='border-border-primary -mx-4 rounded-2xl border px-4'>
        {userGroups?.map(group => (
          <li
            key={group.id}
            className='border-border-primary border-b py-3 last:border-0'
          >
            <Link
              to={`/${group.id}`}
              className='hover:bg-primary/10 flex items-center gap-3 rounded-xl px-4 py-2 text-left transition-colors'
              onClick={() => closeModal()}
            >
              <Avatar size='lg' imgSrc={group.image} />

              <div className='flex grow-1'>
                <div className='w-[138px] grow-1 truncate'>
                  <div className='font-semibold'>{group.name}</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
