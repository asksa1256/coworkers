import axiosInstance from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await axiosInstance.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.url;
};

export default function useUploadImage() {
  const [preview, setPreview] = useState<File | null>(null); // 프리뷰용 파일 객체

  const { mutateAsync: uploadImageMutation, isPending } = useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: () => {
      toast.success('이미지가 업로드되었습니다.');
    },
    onError: () => {
      setPreview(null);
      toast.error('이미지 업로드에 실패했습니다.');
    },
  });

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // onChange 초기화 코드

    if (!file) return;

    // 타입 검증
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error('jpg, png, webp, avif 형식의 이미지만 업로드 가능합니다.');
      return;
    }

    // 사이즈 검증
    if (file.size > MAX_FILE_SIZE) {
      toast.error('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setPreview(file);
    const url = await uploadImageMutation(file);
    return url;
  };

  return { handleUploadImage, isUploading: isPending, preview };
}
