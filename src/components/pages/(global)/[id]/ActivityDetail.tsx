import Image from 'next/image';
import { Activity } from '@/src/services/pages/[id]/Activity';
import { ReviewResponse } from '@/src/services/pages/[id]/Review';
import RatingText from './RatingText';

interface Props {
  activity: Activity;
  reviewData: ReviewResponse;
}

export default function ActivityDetail({ activity, reviewData }: Props) {
  const reviews = reviewData.reviews;

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
              <Image src='/images/icons/StarIcon.svg' alt='체험별점' fill />
            </div>
            <span className='text-gray-500 text-14 font-medium'>
              {activity.reviewCount}개의 후기
            </span>
          </div>
        </div>

        {/* 리뷰 3개씩 목록으로 표시 (예정) */}
        <article className='w-full rounded-3xl p-5 shadow-[0px_4px_24px_0px_#9CB4CA] mb-5'>
          <h3 className='inline-block text-14 font-semibold mb-2 md:text-16 md:font-bold'>
            작성자명{' '}
            <span className='text-gray-300 text-12 font-semibold md:text-14 md:font-medium'>
              작성일자
            </span>
          </h3>
          <div className='relative w-4 h-4 mb-2'>
            <Image src='/images/icons/StarIcon.svg' alt='체험별점' fill />
          </div>
          <p className='text-14 font-medium md:text-16'>
            저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말
            즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게
            정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤
            수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말
            친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과
            춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극
            추천합니다!"
          </p>
        </article>

        {/* 임시 페이지네이션 UI */}
        <div className='flex justify-center gap-2 w-full mt-10 mb-20'>
          <button>이전</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>다음</button>
        </div>
      </section>
    </>
  );
}
