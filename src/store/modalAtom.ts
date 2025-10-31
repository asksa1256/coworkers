import { atom } from 'jotai';
import type { ReactElement, ReactNode } from 'react';

export interface ModalOptions {
  children: ReactNode | (() => ReactElement);
  closeIconButton?: boolean; // x 닫기 버튼 유무
  className?: string; // DialogContent 병합용 클래스 네임
  mode?: 'bottomSheet' | 'normal'; // 스타일 - 모달 모드(기본값 - bottomSheet)
  round?: 'sm' | 'lg'; // 스타일 - border-radius(기본값 - lg)
}

interface ModalAtomType {
  isOpen: boolean;
  options: ModalOptions | null;
}

export const modalAtom = atom<ModalAtomType>({
  isOpen: false,
  options: null,
});

export const openModalAtom = atom(null, (get, set, options: ModalOptions) => {
  if (options === null) return;
  set(modalAtom, {
    isOpen: true,
    options,
  });
});

export const closeModalAtom = atom(null, (get, set) => {
  set(modalAtom, prev => ({
    ...prev,
    isOpen: false,
  }));
});

// 닫기 모션 완료후 초기화용 Action
export const unmountModalAtom = atom(null, (get, set) => {
  set(modalAtom, prev => ({
    ...prev,
    options: null,
  }));
});
