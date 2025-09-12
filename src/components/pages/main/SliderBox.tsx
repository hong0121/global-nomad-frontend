'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MainExperienceCard from '@/src/components/pages/main/MainExperienceCard';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { cn } from '@/src/utils/cn';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import EmptyList from '@/src/components/primitives/EmptyList';
import { queries } from '@/src/services/primitives/queries';

const ArrowCommonStyle =
  'hidden absolute top-1/2 -translate-y-1/2 w-[54px] h-[54px] border border-[rgba(0,0,0,0.3)] bg-white rounded-full z-[1] md:flex md:items-center md:justify-center disabled:opacity-0';

const MAX_SIZE = 10;

export default function SliderBox() {
  const {
    isLoading,
    hasNextPage,
    data: popularExperiences,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...queries.popularActivitiesOptions(MAX_SIZE),
  });

  const pagesData = popularExperiences?.pages ?? [];

  if (isLoading)
    return (
      <div className='flex justify-center items-center py-10'>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className='relative'>
      {pagesData.length === 0 ? (
        <EmptyList>등록된 체험이 없습니다.</EmptyList>
      ) : (
        <>
          <Swiper
            modules={[Navigation]}
            spaceBetween={12}
            slidesPerView={2.5}
            slidesPerGroup={2}
            navigation={{
              prevEl: '.prev-btn',
              nextEl: '.next-btn',
            }}
            breakpoints={{
              744: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 24,
              },
            }}
            onReachEnd={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            className='pt-[14px]! pb-[15px]! px-6! -mx-6! md:pt-4! md:px-[13px]! md:-mx-[13px]! lg:pt-5!'
          >
            {pagesData.map((page) =>
              page.activities.map((activitie) => (
                <SwiperSlide key={activitie.id}>
                  <MainExperienceCard activity={activitie} />
                </SwiperSlide>
              ))
            )}
          </Swiper>

          <button
            className={cn(
              ArrowCommonStyle,
              'prev-btn -left-[15px] lg:-left-[28px]'
            )}
          >
            <Image
              src='/images/icons/SliderArrow.svg'
              width={24}
              height={24}
              alt='이전으로'
              className='rotate-180'
            />
          </button>
          <button
            className={cn(
              ArrowCommonStyle,
              'next-btn -right-[15px] lg:-right-[28px]'
            )}
          >
            <Image
              src='/images/icons/SliderArrow.svg'
              width={24}
              height={24}
              alt='다음으로'
            />
          </button>
        </>
      )}
    </div>
  );
}
