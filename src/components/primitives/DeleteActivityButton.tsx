import { deleteActivityById } from '@/src/services/pages/myExperiences/api';
import { cn } from '@/src/utils/cn';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmModal from './modal/ConfirmModal';
import AlertModal from './modal/AlertModal';

interface Props {
  activityId: number;
  className?: string;
}

export default function DeleteActivityButton({ activityId, className }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [alertRedirect, setAlertRedirect] = useState(false);
  const router = useRouter();

  const getErrorMessage = (status?: number) => {
    if (status === 400) return '신청 예약이 있는 체험은 삭제할 수 없습니다.';
    if (status === 404) return '존재하지 않는 체험입니다.';
    return '삭제에 실패했습니다.';
  };

  // 체험 삭제
  const deleteMutation = useMutation({
    mutationFn: () => deleteActivityById(activityId),
    onSuccess: () => {
      setModalMessage('체험이 삭제되었습니다.');
      setConfirmOpen(false);
      setAlertRedirect(true);
      setAlertOpen(true);
    },
    onError: (error: unknown) => {
      let status: number | undefined;
      if (axios.isAxiosError(error)) {
        status = error.response?.status;
      }
      setModalMessage(getErrorMessage(status));
      setConfirmOpen(false);
      setAlertRedirect(false);
      setAlertOpen(true);
    },
  });

  // 삭제 버튼 클릭 → ConfirmModal 열기
  const handleDelete = () => {
    setModalMessage('정말 삭제하시겠습니까?');
    setConfirmOpen(true);
  };

  // ConfirmModal에서 Cancel 클릭
  const handleConfirmCancel = () => {
    setConfirmOpen(false);
  };

  // ConfirmModal에서 Confirm 클릭
  const handleConfirmDelete = () => {
    deleteMutation.mutate();
  };

  // AlertModal 닫기
  const handleCloseAlert = () => {
    setAlertOpen(false);
    if (alertRedirect) {
      router.replace('/');
    }
  };

  return (
    <>
      <button
        type='button'
        className={cn('text-16 font-medium', className)}
        aria-label='삭제하기'
        onClick={handleDelete}
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
    </>
  );
}
