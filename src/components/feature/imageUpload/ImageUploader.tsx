import ImageIcon from '@/assets/icons/ImageIcon.svg?react';
import { XIcon } from 'lucide-react';
import { useRef, useState } from 'react';

const MAX_IMAGE_COUNT = 5;

export default function ImageUploader() {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = MAX_IMAGE_COUNT - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots); // 남은 갯수만큼만 파일 추가

    const fileReaders = Array.from(files)
      .slice(0, filesToProcess)
      .map(file => {
        return new Promise<string>(resolve => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      });

    const results = await Promise.all(fileReaders); // FileReader가 파일들을 순서대로 읽지 않아서(비동기) 첨부된 모든 파일을 읽었을 때만 setImages 업데이트
    setImages(prev => [...prev, ...results]);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <section>
      <div className='relative flex flex-col content-stretch items-start gap-2'>
        <div className='flex flex-wrap gap-2'>
          {/* 이미지 등록 버튼 */}
          {images.length < MAX_IMAGE_COUNT && (
            <>
              <button
                type='button'
                title='이미지 등록하기'
                onClick={handleUploadClick}
                className='border-border-primary relative flex size-20 shrink-0 items-center justify-center gap-3 rounded-xl border transition-colors hover:bg-slate-50 md:size-[120px]'
              >
                <div className='relative flex flex-col items-center gap-2 md:gap-4'>
                  <ImageIcon />
                  <span className='text-text-default'>{images.length}/5</span>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                multiple
                onChange={handleFileSelect}
                className='hidden'
              />
            </>
          )}

          {/* 이미지 미리보기 */}
          <ol className='flex gap-2'>
            {images.map((src, i) => (
              <li
                key={i}
                className='group relative size-20 shrink-0 overflow-hidden rounded-[12px] md:size-[120px]'
              >
                <img
                  src={src}
                  alt='이미지 미리보기'
                  className='size-full object-cover'
                />
                <button
                  type='button'
                  className='absolute top-1 right-1 rounded-full bg-slate-900/70 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-900'
                  aria-label='이미지 등록 취소'
                  onClick={() => handleRemoveImage(i)}
                >
                  <XIcon className='size-4 text-white' />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
