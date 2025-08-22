// 테스트용 임시 페이지

'use client';

import { useState } from 'react';
import AlertModal from '@/components/common/Modal/AlertModal';
import ConfirmModal from '@/components/common/Modal/ConfirmModal';

export default function ModalTestPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">모달 테스트 페이지</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => setAlertOpen(true)}
      >
        Alert 열기
      </button>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setConfirmOpen(true)}
      >
        Confirm 열기
      </button>

      <AlertModal
        isOpen={alertOpen}
        message="이미 사용 중인 이메일입니다."
        onClose={() => setAlertOpen(false)}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        message={`저장되지 않았습니다.\n정말 뒤로 가시겠습니까?`}
        onConfirm={() => {
          console.log('삭제');
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
