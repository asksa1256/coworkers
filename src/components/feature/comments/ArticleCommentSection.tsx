import { articleCommentMutations } from '@/api/mutations';
import { boardQueries } from '@/api/queries';
import Comment from '@/components/ui/Comment/CommentSection';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useModal from '@/hooks/useModal';
import { userAtom } from '@/store/authAtom';
import { getCommentAuthor } from '@/utils/typeGuard';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import ArticleCommentDeleteModal from './ArticleCommentDeleteModal';

interface Props {
  articleId: number;
  commentCount: number;
}

export default function ArticleCommentSection({
  articleId,
  commentCount,
}: Props) {
  const user = useAtomValue(userAtom);
  const scrollRef = useRef(null);
  const { openModal } = useModal();
  const queryClient = useQueryClient();

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

  // 여러 수정 가능한 댓글 중 1개만 수정하기 위한 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { mutate: createComment } = useMutation(
    articleCommentMutations.createCommentMutationOptions({
      articleId,
      user: user!,
      queryClient,
    }),
  );

  const { mutate: updateComment } = useMutation(
    articleCommentMutations.updateCommentMutationOptions({
      articleId,
      user: user!,
      queryClient,
      onSuccess: () => {
        setEditingCommentId(null);
      },
    }),
  );

  const handleCreateSubmit = (content: string) => {
    createComment({ articleId, content });
  };

  const handleEditSubmit = (commentId: number, content: string) => {
    updateComment({ commentId, content });
  };

  const handleDelete = (commentId: number, content: string) => {
    openModal({
      children: (
        <ArticleCommentDeleteModal
          commentId={commentId}
          content={content}
          articleId={articleId}
        />
      ),
    });
  };

  useIntersectionObserver({
    target: scrollRef,
    onIntersect: fetchNextPage || (() => {}),
    enabled: !!hasNextPage,
  });

  if (!allData) return null;

  return (
    <Comment isPending={isPending} status={status} error={error}>
      <Comment.Header count={commentCount} />

      <Comment.Form onSubmit={handleCreateSubmit} />

      <Comment.List comments={allData}>
        <ol>
          {allData.map(comment => {
            const author = getCommentAuthor(comment);

            // 수정
            if (editingCommentId === comment.id) {
              return (
                <Comment.Form
                  key={comment.id}
                  comment={comment}
                  onSubmit={content => handleEditSubmit(comment.id, content)}
                  onCancel={() => setEditingCommentId(null)}
                />
              );
            }

            // 조회
            return (
              <Comment.Item key={comment.id} comment={comment} author={author}>
                {author.id === user?.id && (
                  <Comment.Dropdown
                    commentId={comment.id}
                    content={comment.content}
                    onEdit={() => {
                      setEditingCommentId(comment.id);
                    }}
                    onDelete={handleDelete}
                  />
                )}
              </Comment.Item>
            );
          })}
        </ol>

        <Comment.InfiniteScroll
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Comment.List>
    </Comment>
  );
}
