import Image from 'next/image';
import { Review } from '@/src/types/reviewType';
import { format } from 'date-fns';

interface Props {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0)
    return (
      <div className='flex flex-col justify-center items-center mb-10'>
        <Image
          src='/images/icons/EmptyIcon.svg'
          alt='후기 없음'
          width={182}
          height={182}
        />
        <p className='text-18 font-medium text-gray-600'>
          아직 등록된 후기가 없어요
        </p>
      </div>
    );

  return (
    <>
      {reviews.map((review: Review) => (
        <article
          key={review.id}
          className='w-full rounded-3xl p-5 shadow-[0px_4px_24px_0px_#dde6ef] mb-10 not-even:md:mb-5'
        >
          <h3 className='inline-block text-14 font-semibold mb-2 md:text-16 md:font-bold'>
            {review.user.nickname}{' '}
            <span className='text-gray-300 text-12 font-semibold md:text-14 md:font-medium'>
              {format(
                review.updatedAt ? review.updatedAt : review.createdAt,
                'yyyy. M. d'
              )}
            </span>
          </h3>
          <div className='flex md:mb-2.5'>
            {Array.from({ length: review.rating }, (_, i) => (
              <div key={i} className='relative w-4 h-4 mb-2'>
                <Image src='/images/icons/StarFilled.svg' alt='체험별점' fill />
              </div>
            ))}
          </div>
          <p className='text-14 font-medium md:text-16'>{review.content}</p>
        </article>
      ))}
    </>
  );
}
