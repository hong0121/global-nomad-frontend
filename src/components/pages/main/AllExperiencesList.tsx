import MainExperienceCard from '@/src/components/pages/main/MainExperienceCard';
import EmptyList from '@/src/components/primitives/EmptyList';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import Pagination from '@/src/components/primitives/Pagination';
import { ActivitiesResponse } from '@/src/types/activityType';

interface Props {
  isLoading: boolean;
  data: ActivitiesResponse | undefined;
  onPageChange: (value: number) => void;
  currentPage: number;
  itemsPerPage: number;
}

export default function AllExperiencesList({
  isLoading,
  data,
  onPageChange,
  currentPage,
  itemsPerPage,
}: Props) {
  if (isLoading)
    return (
      <div className='flex justify-center items-center py-10'>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className='mt-6 md:mt-[30px]'>
      {!!data ? (
        <>
          <ul className='grid grid-cols-2 gap-[18px] md:gap-x-5 md:gap-y-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-[30px]'>
            {data.activities.map((activity) => (
              <li key={activity.id}>
                <MainExperienceCard activity={activity} />
              </li>
            ))}
          </ul>
          <div className='mt-6 md:mt-[30px]'>
            <Pagination
              currentPage={currentPage}
              totalItems={data?.totalCount}
              itemsPerPage={itemsPerPage}
              onPageChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <EmptyList>아직 등록된 체험이 없습니다.</EmptyList>
      )}
    </div>
  );
}
