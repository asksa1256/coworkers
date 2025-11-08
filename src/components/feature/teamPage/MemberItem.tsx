import KebabIcon from '@/assets/icons/KebabIcon.svg?react';
import Avatar from '@/components/ui/Avatar';
import type { MenuItem } from '@/components/ui/Dropdown';
import Dropdown from '@/components/ui/Dropdown';
import useModal from '@/hooks/useModal';
import type { MemberType } from '@/types/userType';
import MemberMailCopyModal from './MemberMailCopyModal';

interface Props {
  member: MemberType;
  isAdmin: boolean;
}

export default function MemberItem({ member, isAdmin }: Props) {
  const { openModal } = useModal();
  const memberItemDropDownMenu: MenuItem[] = [
    {
      label: '프로필',
      onClick: () => {
        handleOpenMemberMailCopyModal();
      },
    },
  ];
  const adminMemberItemDropDownMenu: MenuItem[] = [
    ...memberItemDropDownMenu,
    {
      label: '그룹에서 제외',
      onClick: () => {},
    },
  ];
  const menuItemDropdownTrigger = (
    <KebabIcon className='text-icon-secondary hover:text-icon-primary h-4 w-4' />
  );

  const handleOpenMemberMailCopyModal = () => {
    openModal({
      children: <MemberMailCopyModal member={member} />,
      closeIconButton: true,
    });
  };

  return (
    <div className='flex items-center gap-3'>
      <Avatar imgSrc={member.userImage} className='shrink-0' />
      <div className='flex grow-1 items-center'>
        <div className='w-[138px] grow-1 truncate'>
          <div className='leading-sm text-sm font-semibold'>
            {member.userName}
          </div>
          <div className='text-text-secondary text-xs'>{member.userEmail}</div>
        </div>
        <Dropdown
          type='icon'
          align='end'
          menuItems={
            isAdmin ? adminMemberItemDropDownMenu : memberItemDropDownMenu
          }
          triggerChildren={menuItemDropdownTrigger}
        />
      </div>
    </div>
  );
}
