import Avatar from '@/components/ui/Avatar';
import { userAtom } from '@/store/authAtom';
import type { CommentAuthor, CommentData } from '@/types/commentType';
import { formatRelativeTime } from '@/utils/formatters';
import { useAtomValue } from 'jotai';
import { type ReactNode, useState } from 'react';
import Button from '../Button';
import TextareaField from '../Textarea/TextareaField';

export interface CommentItemProps {
  comment: CommentData;
  author: CommentAuthor;
  children: ReactNode;
  // props 간소화를 위해 수정 관련 props를 하나의 객체로 묶음
  editActions?: {
    isEditMode: boolean;
    onSubmit: (newContent: string) => void;
    onEditCancel: () => void;
  };
}

export default function CommentItem({
  comment,
  author,
  children,
  editActions,
}: CommentItemProps) {
  const user = useAtomValue(userAtom);
  const showActions = author?.id === user?.id && !editActions?.isEditMode;
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editActions && editedContent.trim()) {
      editActions.onSubmit(editedContent);
    }
  };

  // 수정 ui
  if (editActions?.isEditMode) {
    return (
      <li className='bg-bg-secondary -mx-[22px] px-[22px] py-5 md:-mx-10 md:px-10 lg:-mx-[60px] lg:px-[60px]'>
        <form className='flex flex-col gap-2' onSubmit={handleFormSubmit}>
          <div className='flex gap-4'>
            <Avatar size='md' imgSrc={author?.image ?? null} />

            <div className='md:text-md w-full text-xs'>
              <span className='mb-[6px] inline-block font-bold'>
                {author?.nickname}
              </span>
              <TextareaField
                value={editedContent}
                className='[&_textarea]:bg-bg-primary'
                onChange={e => setEditedContent(e.target.value)}
              />
            </div>
          </div>

          <div className='flex gap-2 self-end'>
            <Button
              variant='ghost'
              type='button'
              size='sm'
              className='hover:bg-bg-tertiary w-auto'
              onClick={editActions.onEditCancel}
            >
              취소
            </Button>
            <Button variant='outline' className='w-auto' size='sm'>
              수정하기
            </Button>
          </div>
        </form>
      </li>
    );
  }

  // 조회 ui
  return (
    <li className='border-border-primary flex items-start gap-2 border-t py-3 md:gap-4 md:py-5'>
      <Avatar size='md' imgSrc={author?.image ?? null} />

      <div className='md:text-md w-full text-xs'>
        <span className='mb-[6px] inline-block font-bold'>
          {author?.nickname}
        </span>
        <p className='mb-1 whitespace-pre-wrap'>{comment.content}</p>
        <span className='text-text-default'>
          {formatRelativeTime(comment.createdAt)}
        </span>
      </div>

      {/* 수정/삭제 드롭다운 */}
      {showActions && children}
    </li>
  );
}
