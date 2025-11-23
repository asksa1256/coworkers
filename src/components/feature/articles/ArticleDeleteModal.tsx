import { deleteArticle } from '@/api/api';
import { boardQueries } from '@/api/queries';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ArticleDeleteModal({
  articleId,
}: {
  articleId: number;
}) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteCommentMutate, isPending } = useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: boardQueries.articles(),
      });
      toast.success('게시글이 삭제되었습니다.');
      navigate(`/board`, { replace: true });
      closeModal();
    },
    onError: error => {
      if (isAxiosError(error) && error.response?.status === 403) {
        toast.error('게시글 삭제 권한이 없습니다. 로그인 해주세요.');
      } else {
        toast.error('게시글 삭제 실패. 다시 시도해주세요.');
      }
      throw error;
    },
  });

  const handleClickDelete = () => {
    deleteCommentMutate();
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
