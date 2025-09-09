import AllExperiencesList from '@/src/components/pages/main/AllExperiencesList';
import SortDropdown from '@/src/components/pages/main/SortDropdown';

export default function AllExperiencesSection() {
  return (
    <section className='mt-[25px] md:mt-[65px]'>
      <div className='flex justify-between items-center flex-wrap gap-[10px] md:gap-4 lg:gap-5'>
        <h2 className='text-18 font-bold md:text-32 lg:w-full'>🛼 모든 체험</h2>
        <div className='lg:order-3'>
          <SortDropdown />
        </div>
        <div className='w-full shrink-0 lg:shrink-1 lg:w-auto'>
          카테고리 영역
        </div>
      </div>
      <AllExperiencesList />
    </section>
  );
}
