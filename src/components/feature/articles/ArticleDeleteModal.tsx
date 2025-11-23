import { articleMutations } from '@/api/mutations';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function ArticleDeleteModal({
  articleId,
}: {
  articleId: number;
}) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteArticleMutate, isPending } = useMutation(
    articleMutations.deleteArticleMutationOptions({
      articleId,
      queryClient,
      closeModal,
    }),
  );

  const handleClickDelete = () => {
    deleteArticleMutate(undefined, {
      // 삭제 기능은 mutate의 첫번째 인자로 넘겨줄 payload가 없으므로 undefined로 전달
      onSuccess: () => {
        navigate('/board');
      },
    });
  };

  return (
    <div className='text-center'>
      <p className='mb-2 font-medium'>게시글을 삭제하시겠습니까?</p>

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
