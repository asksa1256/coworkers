import { boardQueries } from '@/api/queries';
import LeftArrowIcon from '@/assets/icons/LeftArrowIcon.svg?react';
import RightArrowIcon from '@/assets/icons/RightArrowIcon.svg?react';
import Button from '@/components/ui/Button';
import { Spinner } from '@/components/ui/spinner';
import useCurrentView from '@/hooks/useCurrentView';
import type { ArticleResponse } from '@/types/boardType';
import mapCurrentViewToPageSize from '@/utils/currentViewToPageSize';
import { useQuery } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import type { NavigationOptions } from 'swiper/types';
import ArticleCard from './ArticleCard';

export default function BestArticleList() {
  const currentView = useCurrentView();
  const pageSize = mapCurrentViewToPageSize(currentView);

  const { data, isPending, error } = useQuery(
    boardQueries.bestArticlesOptions(pageSize),
  );

  const allData = data?.list;

  return (
    <section className='bg-bg-secondary relative -mx-4 mb-[28px] px-[18px] pt-[28px] pb-[28px] md:-mx-[26px] md:px-6 md:pt-8 md:pb-6 lg:mx-0 lg:mb-11 lg:rounded-[20px] lg:pt-10 lg:pb-5'>
      <h3 className='text-2lg mb-5 font-bold md:text-xl lg:mb-6'>
        베스트 게시글
      </h3>

      <BestArticleListContent
        isPending={isPending}
        error={error}
        allData={allData}
      />
    </section>
  );
}

interface BestArticleListContentProps {
  isPending: boolean;
  error: unknown;
  allData?: ArticleResponse[];
}

function BestArticleListContent({
  isPending,
  error,
  allData,
}: BestArticleListContentProps) {
  if (isPending) return <LoadingView />;
  if (error) return <ErrorView />;

  return <SwiperView allData={allData} />;
}

function LoadingView() {
  return (
    <div className='text-md text-text-secondary flex flex-col items-center justify-center gap-2 py-10'>
      <Spinner />
      데이터를 불러오는 중입니다...
    </div>
  );
}

function ErrorView() {
  return (
    <div className='text-md text-text-secondary flex flex-col items-center justify-center gap-3 py-10'>
      게시글을 불러오지 못했습니다.
      <Button variant='ghost' className='hover:bg-bg-tertiary w-auto'>
        <RefreshCcw className='h-4 w-4' /> 재시도
      </Button>
    </div>
  );
}

interface SwiperViewProps {
  allData?: ArticleResponse[];
}

function SwiperView({ allData }: SwiperViewProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current;

      if (typeof swiper.params.navigation !== 'boolean') {
        const nav = swiper.params.navigation as NavigationOptions;
        nav.prevEl = prevRef.current;
        nav.nextEl = nextRef.current;
      }

      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <>
      <Swiper
        onInit={swiper => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay, A11y]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        spaceBetween={12}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        speed={500}
        breakpoints={{
          320: { slidesPerView: 1, slidesPerGroup: 1 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {allData?.map(article => (
          <SwiperSlide key={article.id}>
            <ArticleCard
              article={article}
              isBest={true}
              className='md:min-h-[200px]'
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='absolute right-6 bottom-8 z-[1] flex gap-1 md:bottom-7 md:gap-2 lg:bottom-6'>
        <button
          ref={prevRef}
          type='button'
          aria-label='이전 페이지'
          className='border-border-primary rounded-full border bg-white p-2 transition-colors hover:bg-gray-100'
        >
          <LeftArrowIcon className='text-icon-primary h-4 w-4' />
        </button>
        <button
          ref={nextRef}
          type='button'
          aria-label='다음 페이지'
          className='border-border-primary rounded-full border bg-white p-2 transition-colors hover:bg-gray-100'
        >
          <RightArrowIcon className='text-icon-primary h-4 w-4' />
        </button>
      </div>
    </>
  );
}
