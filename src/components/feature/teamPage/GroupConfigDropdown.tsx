import ConfigIcon from '@/assets/icons/ConfigIcon.svg?react';
import type { MenuItem } from '@/components/ui/Dropdown';
import Dropdown from '@/components/ui/Dropdown';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Props {
  groupId: number;
  isAdmin: boolean;
}

export default function GroupConfigDropdown({ groupId, isAdmin }: Props) {
  const navigate = useNavigate();
  const groupConfigDropdownMenu: MenuItem[] = [
    {
      label: '수정하기',
      onClick: () => {
        navigate(`/${groupId}/update-team`);
      },
    },
    { label: '삭제하기', onClick: () => {} },
  ];
  const groupConfigDropdownTrigger = (
    <ConfigIcon className={cn('w-5 md:w-6', { hidden: !isAdmin })} />
  );

  return (
    <>
      <Dropdown
        type='icon'
        align='end'
        menuItems={groupConfigDropdownMenu}
        triggerChildren={groupConfigDropdownTrigger}
      />
    </>
  );
}
