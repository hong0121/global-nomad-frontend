import { Activity } from '@/src/types/activityType';
import Image from 'next/image';

interface Props {
  activity: Activity;
}

export default function ActivityImage({ activity }: Props) {
  return (
    <>
      <section className='flex gap-1.5'>
        <div className='relative w-1/2 h-[246px] md:h-[400px]'>
          <Image
            src={activity.bannerImageUrl}
            alt={activity.title}
            fill
            className='object-cover object-center rounded-tl-3xl rounded-bl-3xl'
            sizes='(max-width: 744px) 100vw, 50vw'
            priority
          />
        </div>
        <div className='flex flex-col gap-1.5 w-1/2'>
          {activity.subImages.map((img, idx) => (
            <div key={img.id} className='relative w-full h-30 md:h-[197px]'>
              <Image
                src={img.imageUrl}
                alt={activity.title}
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
          ))}
        </div>
      </section>
    </>
  );
}
