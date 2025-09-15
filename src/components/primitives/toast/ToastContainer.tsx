'use client';

import Toast from '@/src/components/primitives/toast/Toast';
import { useToastStore } from '@/src/store/useToastStore';
import { createPortal } from 'react-dom';

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return;

  return createPortal(
    <div className='fixed top-0 left-0 right-0 h-0 flex justify-center z-50'>
      {toasts.map((toast, idx) => (
        <Toast toast={toast} key={toast.id} order={idx + 1} />
      ))}
    </div>,
    document.getElementById('portal') as HTMLElement
  );
}
