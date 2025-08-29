import Image from 'next/image';
import BellIcon from '@/public/images/icons/Bell.svg';
import { useState } from 'react';
import NotificationModal from '../../notification/NotificationModal';

export default function LoggingOutGnb() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className='relative'>
      <div className='flex items-center gap-5'>
        <div className='relative'>
          <button onClick={() => setIsModalVisible(!isModalVisible)}>
            <BellIcon />
          </button>
          {isModalVisible && (
            <NotificationModal setVisible={setIsModalVisible} />
          )}
        </div>
        <span className='w-[1px] h-[14px] bg-gray-100' />
        <div className='relative'>
          <button className='flex items-center gap-[10px]'>
            <Image
              src='/images/UserDefaultImg.svg'
              width={30}
              height={30}
              alt='유저 기본 이미지'
            />
            <strong className='text-14 font-medium'>홍길동</strong>
          </button>
        </div>
      </div>
    </div>
  );
}
