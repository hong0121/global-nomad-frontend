import MyReservationListArea from '@/src/components/pages/myReservation/MyReservationListArea';

export default function MyReservation() {
  return (
    <>
      <div className='mb-6'>
        <h3 className='text-18 font-bold mb-[10px]'>예약내역</h3>
        <p className='text-14 text-gray-500 font-medium'>
          예약내역 확인 및 취소할 수 있습니다.
        </p>
      </div>
      <MyReservationListArea />
    </>
  );
}
