import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import Dropdown from '@/components/ui/Dropdown';
import { MODIFY_DELETE_DROPDOWN_MAP } from '@/constants';
import type { CommentResponse } from '@/types/boardTypes';
import { formatRelativeTime } from '@/utils/formatters';

interface Props {
  comment: CommentResponse;
}

export default function CommentCard({ comment }: Props) {
  return (
    <li
      key={comment.id}
      className='border-border-primary flex items-start gap-2 border-t py-3 md:gap-4 md:py-5'
    >
      <Avatar size='md' imgSrc={comment.writer.image!} />

      <div className='md:text-md w-full text-xs'>
        <span className='mb-[6px] font-bold'>{comment.writer.nickname}</span>
        <p className='mb-1'>{comment.content}</p>
        <span className='text-text-default'>
          {formatRelativeTime(comment.createdAt)}
        </span>
      </div>

      <Dropdown
        type='icon'
        menuItems={MODIFY_DELETE_DROPDOWN_MAP}
        triggerChildren={<KebabIcon className='h-5 w-5' />}
        align='end'
        className='text-center'
      />
    </li>
  );
}
