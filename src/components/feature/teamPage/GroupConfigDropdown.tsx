import ConfigIcon from '@/assets/icons/ConfigIcon.svg?react';
import type { MenuItem } from '@/components/ui/Dropdown';
import Dropdown from '@/components/ui/Dropdown';
import useModal from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import DeleteGroupModal from './DeleteGroupModal';

interface Props {
  groupId: number;
  groupName: string;
  isAdmin: boolean;
  align?: string;
}

export default function GroupConfigDropdown({
  groupId,
  groupName,
  isAdmin,
  align = 'end',
}: Props) {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const groupConfigDropdownMenu: MenuItem[] = [
    {
      label: '수정하기',
      onClick: () => {
        navigate(`/${groupId}/update-team`);
      },
    },
    {
      label: '삭제하기',
      onClick: () => {
        openModal({
          children: (
            <DeleteGroupModal
              groupId={groupId}
              groupName={groupName}
              navigate={navigate}
            />
          ),
        });
      },
    },
  ];
  const groupConfigDropdownTrigger = (
    <ConfigIcon className={cn('w-5 md:w-6', { hidden: !isAdmin })} />
  );

  return (
    <>
      <Dropdown
        type='icon'
        align={align}
        menuItems={groupConfigDropdownMenu}
        triggerChildren={groupConfigDropdownTrigger}
      />
    </>
  );
}
