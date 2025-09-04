'use client';

import ConfirmModal from '@/src/components/primitives/modal/ConfirmModal';
import { cancelMyReservation } from '@/src/services/pages/myReservation/api';
import { queries } from '@/src/services/primitives/queries';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface Props {
  reservationId: number;
}

export default function MyReservationCancel({ reservationId }: Props) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCancleReservation = async () => {
    try {
      await cancelMyReservation(reservationId);
      queryClient.invalidateQueries({ queryKey: queries.myReservationList() }); // myReservationList 쿼리키 갖고 있는 캐싱 데이터 전부 초기화
      setModalOpen(false); // 팝업 닫기
    } catch (error) {
      const err = error as AxiosError;

      console.log(err);

      if (err.response?.status === 403) {
        alert('취소 권한이 없습니다.');
      }
    }
  };

  return (
    <>
      <button
        className='grow-1 h-full py-[6px] px-[10px] bg-gray-50 rounded-[8px]'
        onClick={() => setModalOpen(true)}
      >
        예약 취소
      </button>
      <ConfirmModal
        isOpen={modalOpen}
        message={`예약을 취소하시겠어요?`}
        onConfirm={handleCancleReservation}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
}
