'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { deleteActivityById } from '@/src/services/pages/myExperiences/api';
import ConfirmModal from '../../primitives/modal/ConfirmModal';
import AlertModal from '../../primitives/modal/AlertModal';

interface Props {
  activityId: number;
}

export default function DropdownList({ activityId }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();

  // 체험 삭제
  const deleteMutation = useMutation({
    mutationFn: (activityId: number) => deleteActivityById(activityId),
    onSuccess: () => {
      setModalMessage('체험이 삭제되었습니다.');
      setConfirmOpen(false);
      setAlertOpen(true);
    },
    onError: (error: unknown) => {
      let status: number | undefined;
      let message = '삭제에 실패했습니다.';

      // AxiosError 타입인지 체크
      if (axios.isAxiosError(error)) {
        status = error.response?.status;
      }

      if (status === 400)
        message = '신청 예약이 있는 체험은 삭제할 수 없습니다.';
      else if (status === 401) message = '로그인이 필요합니다.';
      else if (status === 403) message = '본인의 체험만 삭제할 수 있습니다.';
      else if (status === 404) message = '존재하지 않는 체험입니다.';

      setModalMessage(message);
      setConfirmOpen(false);
      setAlertOpen(true);
    },
  });

  // 체험 삭제 버튼 클릭
  const handleDelete = () => {
    setModalMessage('정말 삭제하시겠습니까?');
    setConfirmOpen(true);
  };

  // 삭제확인 모달 취소버튼
  const handleConfirmCancel = () => {
    setConfirmOpen(false);
  };

  // 삭제확인 모달 삭제버튼
  const handleConfirmDelete = () => {
    deleteMutation.mutate(activityId);
  };

  // 삭제 후 Alert 모달 닫으며 이동
  const handleCloseAlert = () => {
    setAlertOpen(false);
    if (deleteMutation.isSuccess) {
      router.replace('/');
    }
  };

  // 체험 수정하기 페이지로 이동
  const handleUpdate = () => {
    router.push('/myUpdateExperiences');
  };

  return (
    <>
      <div className='flex flex-col justify-around w-24 h-27 border border-[#dfdfdf] rounded-[8px] shadow-[0px_0px_3px_0px_#dde6ef]'>
        <button
          onClick={handleUpdate}
          type='button'
          className='text-16 font-medium'
          aria-label='수정하기'
        >
          수정하기
        </button>
        <button
          onClick={handleDelete}
          type='button'
          className='text-16 font-medium'
          aria-label='삭제하기'
        >
          삭제하기
        </button>

        {confirmOpen && (
          <ConfirmModal
            isOpen={confirmOpen}
            message={modalMessage}
            onConfirm={handleConfirmDelete}
            onCancel={handleConfirmCancel}
          />
        )}
        {alertOpen && (
          <AlertModal
            isOpen={alertOpen}
            message={modalMessage}
            onClose={handleCloseAlert}
          />
        )}
      </div>
    </>
  );
}
