'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloseIcon from '@/public/images/icons/DeleteIcon.svg';
import { deleteNotificationById } from '@/src/services/pages/notifications/api';
import { Notifications } from '@/src/types/notificationType';
import { cn } from '@/src/utils/cn';
import { dateToCalendarDate } from '@/src/utils/dateParser';
import {
  getNotificationType,
  isRecent,
  parseContent,
} from '@/src/utils/notifications';

interface Props {
  setVisible: (state: boolean) => void;
  notifications: Notifications | null;
}

export default function NotificationModal({
  setVisible,
  notifications,
}: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteNotificationById(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Notifications | null>(
        ['notifications', 10],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            notifications: old.notifications.filter((n) => n.id !== id),
            totalCount: old.totalCount - 1,
          };
        }
      );
    },
  });

  const handleDelete = (id: number) => deleteMutation.mutate(id);

  return (
    <div className='w-full max-w-[327px] md:w-[231px] md:max-w-none h-auto pt-4 bg-white rounded-2xl shadow'>
      <div className='px-5 pb-3.5 flex justify-between items-center border-b border-gray-100'>
        <h2 className='text-16 font-bold'>
          알림 {notifications?.totalCount ?? 0}개
        </h2>
        <div className='flex justify-between'>
          <button onClick={() => setVisible(false)}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className='max-h-[350px] overflow-y-auto scrollbar-hide'>
        {notifications?.notifications.map((n) => {
          const notificationType = getNotificationType(n.content);
          const { relative } = dateToCalendarDate(new Date(n.createdAt));
          const formatted = parseContent(n.content);

          return (
            <article
              key={n.id}
              className={cn(
                'px-5 py-4 h-34',
                isRecent(n.createdAt, n.updatedAt)
                  ? 'bg-primary-100'
                  : 'bg-gray-25',
                'border-b border-gray-100 last:border-b-0 last:rounded-b-2xl'
              )}
            >
              <div className='flex flex-col h-full gap-2'>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-2'>
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
                  <button
                    className='text-13 font-medium text-red-400'
                    onClick={() => handleDelete(n.id)}
                  >
                    삭제
                  </button>
                </div>
                <div className='flex flex-col'>
                  <p
                    className='text-14-body font-medium text-gray-800 leading-[180%] align-middle'
                    dangerouslySetInnerHTML={{ __html: formatted }}
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
