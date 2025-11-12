import { boardQueries } from '@/api/queries';
import Comment from '@/components/ui/Comment/CommentSection';
import { normalizeArticleComment } from '@/utils/normalizeComment';
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

  const allData = data?.pages
    .flatMap(page => page.list)
    .map(normalizeArticleComment);

  if (!allData) return null;

  const isEmpty = allData.length === 0;

  const handleSubmit = () => {
    console.log('test');
  };

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

      {isEmpty ? <Comment.Empty /> : <Comment.List />}
    </Comment>
  );
}
