'use client';

import UserIcon from '@/public/images/icons/UserIcon.svg';
import ListIcon from '@/public/images/icons/ListIcon.svg';
import SettingIcon from '@/public/images/icons/SettingIcon.svg';
import CalendarIcon from '@/public/images/icons/CalendarIcon.svg';
import { cn } from '@/src/utils/cn';
import { usePathname } from 'next/navigation';
import ProfilePicture from './ProfilePicture';
import SidebarTabs from '../sidebar/Tabs';

interface ISidebarButtons {
  href: string;
  text: string;
  icon: (className: string) => React.ReactNode;
}

export default function LeftSidebar() {
  const pathname = usePathname();

  const buttonsStyle = {
    buttonClass:
      'w-full h-[54px] flex gap-2 items-center py-3 pl-5 text-gray-600 rounded-2xl transition-colors hover:bg-primary-100',
    buttonActiveClass: 'text-gray-950 bg-primary-100',
    iconClass: 'fill-gray-600',
    iconActiveClass: 'fill-primary-500',
  };
  const buttons: ISidebarButtons[] = [
    {
      href: '/myInfo',
      text: '내 정보',
      icon: (className) => <UserIcon className={className} />,
    },
    {
      href: '/myReservation',
      text: '예약 내역',
      icon: (className) => <ListIcon className={className} />,
    },
    {
      href: '/myExperiences',
      text: '내 체험 관리',
      icon: (className) => <SettingIcon className={className} />,
    },
    {
      href: '/myReservationStatus',
      text: '예약 현황',
      icon: (className) => <CalendarIcon className={className} />,
    },
  ];

  return (
    <aside className='shadow w-[290px] h-fit px-3.5 py-6 m-auto sm:m-0 flex flex-col items-center rounded-2xl'>
      <ProfilePicture />
      <SidebarTabs.Root defaultValue='/myInfo'>
        <SidebarTabs.List className='w-full mt-6 space-y-2'>
          {buttons.map((button, i) => (
            <SidebarTabs.Item
              value={button.href}
              key={i}
              className={buttonsStyle.buttonClass}
              selectedClassName={buttonsStyle.buttonActiveClass}
            >
              {button.icon(
                cn(
                  buttonsStyle.iconClass,
                  button.href === pathname && buttonsStyle.iconActiveClass
                )
              )}
              {button.text}
            </SidebarTabs.Item>
          ))}
        </SidebarTabs.List>
      </SidebarTabs.Root>
    </aside>
  );
}
