import AllExperiencesList from '@/src/components/pages/main/AllExperiencesList';

export default function SearchResultSection() {
  return (
    <section className='mt-[46px] md:mt-[72px] lg:mt-[92px]'>
      <h2 className='text-18 font-medium md:text-24'>
        <strong>이색 체험</strong>으로 검색한 결과입니다.
      </h2>
      <span className='block mt-[10px] text-14 text-gray-700 md:text-18'>
        총 200개의 결과
      </span>
      <AllExperiencesList />
    </section>
  );
}
