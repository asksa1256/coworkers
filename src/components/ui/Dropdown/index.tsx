import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown/DropdownElements';

export interface MenuItem {
  label: string;
  onClick?: () => void;
}

interface DropdownBaseProps {
  align?: 'start' | 'center' | 'end';
}

// 셀렉트 형태 드롭다운
export interface SelectDropdownProps extends DropdownBaseProps {
  triggerChildren: string;
  menuItems: string[];
  suffix: React.ReactNode;
  onSelect: (value: string) => void;
}

// 아이콘 형태 드롭다운
export interface IconDropdownProps extends DropdownBaseProps {
  triggerChildren: React.ReactNode;
  menuItems: MenuItem[];
  suffix?: never;
  onSelect?: never; // onSelect 대신 onClick 사용
}

export type DropdownProps = SelectDropdownProps | IconDropdownProps;

export default function Dropdown({
  triggerChildren,
  suffix,
  menuItems,
  align = 'start',
  onSelect,
}: DropdownProps) {
  const handleItemClick = (item: string | MenuItem) => {
    if (typeof item === 'string') {
      // 셀렉트 형태: onSelect 호출
      onSelect?.(item);
    } else {
      // 아이콘 형태: onClick 실행
      item.onClick?.();
    }
  };

  const isSelectTrigger = typeof triggerChildren === 'string';

  return (
    <DropdownMenu>
      {/* 드롭다운 트리거 */}
      {isSelectTrigger ? (
        // 셀렉트 트리거
        <DropdownMenuTrigger suffix={suffix as React.ReactNode}>
          {triggerChildren}
        </DropdownMenuTrigger>
      ) : (
        // 아이콘 트리거
        <DropdownMenuTrigger>{triggerChildren}</DropdownMenuTrigger>
      )}

      {/* 드롭다운 메뉴 */}
      <DropdownMenuContent align={align}>
        {menuItems.map((item, i) => {
          const text = typeof item === 'string' ? item : item.label;

          return (
            <DropdownMenuItem key={i} onClick={() => handleItemClick(item)}>
              {text}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
