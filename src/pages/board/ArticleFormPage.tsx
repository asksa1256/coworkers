import LeftArrowIcon from '@/assets/icons/LeftArrowIcon.svg?react';
import ArticleForm from '@/components/feature/form/ArticleForm';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function ArticleFormPage() {
  const navigate = useNavigate();

  return (
    <section className='flex justify-center'>
      <div className='bg-bg-primary relative my-4 w-full rounded-[20px] px-[22px] py-10 shadow-sm md:my-[68px] md:px-10 md:pt-[54px] md:pb-[120px] lg:max-w-280 lg:px-[60px] lg:py-[88px]'>
        <Button
          type='button'
          variant='ghost'
          round='sm'
          className='group bg-bg-primary text-text-default hover:text-text-primary hover:bg-bg-secondary mb-8 flex w-auto items-center transition-colors'
          onClick={() => navigate(-1)}
        >
          <LeftArrowIcon className='group-hover:text-text-primary' />
          돌아가기
        </Button>

        <ArticleForm />
      </div>
    </section>
  );
}
