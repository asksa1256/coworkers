import { articleCommentMutations } from '@/api/mutations';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function ArticleCommentDeleteModal({
  commentId,
  content,
  articleId,
}: {
  commentId: number;
  content?: string;
  articleId: number;
}) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate: deleteArticleCommentMutate, isPending } = useMutation(
    articleCommentMutations.deleteArticleCommentOptions({
      articleId,
      queryClient,
      closeModal,
    }),
  );

  const handleClickDelete = () => {
    deleteArticleCommentMutate(commentId);
  };

  return (
    <div className='text-center'>
      <div className='mb-2 font-medium'>
        <p className='text-text-default text-md mb-2 truncate'>{content}</p>
        댓글을 삭제하시겠습니까?
      </div>

      <div className='mt-6 flex gap-2'>
        <Button
          variant='outline'
          className='text-text-default shrink-1 grow-1 border-[#CBD5E1]'
          onClick={closeModal}
        >
          닫기
        </Button>
        <Button
          variant='danger'
          className='shrink-1 grow-1'
          onClick={handleClickDelete}
          disabled={isPending}
        >
          {isPending ? '삭제중...' : '삭제하기'}
        </Button>
      </div>
    </div>
  );
}
