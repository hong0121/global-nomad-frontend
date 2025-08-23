import twMerge from '@/src/utils/customTwMerge';
import Image from 'next/image';
import { useState } from 'react';

interface StarRatingProps {
  totalStars?: number;
  onChange?: (rating: number) => void;
  className?: string;
}

export default function StarRating({
  totalStars = 5,
  onChange,
  className,
}: StarRatingProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number>(0);

  const handleClick = (index: number) => {
    setSelectedStar(index);
    onChange?.(index);
  };

  return (
    <div className={twMerge('flex', className)}>
      {Array.from({ length: totalStars }, (_, i) => {
        const starIndex = i + 1;
        const isFilled = hoveredStar
          ? starIndex <= hoveredStar
          : starIndex <= selectedStar;

        return (
          <button
            key={starIndex}
            type='button'
            onMouseEnter={() => setHoveredStar(starIndex)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => handleClick(starIndex)}
            className='transition-opacity ease-in-out duration-300'
          >
            <Image
              src={
                isFilled
                  ? '/images/icons/StarFilled.svg'
                  : '/images/icons/StarEmpty.svg'
              }
              alt='체험 리뷰 별점'
              width={36}
              height={36}
              className='md:w-[42px] md:h-[42px]'
            />
          </button>
        );
      })}
    </div>
  );
}
