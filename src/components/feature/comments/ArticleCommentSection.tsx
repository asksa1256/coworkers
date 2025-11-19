import { articleCommentMutations } from '@/api/mutations';
import { boardQueries } from '@/api/queries';
import Comment from '@/components/ui/Comment/CommentSection';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useModal from '@/hooks/useModal';
import { userAtom } from '@/store/authAtom';
import {
  type CreateCommentRequest,
  createCommentRequestSchema,
} from '@/types/CommentRequestSchema';
import { getCommentAuthor } from '@/utils/typeGuard';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
  const queryClient = useQueryClient();
  const scrollRef = useRef(null);
  const { openModal } = useModal();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentRequest>({
    resolver: zodResolver(createCommentRequestSchema),
    mode: 'onBlur',
  });

  const { mutate: createComment } = useMutation(
    articleCommentMutations.createCommentMutationOptions({
      articleId,
      user: user!,
      queryClient,
    }),
  );

  const onSubmit = async (formData: CreateCommentRequest) => {
    createComment(
      { articleId, content: formData.content },
      {
        onSuccess: () => {
          reset();
          toast.success('댓글이 등록되었습니다.');
        },
      },
    );
  };

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  // 댓글 수정 뮤테이션
  const { mutate: updateComment } = useMutation(
    articleCommentMutations.updateCommentMutationOptions({
      articleId,
      user: user!,
      queryClient,
    }),
  );

  const handleEditStart = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
  };

  const handleEditSubmit = (commentId: number, newContent: string) => {
    // 댓글 수정 뮤테이션 호출
    updateComment(
      { commentId, content: newContent },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          toast.success('댓글이 수정되었습니다.');
        },
      },
    );
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

      <Comment.Form
        register={register}
        error={errors.content}
        onSubmit={handleSubmit(onSubmit)}
      />

      <Comment.List comments={allData}>
        <ol>
          {allData.map(comment => {
            const author = getCommentAuthor(comment);
            const commentAuthorId = author.id;
            const isCommentAuthor = commentAuthorId === user?.id;

            const editActions = isCommentAuthor
              ? {
                  isEditMode: editingCommentId === comment.id,
                  onSubmit: (newContent: string) =>
                    handleEditSubmit(comment.id, newContent),
                  onEditCancel: handleEditCancel,
                }
              : undefined; // 작성자가 아니면 editActions 전달 X

            return (
              <Comment.Item
                key={comment.id}
                comment={comment}
                author={author}
                editActions={editActions}
              >
                {isCommentAuthor && (
                  <Comment.Dropdown
                    commentId={comment.id}
                    content={comment.content}
                    onEditStart={handleEditStart}
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
