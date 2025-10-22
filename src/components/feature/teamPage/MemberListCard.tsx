import Button from '@/components/ui/Button';
import MemberItem from './MemberItem';

interface Props {
  members: {
    role: string;
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  }[];
}

export default function MemberListCard({ members }: Props) {
  return (
    <section className='card-common hidden h-[275px] w-full max-w-60 px-5 py-6 lg:block'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='font-medium'>
          멤버
          <span className='text-md text-text-default font-normal'>{` (${members.length}명)`}</span>
        </h2>
        <Button
          className='w-auto px-0 py-0 font-semibold'
          variant='link'
          size='sm'
        >
          초대하기 +
        </Button>
      </div>
      <div className='flex flex-col gap-4'>
        {members.map(member => (
          <MemberItem key={member.userId} member={member} />
        ))}
      </div>
    </section>
  );
}
