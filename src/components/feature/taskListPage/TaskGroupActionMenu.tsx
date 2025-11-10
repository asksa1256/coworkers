import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Dropdown from '@/components/ui/Dropdown';

interface Props {
  id: number;
}

export default function TaskGroupActionMenu({ id }: Props) {
  return (
    <Dropdown
      align='end'
      type='icon'
      className='text-center'
      triggerChildren={<KebabIcon className='text-slate-300' />}
      menuItems={[
        {
          label: '수정하기',
          onClick: () => console.log('수정하기' + id),
        },
        {
          label: '삭제하기',
          onClick: () => console.log('삭제하기'),
        },
      ]}
    />
  );
}
