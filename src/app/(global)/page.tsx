import AllExperiencesSection from '@/src/components/pages/main/AllExperiencesSection';
import PopularExperiencesSection from '@/src/components/pages/main/PopularExperiencesSection';
import SearchBar from '@/src/components/pages/main/SearchBar';
import TopBanner from '@/src/components/pages/main/TopBanner';
import { cn } from '@/src/utils/cn';

export default function MainPage() {
  return (
    <div
      className={cn(
        'pt-[122px] pb-[136px]  bg-linear-to-b from-[#BBDDFF] via-[#F7FBFF] via-27% to-white md:pt-[183px] md:pb-[204px] lg:pb-[218px] ',
        'before:content-[""] before:absolute before:top-0 before:w-full before:h-full before:bg-[center_top] before:bg-auto before:bg-repeat-x before:bg-[url(/images/MainBgMO.png)] md:before:bg-[url(/images/MainBgTB.png)] lg:before:bg-[url(/images/MainBgPC.png)]'
      )}
    >
      <div className='relative px-6 md:px-0 md:w-[calc(100%-60px)] md:max-w-[1120px] md:mx-auto'>
        <TopBanner />
        <SearchBar />
        <PopularExperiencesSection />
        <AllExperiencesSection />
      </div>
    </div>
  );
}
