import MainExperienceCard from '@/src/components/pages/main/MainExperienceCard';

export default function AllExperiencesList() {
  return (
    <div className='mt-6 md:mt-[30px]'>
      <ul className='grid grid-cols-2 gap-[18px] md:gap-x-5 md:gap-y-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-[30px]'>
        <li>
          <MainExperienceCard />
        </li>
        <li>
          <MainExperienceCard />
        </li>
        <li>
          <MainExperienceCard />
        </li>
        <li>
          <MainExperienceCard />
        </li>
        <li>
          <MainExperienceCard />
        </li>
        <li>
          <MainExperienceCard />
        </li>
        <li>
          <MainExperienceCard />
        </li>
        <li>
          <MainExperienceCard />
        </li>
      </ul>
      <div className='mt-6 md:mt-[30px]'>페이지네이션 영역</div>
    </div>
  );
}
