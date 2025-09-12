'use client';

import { Activity } from '@/src/types/activityType';
import Image from 'next/image';
import { useState } from 'react';
import LightBox from './DateSelector/LightBox';

interface Props {
  activity: Activity;
}

export default function ActivityImage({ activity }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [
    activity.bannerImageUrl,
    ...activity.subImages.map((img) => img.imageUrl),
  ];

  return (
    <>
      <section className='flex gap-1.5'>
        <div
          className='relative w-1/2 h-[246px] md:h-[400px] cursor-pointer'
          onClick={() => {
            setIndex(0);
            setIsOpen(true);
          }}
        >
          <Image
            src={activity.bannerImageUrl}
            alt={`${activity.title} 배너이미지`}
            fill
            className='object-cover object-center rounded-tl-3xl rounded-bl-3xl '
            sizes='(max-width: 744px) 100vw, 50vw'
            priority
          />
        </div>
        <div className='flex flex-col gap-1.5 w-1/2'>
          {activity.subImages.map((img, idx) => {
            if (idx >= 2) return null;

            return (
              <div
                key={img.id}
                className='relative w-full h-30 md:h-[197px] cursor-pointer'
                onClick={() => {
                  setIndex(idx + 1);
                  setIsOpen(true);
                }}
              >
                <Image
                  src={img.imageUrl}
                  alt={`서브 이미지 ${idx}`}
                  fill
                  className={`object-cover object-center ${
                    idx === 0
                      ? 'rounded-tr-3xl'
                      : idx === 1
                      ? 'rounded-br-3xl'
                      : ''
                  }`}
                  sizes='(max-width: 744px) 100vw, 50vw'
                />
              </div>
            );
          })}
        </div>

        {/* 이미지 클릭하면 확대 */}
        <LightBox
          images={images}
          index={index}
          setIndex={setIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </section>
    </>
  );
}
