import AllExperiencesSection from '@/src/components/pages/main/AllExperiencesSection';
import PopularExperiencesSection from '@/src/components/pages/main/PopularExperiencesSection';
import SearchBar from '@/src/components/pages/main/SearchBar';
import TopBanner from '@/src/components/pages/main/TopBanner';

export default function MainPage() {
  return (
    <div className='pt-[122px] pb-[136px] bg-[center_top] bg-[100%_auto] bg-[url(/images/MainBgMO.jpg)] bg-repeat-x md:pt-[183px] md:pb-[204px] md:bg-[url(/images/MainBgTB.jpg)] lg:pb-[218px] lg:bg-auto lg:bg-[url(/images/MainBgPC.jpg)]'>
      <div className='px-6 md:px-0 md:w-[calc(100%-60px)] md:max-w-[1120px] md:mx-auto'>
        <TopBanner />
        <SearchBar />
        <PopularExperiencesSection />
        <AllExperiencesSection />
      </div>
    </div>
  );
}
