import { cn } from '@/src/utils/cn';

export default function TopBanner() {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-end gap-2 pb-9 text-white text-center aspect-[327/181] bg-[url(/images/MainTopBanner.jpg)] bg-cover rounded-xl overflow-hidden shadow-[0px_1.45px_8.69px_rgba(156,180,202,0.2)] md:gap-3 md:pb-[72px] md:aspect-[684/375] md:rounded-[18px] lg:gap-[19px] lg:pb-[101px] lg:spect-[1120/500] lg:rounded-3xl',
        'after:content-[""] after:absolute after:inset-0 after:bg-linear-to-t after:from-black after:to-transparent after:opacity-50'
      )}
    >
      <h2 className='relative text-18 font-bold md:text-24 lg:text-32 z-[1]'>
        함께 배우면 즐거운 스트릿 댄스
      </h2>
      <h3 className='relative text-14 font-medium md:text-16 md:font-bold lg:text-18 z-[1]'>
        1월의 인기 체험 BEST 🔥
      </h3>
    </div>
  );
}
