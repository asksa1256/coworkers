import { getTaskComments } from '@/api/api';
import Comment from '@/components/ui/Comment/CommentSection';
import { userAtom } from '@/store/authAtom';
import { getCommentAuthor } from '@/utils/typeGuard';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

interface Props {
  taskId: number;
  commentCount: number;
}

export default function TaskDetailComment({ taskId, commentCount }: Props) {
  const user = useAtomValue(userAtom);
  const {
    data: comments,
    isPending: commentsPending,
    status: commentsStatus,
    error: commentsError,
  } = useQuery({
    queryKey: ['detailComments'],
    queryFn: () => getTaskComments(taskId),
  });

  // 여러 수정 가능한 댓글 중 1개만 수정하기 위한 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const handleCreateSubmit = (content: string) => {};

  const handleEditSubmit = (commentId: number, content: string) => {};

  const handleDelete = (commentId: number, content: string) => {};

  if (!comments) return null;

  return (
    <div className='px-4 md:px-7 lg:px-10'>
      <Comment
        isPending={commentsPending}
        status={commentsStatus}
        error={commentsError}
      >
        <Comment.Header count={commentCount} />

        <Comment.Form onSubmit={handleCreateSubmit} />

        <Comment.List comments={comments}>
          <ul>
            {comments.map(comment => {
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
