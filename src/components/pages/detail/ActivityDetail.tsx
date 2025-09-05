import Image from 'next/image';
import RatingText from './RatingText';
import Map from './Map';
import { useState } from 'react';
import { REVIEWS_PER_PAGE } from '@/src/constants/pagination';
import { ReviewResponse } from '@/src/types/reviewType';
import { Activity } from '@/src/types/activityType';
import ReviewList from './ReviewList';

interface Props {
  activity: Activity;
  reviewData: ReviewResponse;
}

export default function ActivityDetail({ activity, reviewData }: Props) {
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviewData.reviews.length / REVIEWS_PER_PAGE);
  const currentReviews = reviewData.reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  return (
    <>
      {/* 체험설명 */}
      <section className='pt-5 pb-5 border-b border-gray-100 md:pt-7.5 md:pb-10 lg:pt-10 lg:pb-pb-10'>
        <h2 className='text-16 font-bold mb-2 md:text-18'>체험 설명</h2>
        <p className='text-16-body font-medium leading-[180%] tracking-[-0.025em]'>
          {activity.description}
        </p>
      </section>

      {/* 오시는길 */}
      <section className='pt-5 pb-5 border-b border-gray-100 md:pt-7.5 md:pb-10 lg:pt-10 lg:pb-pb-10'>
        <h2 className='text-16 font-bold mb-2 md:text-18'>오시는 길</h2>
        <p className='text-14 font-medium mb-2'>{activity.address}</p>
        <Map activity={activity} />
      </section>

      {/* 체험 후기 */}
      <section className='pt-5 md:pt-7.5 md:pb-10 lg:pt-10'>
        <h2 className='inline-block text-16 font-bold mb-2 md:text-18 lg:mb-[9px]'>
          체험 후기{' '}
          <span className='text-gray-500 text-14 font-semibold'>
            {activity.reviewCount}개
          </span>
        </h2>

        <div className='flex flex-col items-center w-full mb-7.5'>
          <p className='text-24 font-semibold mb-1 md:text-32 md:font-bold'>
            {activity.rating}
          </p>
          <p className='text-14 font-bold mb-1.5 md:text-16'>
            <RatingText rating={activity.rating} />
          </p>
          <div className='flex gap-0.5'>
            <div className='relative w-4 h-4'>
              <Image src='/images/icons/StarFilled.svg' alt='체험별점' fill />
            </div>
            <span className='text-gray-500 text-14 font-medium'>
              {activity.reviewCount}개의 후기
            </span>
          </div>
        </div>

        {/* 리뷰 목록 */}
        <ReviewList reviews={currentReviews} />

        {/* 임시 페이지네이션 UI  */}
        {reviewData.reviews.length > REVIEWS_PER_PAGE && (
          <div className='flex justify-center gap-2 w-full mt-10 mb-20'>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              다음
            </button>
          </div>
        )}
      </section>
    </>
  );
}
