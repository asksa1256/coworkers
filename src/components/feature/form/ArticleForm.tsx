import { articleMutations } from '@/api/mutations';
import ImageUploader from '@/components/feature/imageUpload/ImageUploader';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/Input/InputField';
import { Label } from '@/components/ui/Label';
import TextareaField from '@/components/ui/Textarea/TextareaField';
import usePreventUnsavedChanges from '@/hooks/usePreventUnsavedChanged';
import {
  type CreateArticleRequest,
  createArticleRequestSchema,
} from '@/types/ArticleRequestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

interface ArticleFormType {
  title: string;
  content: string;
  image?: string;
}

interface ArticleFormProps {
  initialValue?: ArticleFormType;
}

export default function ArticleForm({ initialValue }: ArticleFormProps) {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    control,
  } = useForm({
    resolver: zodResolver(createArticleRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      title: initialValue?.title || '',
      content: initialValue?.content || '',
      image: initialValue?.image || '',
    },
  });

  const isEditMode = !!initialValue;

  const queryClient = useQueryClient();

  const { mutate: createMutate } = useMutation(
    articleMutations.createArticleMutationOptions(queryClient),
  );

  const { mutate: updateMutate } = useMutation(
    articleMutations.updateArticleMutationOptions(
      Number(articleId),
      queryClient,
    ),
  );

  const { confirmSave } = usePreventUnsavedChanges({ isDirty });

  const onSubmit = (formData: CreateArticleRequest) => {
    const payload = {
      title: formData.title,
      content: formData.content,
      image: formData.image,
    };

    if (isEditMode) {
      updateMutate(payload, {
        onSuccess: () => {
          confirmSave();
          navigate(`/board/${articleId}`);
        },
      });
    } else {
      createMutate(payload, {
        onSuccess: data => {
          confirmSave();
          const newArticleId = data.id;
          navigate(`/board/${newArticleId}`, { replace: true });
        },
      });
    }
  };

  const isSubmittingText =
    isEditMode && isSubmitting ? '수정중...' : '등록중...';
  const submitText = isEditMode ? '수정하기' : '등록하기';

  const isEditInvalid = !isDirty || !isValid || isSubmitting;
  const isCreateInvalid = !isValid || isSubmitting;

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
            className='[&_textarea]:min-h-60 [&_textarea]:md:!text-base'
          />
        </div>

        <div className='flex flex-col gap-3'>
          <Label className='text-md font-bold md:text-base'>이미지</Label>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <ImageUploader value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <Button disabled={isEditMode ? isEditInvalid : isCreateInvalid}>
        {isSubmitting ? isSubmittingText : submitText}
      </Button>
    </form>
  );
}
