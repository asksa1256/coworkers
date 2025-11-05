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
  value: string;
  menuItems: SelectMenuItem[];
  // defaultValue?: string;
  suffix?: React.ReactNode;
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
  const { type, align = 'start', className } = props;

  if (type === 'select') {
    return <SelectDropdown {...props} align={align} className={className} />;
  }

  return <IconDropdown {...props} align={align} className={className} />;
}

// 셀렉트 드롭다운 별도 컴포넌트
function SelectDropdown({
  menuItems,
  value, // 제어 컴포넌트 방식으로 변경 (defaultValue → value)
  suffix,
  align = 'start',
  className,
  onSelect,
}: SelectDropdownProps & { align?: 'start' | 'center' | 'end' }) {
  const selectedValue = value;

  const selectedLabel =
    menuItems.find(item => item.value === selectedValue)?.label || value;

  const handleItemClick = (value: string) => {
    onSelect(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger suffix={suffix}>{selectedLabel}</DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        {menuItems.map(item => (
          <DropdownMenuItem
            key={item.value}
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

// 아이콘 드롭다운 별도 컴포넌트
function IconDropdown({
  triggerChildren,
  menuItems,
  align = 'start',
  className,
}: IconDropdownProps & { align?: 'start' | 'center' | 'end' }) {
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
