'use client';

import CloseIcon from '@/public/images/icons/DeleteIcon.svg';
import { getNotifications } from '@/src/services/pages/notifications/api';
import { Notifications } from '@/src/types/notificationType';
import { dateToCalendarDate } from '@/src/utils/dateParser';
import { useEffect, useState } from 'react';

interface Props {
  setVisible: (state: boolean) => void;
}

function getNotificationType(content: string) {
  if (content.includes('승인')) return 'RESERVATION_APPROVED';
  if (content.includes('거절')) return 'RESERVATION_REJECTED';
  return 'OTHER';
}

function parseContent(content: string) {
  let formatted = content.replace(/(\))\s*(예약)/, '$1<br />$2');

  if (content.includes('승인')) {
    formatted = formatted.replace(
      '승인',
      `<span class="text-primary-500">승인</span>`
    );
  } else if (content.includes('거절')) {
    formatted = formatted.replace(
      '거절',
      `<span class="text-red-500">거절</span>`
    );
  }

  return formatted;
}

export default function NotificationModal({ setVisible }: Props) {
  const [notifications, setNotifications] = useState<Notifications | null>(
    null
  );
  const [cursorId, setCursorId] = useState<number>(0);
  const size = 10;

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await getNotifications({ size });
        setNotifications(res);
      } catch (error) {
        console.error('알림 가져오기 실패', error);
      }
    }

    fetchNotifications();
  }, [cursorId]);

  return (
    <div className='w-full max-w-[327px] md:w-[231px] md:max-w-none h-auto pt-4 bg-white rounded-2xl shadow'>
      <div className='px-5 pb-3.5 flex justify-between items-center border-b border-gray-100'>
        <h2 className='text-16 font-bold'>
          알림 {notifications?.totalCount ?? 0}개
        </h2>
        <div className='flex w-23 justify-between'>
          <button className='text-14 font-medium text-red-400'>
            모두 삭제
          </button>
          <button onClick={() => setVisible(false)}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div>
        {notifications?.notifications.map((n) => {
          const notificationType = getNotificationType(n.content);
          const { relative } = dateToCalendarDate(new Date(n.createdAt));
          const formatted = parseContent(n.content);

          return (
            <article key={n.id} className='px-5 py-4 h-34'>
              <div className='flex flex-col h-full gap-2'>
                <div className='flex justify-between'>
                  <h3 className='text-14 font-bold'>
                    예약{' '}
                    {notificationType === 'RESERVATION_APPROVED'
                      ? '승인'
                      : '거절'}
                  </h3>
                  <span className='text-12 font-medium text-gray-400'>
                    {relative}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <p
                    className='text-14-body font-medium text-gray-800 leading-[180%] align-middle'
                    dangerouslySetInnerHTML={{
                      __html: formatted,
                    }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
