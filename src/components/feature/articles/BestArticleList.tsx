import { boardQueries } from '@/api/queries';
import LeftArrowIcon from '@/assets/icons/LeftArrowIcon.svg?react';
import RightArrowIcon from '@/assets/icons/RightArrowIcon.svg?react';
import useCurrentView from '@/hooks/useCurrentView';
import mapCurrentViewToPageSize from '@/utils/currentViewToPageSize';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ArticleCard from './ArticleCard';

export default function BestArticleList() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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

      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        spaceBetween={12}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={500}
        breakpoints={{
          320: { slidesPerView: 1, slidesPerGroup: 1 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {allData?.map(article => (
          <SwiperSlide key={article.id}>
            <ArticleCard article={article} isBest={true} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='absolute right-6 bottom-8 z-[1] flex gap-1 md:bottom-7 md:gap-2 lg:bottom-6'>
        <button
          ref={prevRef}
          type='button'
          className='border-border-primary rounded-full border bg-white p-2 transition-colors hover:bg-gray-100'
        >
          <LeftArrowIcon className='text-icon-primary h-4 w-4' />
        </button>
        <button
          ref={nextRef}
          type='button'
          className='border-border-primary rounded-full border bg-white p-2 transition-colors hover:bg-gray-100'
        >
          <RightArrowIcon className='text-icon-primary h-4 w-4' />
        </button>
      </div>
    </section>
  );
}
