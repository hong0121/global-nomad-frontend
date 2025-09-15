import Image from 'next/image';
import BellIcon from '@/public/images/icons/Bell.svg';
import ActiveBellIcon from '@/public/images/icons/ActiveBellIcon.svg';
import { useState } from 'react';
import NotificationModal from '../../notification/NotificationModal';
import UserMenuDropdown from './UserMenuDropdown';
import useCurrentUser from '@/src/hooks/useCurrentUser';
import { getNotifications } from '@/src/services/pages/notifications/api';
import { INotifications } from '@/src/types/notificationType';
import { useQuery } from '@tanstack/react-query';

export default function LoggingInGnb() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userInfo = useCurrentUser();
  const size = 10;

  const { data: notifications } = useQuery<INotifications>({
    queryKey: ['notifications', size],
    queryFn: () => getNotifications({ size }),
    staleTime: 1000 * 60,
  });

  const hasUnread = notifications?.notifications.some(
    (n) =>
      new Date().getTime() - new Date(n.updatedAt).getTime() <
      24 * 60 * 60 * 1000
  );

  return (
    <div className='relative'>
      <div className='flex items-center gap-5'>
        <div className='relative'>
          <button
            onClick={() => setIsModalVisible(!isModalVisible)}
            className='align-middle'
          >
            {hasUnread ? <ActiveBellIcon /> : <BellIcon />}
          </button>

          {isModalVisible && (
            <>
              <div
                className='fixed inset-0 z-10'
                onClick={() => setIsModalVisible(false)}
              />

              <div
                className='fixed inset-0 flex items-start justify-center md:absolute md:inset-auto md:top-full md:left-1/2 md:-translate-x-1/2 md:mt-4 top-10 mt-2 z-20 rounded-2xl shadow-[0_4px_24px_0_#9CB4CA33]
'
                onClick={(e) => e.stopPropagation()}
              >
                <NotificationModal
                  setVisible={setIsModalVisible}
                  notifications={notifications ?? null}
                />
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
              src={userInfo?.profileImageUrl || '/images/UserDefaultImg.svg'}
              width={30}
              height={30}
              className='w-7.5 h-7.5 rounded-full object-cover'
              alt='유저 프로필 이미지'
            />
            <strong className='text-14 font-medium'>
              {userInfo?.nickname || '홍길동'}
            </strong>
          </button>

          {isUserMenuOpen && (
            <>
              <div
                className='fixed inset-0 z-10'
                onClick={() => setIsUserMenuOpen(false)}
              />

              <div
                className='absolute top-full right-[-4px] md:right-[-10px] mt-2 z-20 shadow-[0_4px_24px_0_#9CB4CA33]'
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
