import ImageUploader from '@/components/feature/imageUpload/ImageUploader';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import { Label } from '@/components/ui/Label';
import TextareaField from '@/components/ui/Textarea/TextareaField';
import {
  type CreateArticleRequest,
  createArticleRequestSchema,
} from '@/types/ArticleRequestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface ArticleFormType {
  title: string;
  content: string;
  image?: string;
}

interface ArticleFormProps {
  initialValue?: ArticleFormType;
}

export default function ArticleForm({ initialValue }: ArticleFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(createArticleRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      title: initialValue?.title || '',
      content: initialValue?.content || '',
      image: initialValue?.image || '',
    },
  });

  const onSubmit = (formData: CreateArticleRequest) => {
    console.log(formData);
  };

  const isEditMode = !!initialValue;

  const isSubmittingText = isEditMode ? '수정중...' : '등록중...';
  const submitText = isEditMode ? '수정하기' : '등록하기';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className='text-2lg mb-10 font-bold md:text-xl'>
        게시글 {isEditMode ? '수정' : '쓰기'}
      </h4>

      <div className='mb-12 flex flex-col gap-8 md:mb-14'>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='title' className='text-md font-bold md:text-base'>
            제목
            <sup className='text-danger text-md -ml-2 md:text-base'>*</sup>
          </Label>
          <InputField
            id='title'
            placeholder='제목을 입력해주세요.'
            {...register('title')}
            error={errors.title}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <Label htmlFor='content' className='text-md font-bold md:text-base'>
            내용
            <sup className='text-danger text-md -ml-2 md:text-base'>*</sup>
          </Label>
          <TextareaField
            id='content'
            placeholder='내용을 입력해주세요.'
            {...register('content')}
            error={errors.content}
            className='[&_textarea]:!text-md [&_textarea]:min-h-60 [&_textarea]:md:!text-base'
          />
        </div>

        <div className='flex flex-col gap-3'>
          <Label className='text-md font-bold md:text-base'>이미지</Label>
          <ImageUploader />
        </div>
      </div>

      <Button disabled={!isValid}>
        {isSubmitting ? isSubmittingText : submitText}
      </Button>
    </form>
  );
}
