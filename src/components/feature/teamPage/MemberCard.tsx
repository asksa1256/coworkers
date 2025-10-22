import Button from '@/components/ui/Button';

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

export default function MemberCard({ members }: Props) {
  return (
    <section className='card-common hidden h-[275px] w-full max-w-60 lg:block'>
      <div className='flex items-center justify-between'>
        <h2>
          멤버<span className=''>{`(${members.length}명)`}</span>
        </h2>
        <Button className='w-auto px-0 py-0' variant='link' size='sm'>
          초대하기 +
        </Button>
      </div>
    </section>
  );
}
