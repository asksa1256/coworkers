import { boardQueries } from '@/api/queries';
import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import LeftArrowIcon from '@/assets/icons/LeftArrowIcon.svg?react';
import ArticleDeleteModal from '@/components/feature/articles/ArticleDeleteModal';
import ArticleCommentSection from '@/components/feature/comments/ArticleCommentSection';
import LikeButton from '@/components/feature/like/LikeButton';
import LikeFloatingButton from '@/components/feature/like/LikeFloatingButton';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import EmptyContent from '@/components/ui/EmptyContent';
import { Spinner } from '@/components/ui/spinner';
import useModal from '@/hooks/useModal';
import { userAtom } from '@/store/authAtom';
import { formatRelativeTime } from '@/utils/formatters';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';

export default function ArticleDetailPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const { openModal } = useModal();

  const articleIdNum = Number(articleId);

  const { data, isPending, isError } = useQuery(
    boardQueries.articleOptions(Number(articleIdNum)),
  );

  const handleEdit = () => {
    navigate(`/board/${articleId}/edit`, {
      state: { article: data },
    });
  };

  const handleDelete = () => {
    openModal({
      children: () => <ArticleDeleteModal articleId={Number(articleIdNum)} />,
    });
  };

  const MODIFY_DELETE_DROPDOWN_MAP = [
    { label: '수정하기', onClick: handleEdit },
    { label: '삭제하기', onClick: handleDelete },
  ];

  const isEmpty = !isPending && !isError && !data;

  return (
    <article className='lg:flex lg:justify-center lg:gap-[26px]'>
      <div className='bg-bg-primary relative my-4 w-full rounded-[20px] px-[22px] py-10 shadow-sm md:my-[68px] md:px-10 md:pt-[54px] md:pb-[120px] lg:max-w-280 lg:px-[60px] lg:py-[88px]'>
        {isPending && (
          <div className='flex flex-col items-center justify-center gap-2'>
            <Spinner />
            불러오는 중...
          </div>
        )}

        {isError && (
          <div className='flex flex-col items-center justify-center gap-2'>
            <p className='text-text-default text-md font-medium lg:text-base'>
              게시글 불러오기에 실패했습니다.
            </p>
          </div>
        )}

        {isEmpty && (
          <EmptyContent>
            <p className='text-text-default text-md font-medium lg:text-base'>
              게시글이 삭제되었거나 존재하지 않습니다.
            </p>
          </EmptyContent>
        )}

        {data && (
          <>
            <Button
              type='button'
              variant='ghost'
              round='sm'
              className='group bg-bg-primary text-text-default hover:text-text-primary hover:bg-bg-secondary mb-8 flex w-auto items-center transition-colors'
              onClick={() => navigate(-1)}
            >
              <LeftArrowIcon className='group-hover:text-text-primary' />
              돌아가기
            </Button>

            <div className='border-border-primary flex flex-col gap-4 border-b pb-3'>
              <div className='flex items-center justify-between'>
                <h4 className='text-2lg font-bold md:text-xl'>{data.title}</h4>

                {user?.id === data.writer.id && (
                  <Dropdown
                    type='icon'
                    menuItems={MODIFY_DELETE_DROPDOWN_MAP}
                    triggerChildren={<KebabIcon />}
                    align='end'
                    className='text-center'
                  />
                )}
              </div>

              <div className='md:text-md flex items-center gap-2 text-xs'>
                <Avatar size='sm' imgSrc={null} />
                <span className='font-medium'>{data.writer.nickname}</span>|
                <span className='text-text-default font-medium'>
                  {formatRelativeTime(data.createdAt)}
                </span>
              </div>
            </div>

            <div className='mt-4 md:mt-[28px]'>
              <p className='text-md mb-5 whitespace-pre-line md:mb-6 md:text-base'>
                {data.content}
              </p>
              {data.image && (
                <div className='aspect-square w-[140px] overflow-hidden rounded-xl md:w-[200px]'>
                  <img
                    src={data.image}
                    alt=''
                    className='h-full w-full overflow-clip object-cover [overflow-clip-margin:unset]'
                  />
                </div>
              )}

              {/* 좋아요 버튼 (mobile ~ tablet: 컨텐츠 내부) */}
              <div className='mt-4 md:mt-[28px]'>
                <LikeButton likeCount={data.likeCount} isLiked={data.isLiked} />
              </div>
            </div>

            {/* 댓글 */}
            <ArticleCommentSection
              articleId={data.id}
              commentCount={data.commentCount}
            />
          </>
        )}
      </div>

      {/* 좋아요 버튼 (desktop: floating) */}
      <LikeFloatingButton
        likeCount={data?.likeCount ?? 0}
        isLiked={data?.isLiked ?? false}
        disabled={!data}
      />
    </article>
  );
}
