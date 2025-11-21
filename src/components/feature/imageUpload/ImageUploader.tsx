import ImageIcon from '@/assets/icons/ImageIcon.svg?react';
import useUploadImage from '@/hooks/useUploadImage';
import { XIcon } from 'lucide-react';
import { useRef } from 'react';

interface ImageUploaderProps {
  value?: string;
  onChange: (value: string | null) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleUploadImage, isUploading } = useUploadImage();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleUploadImage(e);
      if (url) onChange(url);
    } catch (err) {
      console.error('이미지 업로드 실패', err);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section>
      <div className='relative flex flex-col content-stretch items-start gap-2'>
        <div className='flex flex-wrap gap-2'>
          {/* 이미지 등록 버튼 (이미지가 없을 때만 표시) */}
          {!value && (
            <>
              <button
                type='button'
                onClick={handleUploadClick}
                className='border-border-primary relative flex size-[100px] shrink-0 items-center justify-center gap-3 rounded-xl border transition-colors hover:bg-slate-50 md:size-[120px]'
              >
                <div className='relative flex flex-col items-center gap-2 md:gap-4'>
                  <ImageIcon />
                  <span className='text-text-default text-sm'>
                    {isUploading ? '추가중...' : '추가하기'}
                  </span>
                </div>
              </button>

              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileSelect}
                className='hidden'
              />
            </>
          )}

          {/* 이미지 미리보기 */}
          {value && (
            <div className='group relative size-[100px] shrink-0 overflow-hidden rounded-[12px] md:size-[120px]'>
              <img
                src={value}
                alt='이미지 미리보기'
                className='size-full object-cover'
              />
              <button
                type='button'
                className='absolute top-1 right-1 rounded-full bg-slate-900/70 p-1'
                aria-label='이미지 등록 취소'
                onClick={handleRemoveImage}
              >
                <XIcon className='size-4 text-white' />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
