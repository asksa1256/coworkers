import { boardQueries } from '@/api/queries';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Comment from '@/components/ui/Comment/CommentSection';
import Dropdown from '@/components/ui/Dropdown';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Props {
  articleId: number;
  commentCount: number;
}

export default function ArticleCommentSection({
  articleId,
  commentCount,
}: Props) {
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

  if (!allData) return null;

  const handleSubmit = () => {
    console.log('댓글 추가');
  };

  const handleEdit = () => {
    console.log('edit 모드로 전환');
  };

  const handleDelete = () => {
    console.log('ArticleDeleteModal 오픈');
  };

  const COMMENT_DROPDOWN = [
    { label: '수정하기', onClick: handleEdit },
    { label: '삭제하기', onClick: handleDelete },
  ];

  return (
    <Comment
      comments={allData}
      isPending={isPending}
      status={status}
      error={error}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    >
      <Comment.Header count={commentCount} />

      <Comment.Form onSubmit={handleSubmit} />

      <Comment.List
        itemActions={
          <Dropdown
            type='icon'
            menuItems={COMMENT_DROPDOWN}
            triggerChildren={<KebabIcon className='h-5 w-5' />}
            align='end'
            className='text-center'
          />
        }
      />
    </Comment>
  );
}
