import axiosInstance from '@/lib/axios';
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

export default function useUploadImage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadImage, setUploadImage] = useState<File | null>(null); // 프리뷰용 파일 객체

  const fetchImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    setUploadImage(file);

    try {
      const res = await axiosInstance.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data.url;
    } catch (error) {
      setUploadImage(null); // 업로드 실패시 uploadImage 초기화
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

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

    return await fetchImage(file);
  };

  return { handleUploadImage, isUploading, uploadImage };
}
