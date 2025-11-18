import { articleCommentMutations } from '@/api/mutations';
import { boardQueries } from '@/api/queries';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Comment from '@/components/ui/Comment/CommentSection';
import Dropdown from '@/components/ui/Dropdown';
import { userAtom } from '@/store/authAtom';
import {
  type CreateCommentRequest,
  createCommentRequestSchema,
} from '@/types/CommentRequestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

  if (!allData) return null;

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

      <Comment.Form
        register={register}
        error={errors.content}
        onSubmit={handleSubmit(onSubmit)}
      />

      <Comment.List
        comments={allData}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
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
