// 테스트용 임시 페이지

'use client';

import AlertModal from '@/src/components/modal/AlertModal';
import ConfirmModal from '@/src/components/modal/ConfirmModal';
import ReviewModal from '@/src/components/modal/ReviewModal';
import { useState } from 'react';

export default function ModalTestPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  // 임시 체험 내용
  const dummyReservation = {
    id: 1,
    activity: { title: '요가 클래스' },
    date: '2025-09-01',
    startTime: '10:00',
    endTime: '12:00',
    headCount: 3,
  };

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold mb-4'>모달 테스트 페이지</h1>

      <button
        className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
        onClick={() => setAlertOpen(true)}
      >
        Alert 열기
      </button>

      <button
        className='bg-green-500 text-white px-4 py-2 rounded mr-2'
        onClick={() => setConfirmOpen(true)}
      >
        Confirm 열기
      </button>

      <button
        className='bg-yellow-500 text-white px-4 py-2 rounded'
        onClick={() => setReviewOpen(true)}
      >
        Review 열기
      </button>

      <AlertModal
        isOpen={alertOpen}
        message='이미 사용 중인 이메일입니다.'
        onClose={() => setAlertOpen(false)}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        message={`저장되지 않았습니다.\n정말 뒤로 가시겠습니까?`}
        onConfirm={() => setConfirmOpen(false)}
        onCancel={() => setConfirmOpen(false)}
      />

      <ReviewModal
        isOpen={reviewOpen}
        reservation={dummyReservation}
        onClose={() => setReviewOpen(false)}
      />
    </div>
  );
}
