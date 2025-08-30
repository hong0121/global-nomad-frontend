import Image from 'next/image';
import RatingText from './RatingText';
import { useState } from 'react';
import { REVIEWS_PER_PAGE } from '@/src/constants/pagination';
import { Review, ReviewResponse } from '@/src/types/reviewType';
import { Activity } from '@/src/types/activityType';
import { format } from 'date-fns';

interface Props {
  activity: Activity;
  reviewData: ReviewResponse;
}

export default function ActivityDetail({ activity, reviewData }: Props) {
  // 임시 데이터
  const mockreviewData: ReviewResponse = {
    averageRating: 4.5,
    totalCount: 4,
    reviews: [
      {
        id: 1,
        user: { profileImageUrl: '', nickname: '김철수', id: 1 },
        activityId: activity.id,
        rating: 4,
        content: '처음 체험이었지만 강사님이 친절하게 알려주셔서 즐거웠습니다!',
        createdAt: '2025-08-26T10:25:17.776Z',
        updatedAt: '2025-08-26T10:25:17.776Z',
      },
      {
        id: 2,
        user: { profileImageUrl: '', nickname: '이영희', id: 2 },
        activityId: activity.id,
        rating: 5,
        content: '친구들과 함께 와서 너무 즐거운 시간을 보냈습니다.',
        createdAt: '2025-08-25T09:15:10.000Z',
        updatedAt: '2025-08-25T09:15:10.000Z',
      },
      {
        id: 3,
        user: { profileImageUrl: '', nickname: '박민수', id: 3 },
        activityId: activity.id,
        rating: 4,
        content: '물 위에서 여유롭게 즐길 수 있었고 안전했습니다.',
        createdAt: '2025-08-24T14:40:00.000Z',
        updatedAt: '2025-08-24T14:40:00.000Z',
      },
      {
        id: 4,
        user: { profileImageUrl: '', nickname: '최지은', id: 4 },
        activityId: activity.id,
        rating: 4.8,
        content: '사진 찍기 좋은 포인트가 많아 추억 남기기 좋았습니다!',
        createdAt: '2025-08-23T11:20:00.000Z',
        updatedAt: '2025-08-23T11:20:00.000Z',
      },
    ],
  };

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = REVIEWS_PER_PAGE;
  const totalPages = Math.ceil(mockreviewData.reviews.length / reviewsPerPage);

  const currentReviews = mockreviewData.reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
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
        <div>----카카오지도 들어갈 자리----</div>
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

        {/* 리뷰 목록 (현재 임시 데이터) */}
        {currentReviews.map((review: Review) => (
          <article
            key={review.id}
            className='w-full rounded-3xl p-5 shadow-[0px_4px_24px_0px_#dde6ef] mb-10 not-even:md:mb-5'
          >
            <h3 className='inline-block text-14 font-semibold mb-2 md:text-16 md:font-bold'>
              {review.user.nickname}{' '}
              <span className='text-gray-300 text-12 font-semibold md:text-14 md:font-medium'>
                {format(
                  review.updatedAt ? review.updatedAt : review.createdAt,
                  'yyyy. M. dd'
                )}
              </span>
            </h3>
            <div className='flex md:mb-2.5'>
              {Array.from({ length: review.rating }, (_, i) => (
                <div key={i} className='relative w-4 h-4 mb-2'>
                  <Image
                    src='/images/icons/StarFilled.svg'
                    alt='체험별점'
                    fill
                  />
                </div>
              ))}
            </div>
            <p className='text-14 font-medium md:text-16'>{review.content}</p>
          </article>
        ))}

        {/* 임시 페이지네이션 UI */}
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
      </section>
    </>
  );
}
