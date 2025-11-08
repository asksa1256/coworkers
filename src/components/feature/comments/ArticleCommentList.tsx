import { boardQueries } from '@/api/queries';
import Avatar from '@/components/ui/Avatar';
import { userAtom } from '@/store/authAtom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import CommentCard from './CommentCard';
import InputReply from './InputReply';

interface Props {
  articleId: number;
}

export default function ArticleCommentList({ articleId }: Props) {
  const user = useAtomValue(userAtom);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    error,
  } = useInfiniteQuery(boardQueries.commentsOptions(articleId));

  const allData = data?.pages.flatMap(page => page.list);

  if (!allData) return;

  return (
    <div>
      <h5 className='md:text-2lg text-md mb-3 font-bold md:mb-4'>
        댓글 <span className='text-primary'>{allData.length}</span>
      </h5>

      <div className='mb-[28px] flex items-center gap-3 md:mb-9 md:gap-4'>
        <Avatar size='md' imgSrc={user!.image} />
        <InputReply />
      </div>

      <ol>
        {allData?.map(comment => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </ol>
    </div>
  );
}
