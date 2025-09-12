import Image from 'next/image';
import Link from 'next/link';

interface MainExperienceType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  activity: MainExperienceType;
}

export default function MainExperienceCard({ activity }: Props) {
  const { id, title, price, bannerImageUrl, rating, reviewCount } = activity;

  return (
    <Link
      href={`/detail/${id}`}
      className='block rounded-[18px] shadow-[0px_2.25px_13.5px_rgba(156,180,202,0.2)] overflow-hidden md:rounded-4xl'
    >
      <div className='relative h-[176px] md:h-auto md:aspect-[332/347] lg:aspect-[262/290]'>
        <Image
          src={bannerImageUrl}
          width={332}
          height={347}
          alt={`${title}의 배너이미지`}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='relative -mt-[34px] py-4 px-[17px] bg-white rounded-[18px] shadow-[0px_-4.5px_11.25px_rgba(0,0,0,0.05)] md:py-5 md:px-[30px] md:rounded-4xl'>
        <h4 className='text-14 font-bold md:text-18 md:leading-[26px] text-ellipsis whitespace-nowrap overflow-hidden'>
          {title}
        </h4>
        <div className='flex items-center mt-1 md:mt-[2px] text-12 font-medium md:text-14'>
          <Image
            src='/images/icons/StarFilled.svg'
            width={20}
            height={20}
            alt='별 아이콘'
            className='w-3 h-3 mr-[3px] md:w-5 md:h-5 md:mr-[5px]'
          />
          {rating}
          <span className='text-gray-400 md:ml-[2px]'>({reviewCount})</span>
        </div>
        <div className='flex items-center flex-wrap gap-[2px] mt-[10px] md:mt-[18px]'>
          <strong className='text-[15px] font-bold md:text-18'>
            &#8361; {price.toLocaleString()}
          </strong>
          <span className='text-12 text-gray-400 font-medium md:text-16'>
            / 인
          </span>
        </div>
      </div>
    </Link>
  );
}
