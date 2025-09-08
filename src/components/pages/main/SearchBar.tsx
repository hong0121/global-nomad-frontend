import Button from '@/src/components/primitives/Button';
import Image from 'next/image';

export default function SearchBar() {
  return (
    <div className='mt-[33px] md:mt-[62px] lg:mt-[82px]'>
      <h2 className='mb-3 text-center text-16 font-bold md:mb-9 md:text-32'>
        무엇을 체험하고 싶으신가요?
      </h2>
      <form className='flex w-full mx-auto py-[6px] pr-2 pl-5 bg-white rounded-2xl shadow-[0px_6px_10px_rgba(13,153,255,0.05)] overflow-hidden md:py-[10px] md:w-[calc(100%-80px)] md:pr-3 md:pl-8 md:rounded-3xl'>
        <Image
          src='/images/icons/SearchIcon.svg'
          width={24}
          height={24}
          alt='검색 아이콘'
          className='self-center'
        />
        <input
          type='text'
          placeholder='내가 원하는 체험은'
          className='grow-1 w-full px-1 text-14 font-medium placeholder:text-gray-500 focus:outline-0 md:text-18 md:px-[10px]'
        />
        <Button className='w-[85px] shrink-0 md:w-[120px] md:h-[50px] lg:h-[50px] lg:rounded-[14px]'>
          검색하기
        </Button>
      </form>
    </div>
  );
}
