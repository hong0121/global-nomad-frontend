import Tabs from '@/src/components/primitives/Tabs';
import { IScheduleCount, TScheduleStatus } from '@/src/types/scheduleType';
import { ComponentPropsWithRef, useEffect, useState } from 'react';
import CloseIcon from '@/public/images/icons/DeleteIcon.svg';
import Dropdown from '@/src/components/primitives/Dropdown';
import { useActivityIdStore } from '@/src/store/ReservationStore';
import { patchReservationStatus } from '@/src/services/pages/myReservationStatus/myActivities';
import { format } from 'date-fns';
import LoadingSpinner from '@/src/components/primitives/LoadingSpinner';
import { MyReservationItem } from '@/src/types/myReservationType';
import ExperienceButton from '../../myExperiences/ExperienceButton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { reservationQueries } from '@/src/services/primitives/queries';

interface IProps extends ComponentPropsWithRef<'div'> {
  setIsModalVisible: (state: boolean) => void;
  selectedDate: Date;
  schedule: IScheduleCount;
}

export default function DayModal({
  setIsModalVisible,
  selectedDate,
  schedule,
  ...props
}: IProps) {
  const activityId = useActivityIdStore((state) => state.activityId);
  const [status, setStatus] = useState<TScheduleStatus>('pending');
  const [scheduleId, setScheduleId] = useState<number | null>(null);

  const { data: timeSchedule } = useQuery(
    reservationQueries.timeScheduleOptions(activityId, scheduleId, status)
  );
  const { data: daySchedule } = useQuery(
    reservationQueries.dayScheduleOptions(
      activityId,
      format(selectedDate, 'yyyy-MM-dd')
    )
  );

  useEffect(() => {
    const body = document.getElementById('my-info-body');
    body?.classList.toggle('overflow-y-scroll');

    return () => {
      body?.classList.toggle('overflow-hidden');
    };
  }, [activityId, selectedDate]);

  return (
    <div
      className='absolute left-2 top-2 w-[340px] px-6 py-8 z-[1] bg-white rounded-2xl shadow'
      {...props}
    >
      {daySchedule ? (
        <Tabs.Root defaultValue='pending'>
          <div className='w-full mb-2 flex justify-between items-center'>
            <h1 className='text-18 font-bold'>
              {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
              {selectedDate.getDate()}일
            </h1>
            <button onClick={() => setIsModalVisible(false)}>
              <CloseIcon />
            </button>
          </div>
          <Tabs.List>
            <Tabs.Trigger onClick={() => setStatus('pending')} value='pending'>
              신청 {schedule.pending}
            </Tabs.Trigger>
            <Tabs.Trigger
              onClick={() => setStatus('confirmed')}
              value='confirmed'
            >
              승인 {schedule.confirmed}
            </Tabs.Trigger>
            <Tabs.Trigger
              onClick={() => setStatus('declined')}
              value='declined'
            >
              거절
            </Tabs.Trigger>
          </Tabs.List>
          <h2 className='mt-6 text-18 font-bold'>예약 시간</h2>
          <Dropdown
            items={daySchedule!.map((el) => {
              return {
                id: el.scheduleId,
                title: `${el.startTime} ~ ${el.endTime}`,
              };
            })}
            label=''
            value={'time'}
            onChange={setScheduleId}
          />
          {timeSchedule && (
            <>
              <Tabs.Content value='pending'>
                <TabsContent
                  data={timeSchedule.reservations.filter(
                    (el) => el.status === 'pending'
                  )}
                  activitiyId={activityId}
                  scheduleId={scheduleId!}
                />
              </Tabs.Content>
              <Tabs.Content value='confirmed'>
                <TabsContent
                  data={timeSchedule.reservations.filter(
                    (el) => el.status === 'confirmed'
                  )}
                  activitiyId={activityId}
                  scheduleId={scheduleId!}
                />
              </Tabs.Content>
              <Tabs.Content value='declined'>
                <TabsContent
                  data={timeSchedule.reservations.filter(
                    (el) => el.status === 'declined'
                  )}
                  activitiyId={activityId}
                  scheduleId={scheduleId!}
                />
              </Tabs.Content>
            </>
          )}
        </Tabs.Root>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

function TabsContent({
  data,
  activitiyId,
  scheduleId,
}: {
  data: MyReservationItem[];
  activitiyId: number;
  scheduleId: number;
}) {
  const queryClient = useQueryClient();
  const handleConfirmButtonClick = (reservationId: number) => {
    patchReservationStatus(activitiyId, reservationId, 'confirmed');
    queryClient.invalidateQueries({
      queryKey: [
        reservationQueries.timeSchedule(scheduleId),
        reservationQueries.daySchedule(activitiyId),
      ],
    });
  };
  const handleDeclineButtonClick = (reservationId: number) => {
    patchReservationStatus(activitiyId, reservationId, 'declined');
    queryClient.invalidateQueries({
      queryKey: [
        reservationQueries.timeSchedule(scheduleId),
        reservationQueries.daySchedule(activitiyId),
      ],
    });
  };
  return (
    <>
      <h2 className='text-18 font-bold'>예약 내역</h2>
      {data.map((el) => (
        <div
          className='px-4 py-3.5 flex justify-between items-center border border-gray-100 rounded-2xl'
          key={el.id}
        >
          <div className='w-fit h-fit grid grid-cols-2 gap-2'>
            <span className='text-gray-500 font-bold mr-2'>닉네임</span>
            <p className='text-16'>{el.nickname}</p>
            <span className='text-gray-500 font-bold mr-2'>인원</span>
            <p className='text-16'>{el.headCount}</p>
          </div>
          <ReservationChip
            data={el}
            handleConfirmButtonClick={handleConfirmButtonClick}
            handleDeclineButtonClick={handleDeclineButtonClick}
          />
        </div>
      ))}
    </>
  );
}

function ReservationChip({
  data,
  handleConfirmButtonClick,
  handleDeclineButtonClick,
}: {
  data: MyReservationItem;
  handleConfirmButtonClick: (id: number) => void;
  handleDeclineButtonClick: (id: number) => void;
}) {
  switch (data.status) {
    case 'confirmed':
      return (
        <div className='px-2 py-1 rounded-2xl bg-[#ddf9f9]'>
          <p className='text-13 font-bold text-[#1790a0]'>예약 승인</p>
        </div>
      );
    case 'declined':
      return (
        <div className='px-2 py-1 rounded-2xl bg-[#fcecea]'>
          <p className='text-13 font-bold text-[#f96767]'>예약 거절</p>
        </div>
      );
    default:
      return (
        <div className='flex flex-col gap-2'>
          <ExperienceButton
            variant='outline'
            size='sm'
            onClick={() => handleConfirmButtonClick(data.id)}
          >
            승인하기
          </ExperienceButton>
          <ExperienceButton
            variant='primary'
            size='sm'
            className='bg-gray-50 text-gray-600 hover:bg-gray-100'
            onClick={() => handleDeclineButtonClick(data.id)}
          >
            거절하기
          </ExperienceButton>
        </div>
      );
  }
}
