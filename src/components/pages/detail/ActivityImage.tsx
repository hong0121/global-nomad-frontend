import { Activity } from '@/src/types/activityType';
import Image from 'next/image';

interface Props {
  activity: Activity;
}

export default function ActivityImage({ activity }: Props) {
  return (
    <>
      {/* 체험 이미지 (추후 교체 예정) */}
      <section className='flex gap-1.5'>
        <div className='relative w-1/2 h-[246px] md:h-[400px]'>
          <Image
            src='/images/Dancing.jpg'
            alt='체험이미지'
            fill
            className='object-cover object-center rounded-tl-3xl rounded-bl-3xl'
            sizes='(max-width: 744px) 100vw, 50vw'
            priority
          />
        </div>
        <div className='flex flex-col gap-1.5 w-1/2'>
          <div className='relative w-full h-30 md:h-[197px]'>
            <Image
              src='/images/Dancing2.jpg'
              alt='체험이미지'
              fill
              className='object-cover object-center rounded-tr-3xl'
              sizes='(max-width: 744px) 100vw, 50vw'
            />
          </div>
          <div className='relative w-full h-30 md:h-[197px]'>
            <Image
              src='/images/Dancing3.jpg'
              alt='체험이미지'
              fill
              className='object-cover object-center rounded-br-3xl'
              sizes='(max-width: 744px) 100vw, 50vw'
            />
          </div>
        </div>
      </section>
    </>
  );
}
