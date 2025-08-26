import { useState } from 'react';
import Image from 'next/image';

import { formatDate } from '@/src/utils/formatDate';
import { submitReview } from '@/src/services/createReview';
import StarRating from '@/src/components/primitives/StarRating';
import Button from '@/src/components/primitives/Button';

type ReviewModalProps = {
  isOpen: boolean;
  reservation: {
    id: number;
    activity: { title: string };
    date: string;
    startTime: string;
    endTime: string;
    headCount: number;
  } | null;
  onClose: () => void;
};

export default function ReviewModal({
  isOpen,
  reservation,
  onClose,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const maxLength = 100;

  if (!isOpen || !reservation) return null;

  const {
    activity,
    date: rawDate,
    startTime,
    endTime,
    headCount,
  } = reservation;
  const date = formatDate(rawDate);

  const handleSubmit = async () => {
    if (!reservation) return;

    try {
      await submitReview(reservation.id, {
        rating,
        content,
      });

      onClose();
      console.log('리뷰 작성 완료');
    } catch (err) {
      console.error(`리뷰 작성 실패`, err);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-50' onClick={onClose} />
      <div className='relative flex flex-col justify-center items-center w-[322px] h-[493px] bg-white rounded-[30px] p-6 shadow-[0_4px_24px_0_#9CB4CA33] md:w-[385px] md:h-[549px]'>
        <Image
          src='/images/icons/DeleteIcon.svg'
          alt='리뷰 점수'
          width={24}
          height={24}
          className='absolute top-5 right-6'
          onClick={onClose}
        />
        <p className='text-black text-14 font-bold mb-1.5 md:text-16'>
          {activity.title}
        </p>
        <p className='text-gray-500 text-13 font-medium mb-3.5 md:text-14'>{`${date} / ${startTime} ~ ${endTime} (${headCount}명)`}</p>
        <StarRating
          onChange={(value) => setRating(value)}
          className='mb-5 md:mb-[30px] gap-1 md:gap-2'
        />
        <span className='block w-full text-start text-16 md:text-18 font-bold mb-3 md:mb-4 '>
          소중한 경험을 들려주세요
        </span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxLength}
          placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요'
          className='text-start border border-gray-100 rounded-xl p-5 resize-none w-full h-[179px] overflow-y-auto text-14-body md:text-16-body font-medium shadow-[0_4px_24px_0_#9CB4CA33] mb-2 focus:outline-none'
        />
        <span className='block w-full text-end mb-5 md:mb-[30px] text-gray-600 text-13'>
          {content.length}/{maxLength}
        </span>
        <Button
          onClick={handleSubmit}
          variant='primary'
          className='w-full text-14 md:py-3.5 md:text-16 '
        >
          작성하기
        </Button>
      </div>
    </div>
  );
}
