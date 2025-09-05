import Image from 'next/image';
import BellIcon from '@/public/images/icons/Bell.svg';
import { useState } from 'react';
import NotificationModal from '../../notification/NotificationModal';
import UserMenuDropdown from './\bUserMenuDropdown';

export default function LoggingInGnb() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className='relative'>
      <div className='flex items-center gap-5'>
        <div className='relative'>
          <button onClick={() => setIsModalVisible(!isModalVisible)}>
            <BellIcon />
          </button>

          {isModalVisible && (
            <>
              <div
                className='fixed inset-0 z-10'
                onClick={() => setIsModalVisible(false)}
              />

              <div
                className='absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20'
                onClick={(e) => e.stopPropagation()}
              >
                <NotificationModal setVisible={setIsModalVisible} />
              </div>
            </>
          )}
        </div>

        <span className='w-[1px] h-[14px] bg-gray-100' />
        <div className='relative'>
          <button
            className='flex items-center gap-[10px]'
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <Image
              src='/images/UserDefaultImg.svg'
              width={30}
              height={30}
              alt='유저 기본 이미지'
            />
            <strong className='text-14 font-medium'>홍길동</strong>
          </button>

          {isUserMenuOpen && (
            <>
              <div
                className='fixed inset-0 z-10'
                onClick={() => setIsUserMenuOpen(false)}
              />

              <div
                className='absolute top-full right-[-4px] md:right-[-10px] mt-2 z-20'
                onClick={(e) => e.stopPropagation()}
              >
                <UserMenuDropdown setVisible={setIsUserMenuOpen} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
