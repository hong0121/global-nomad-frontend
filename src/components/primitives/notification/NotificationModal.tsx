'use client';

import CloseIcon from '@/public/images/icons/DeleteIcon.svg';

export default function NotificationModal({
  setVisible,
}: {
  setVisible: (state: boolean) => void;
}) {
  return (
    <div className='w-[231px] h-48 pt-4 pb-2 bg-white rounded-2xl'>
      <div className='px-6 pb-3.5 flex justify-between border-b border-gray-100'>
        <h2 className='text-16 font-bold'>알림 6개</h2>
        <button onClick={() => setVisible(false)}>
          <CloseIcon />
        </button>
      </div>
      <article>므아지경</article>
    </div>
  );
}
