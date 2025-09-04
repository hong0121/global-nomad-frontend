import MyReservationCard from '@/src/components/pages/myReservation/MyReservationCard';
import Button from '@/src/components/primitives/Button';
import EmptyList from '@/src/components/primitives/EmptyList';
import { MyReservationListResponse } from '@/src/types/myReservationType';
import { useRouter } from 'next/navigation';

interface Props {
  pagesData: MyReservationListResponse[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function MyReservationList({
  pagesData,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {
  const router = useRouter();
  const isEmpty = pagesData[0].totalCount === 0;

  return (
    <div>
      {isEmpty ? (
        <EmptyList message='아직 예약한 체험이 없어요'>
          <Button
            size='lg'
            className='w-[182px]'
            onClick={() => router.push('/')}
          >
            둘러보기
          </Button>
        </EmptyList>
      ) : (
        <ul>
          {pagesData.map((page) =>
            page.reservations.map((reservation) => (
              <li
                key={reservation.id}
                className='pt-5 pb-[30px] border-t border-t-gray-50 lg:mb-6 lg:pb-0 lg:pt-0 lg:border-b-0'
              >
                <MyReservationCard reservation={reservation} />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
