import MyReservationCard from '@/src/components/pages/myReservation/MyReservationCard';
import Button from '@/src/components/primitives/Button';
import EmptyList from '@/src/components/primitives/EmptyList';
import ConfirmModal from '@/src/components/primitives/modal/ConfirmModal';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { cancelMyReservation } from '@/src/services/pages/myReservation/api';
import { queries } from '@/src/services/primitives/queries';
import {
  MyReservationItem,
  MyReservationListResponse,
} from '@/src/types/myReservationType';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import ReviewModal from '../../primitives/modal/ReviewModal';
import AlertModal from '../../primitives/modal/AlertModal';

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
  const queryClient = useQueryClient();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [reservationId, setReservationId] = useState<number | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<MyReservationItem | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isEmpty = pagesData[0].totalCount === 0;
  const { loadMoreRef } = useInfiniteScroll(
    fetchNextPage,
    hasNextPage && !isFetchingNextPage
  );

  const handleOpenCancelModal = (reservationId: number) => {
    setModalOpen(true);
    setReservationId(reservationId);
  };

  const handleCancleReservation = useCallback(async () => {
    if (reservationId === null) return;

    try {
      await cancelMyReservation(reservationId);
      queryClient.invalidateQueries({
        queryKey: queries.myReservationList(),
      }); // myReservationList 쿼리키 갖고 있는 캐싱 데이터 전부 초기화
      setModalOpen(false); // 팝업 닫기
    } catch (error) {
      const err = error as AxiosError;

      console.log(err);

      if (err.response?.status === 403) {
        alert('취소 권한이 없습니다.');
      }
    }
  }, [reservationId]);

  const handleOpenReviewModal = (reservation: MyReservationItem) => {
    setSelectedReservation(reservation);
    setReviewModalOpen(true);
  };

  const handleReviewSuccess = (message: string) => {
    setReviewModalOpen(false);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleReviewError = (message: string) => {
    setReviewModalOpen(false);
    setAlertMessage(message);
    setAlertOpen(true);
  };

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
        <>
          <ul>
            {pagesData.map((page) =>
              page.reservations.map((reservation) => (
                <li
                  key={reservation.id}
                  className='pt-5 pb-[30px] border-t border-t-gray-50 lg:mb-6 lg:pb-0 lg:pt-0 lg:border-t-0'
                >
                  <MyReservationCard
                    reservation={reservation}
                    onCancel={handleOpenCancelModal}
                    onWriteReview={handleOpenReviewModal}
                  />
                </li>
              ))
            )}
          </ul>
          <div ref={loadMoreRef} />
          <ConfirmModal
            isOpen={modalOpen}
            message={`예약을 취소하시겠어요?`}
            onConfirm={handleCancleReservation}
            onCancel={() => setModalOpen(false)}
          />
          <ReviewModal
            isOpen={reviewModalOpen}
            reservation={selectedReservation}
            onClose={() => setReviewModalOpen(false)}
            onSuccess={handleReviewSuccess}
            onError={handleReviewError}
          />
          <AlertModal
            isOpen={alertOpen}
            message={alertMessage}
            onClose={() => setAlertOpen(false)}
          />
        </>
      )}
    </div>
  );
}
