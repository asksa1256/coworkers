import { getTaskComments } from '@/api/api';
import { taskDetailCommentMutations } from '@/api/mutations';
import Comment from '@/components/ui/Comment/CommentSection';
import { userAtom } from '@/store/authAtom';
import { getCommentAuthor } from '@/utils/typeGuard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

interface Props {
  taskId: number;
}

export default function TaskDetailComment({ taskId }: Props) {
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const {
    data: comments,
    isPending: commentsPending,
    status: commentsStatus,
    error: commentsError,
  } = useQuery({
    queryKey: ['taskComments'],
    queryFn: () => getTaskComments(taskId),
  });

  const { mutate: createTaskCommentMutate } = useMutation(
    taskDetailCommentMutations.taskCmtCreateMutationOptions({
      queryClient,
      taskId,
      user: user!,
    }),
  );

  // 여러 수정 가능한 댓글 중 1개만 수정하기 위한 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const handleCreateSubmit = (content: string) => {
    createTaskCommentMutate({ content, taskId });
  };

  const handleEditSubmit = (commentId: number, content: string) => {};

  const handleDelete = (commentId: number, content: string) => {};

  if (!comments) return null;

  // 댓글 작성시 랜덤으로 가장 첫번째에 생성되는 경우가 있어서, 프론트단에서 다시 정렬
  const sortedComments = [...comments].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className='px-4 md:px-7 lg:px-10'>
      <Comment
        isPending={commentsPending}
        status={commentsStatus}
        error={commentsError}
      >
        <Comment.Header count={comments.length} />

        <Comment.Form onSubmit={handleCreateSubmit} />

        <Comment.List comments={comments}>
          <ul>
            {sortedComments.map(comment => {
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
                <Comment.Item
                  key={comment.id}
                  comment={comment}
                  author={author}
                >
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
          </ul>
        </Comment.List>
      </Comment>
    </div>
  );
}
