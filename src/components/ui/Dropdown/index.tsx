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

interface SelectMenuItem {
  label: string;
  value: string;
}

interface DropdownBaseProps {
  align?: 'start' | 'center' | 'end';
  className?: string;
}

// 셀렉트 형태 드롭다운 타입
export interface SelectDropdownProps extends DropdownBaseProps {
  type: 'select';
  triggerChildren: string;
  menuItems: SelectMenuItem[];
  suffix: React.ReactNode;
  onSelect: (value: string) => void;
}

// 아이콘 형태 드롭다운 타입
export interface IconDropdownProps extends DropdownBaseProps {
  type: 'icon';
  triggerChildren: React.ReactNode;
  menuItems: MenuItem[];
  onSelect?: never; // onSelect 대신 onClick 사용
}

export type DropdownProps = SelectDropdownProps | IconDropdownProps;

export default function Dropdown(props: DropdownProps) {
  const { type, triggerChildren, align = 'start', className } = props;

  // 셀렉트 형태 드롭다운
  if (type === 'select') {
    const { menuItems, suffix, onSelect } = props;

    const handleItemClick = (item: string) => {
      onSelect(item);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger suffix={suffix}>
          {triggerChildren}
        </DropdownMenuTrigger>

        <DropdownMenuContent align={align}>
          {menuItems.map((item, i) => (
            <DropdownMenuItem
              key={i}
              className={className}
              onClick={() => handleItemClick(item.value)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // 아이콘 형태 드롭다운
  const { menuItems } = props;

  const handleItemClick = (item: MenuItem) => {
    item.onClick?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{triggerChildren}</DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        {menuItems.map((item, i) => (
          <DropdownMenuItem
            key={i}
            className={className}
            onClick={() => handleItemClick(item)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
