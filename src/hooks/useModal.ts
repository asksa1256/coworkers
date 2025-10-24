import { closeModalAtom, modalAtom, openModalAtom } from '@/store/modalAtom';
import { useAtomValue, useSetAtom } from 'jotai';

export default function useModal() {
  const modal = useAtomValue(modalAtom);
  const openModal = useSetAtom(openModalAtom);
  const closeModal = useSetAtom(closeModalAtom);

  return { modal, openModal, closeModal };
}
