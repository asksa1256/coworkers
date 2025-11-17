import { boardQueries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ArticleCard from './ArticleCard';

export default function BestArticleList() {
  const { data, isPending, error } = useQuery(
    boardQueries.bestArticlesOptions(),
  );
  const allData = data?.list;

  return (
    <section className='bg-bg-secondary mb-[28px] px-[18px] pt-[28px] pb-[28px] md:px-6 md:pt-8 md:pb-6 lg:mb-11 lg:rounded-[20px] lg:pt-10 lg:pb-5'>
      <h3 className='text-2lg mb-5 font-bold md:text-xl lg:mb-6'>
        베스트 게시글
      </h3>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={12}
        loop={true}
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
    </section>
  );
}
