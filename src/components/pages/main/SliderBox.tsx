'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import MainExperienceCard from '@/src/components/pages/main/MainExperienceCard';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { cn } from '@/src/utils/cn';

const ArrowCommonStyle =
  'hidden absolute top-1/2 -translate-y-1/2 w-[54px] h-[54px] border border-[rgba(0,0,0,0.3)] bg-white rounded-full z-[1] md:flex md:items-center md:justify-center disabled:opacity-0';

export default function SliderBox() {
  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={2.5}
        navigation={{
          prevEl: '.prev-btn',
          nextEl: '.next-btn',
        }}
        breakpoints={{
          744: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className='pt-[14px]! pb-[15px]! px-6! -mx-6! md:pt-4! md:px-[13px]! md:-mx-[13px]! lg:pt-5!'
      >
        <SwiperSlide>
          <MainExperienceCard />
        </SwiperSlide>
        <SwiperSlide>
          <MainExperienceCard />
        </SwiperSlide>
        <SwiperSlide>
          <MainExperienceCard />
        </SwiperSlide>
        <SwiperSlide>
          <MainExperienceCard />
        </SwiperSlide>
        <SwiperSlide>
          <MainExperienceCard />
        </SwiperSlide>
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
    </div>
  );
}
