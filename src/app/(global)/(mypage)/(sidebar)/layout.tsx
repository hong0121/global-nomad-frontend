'use client';

import LeftSidebar from '@/src/components/pages/myExperiences/LeftSidebar';
import { useState } from 'react';
import UserIcon from '@/public/images/icons/UserIcon.svg';
import ListIcon from '@/public/images/icons/ListIcon.svg';
import SettingIcon from '@/public/images/icons/SettingIcon.svg';
import CalendarIcon from '@/public/images/icons/CalendarIcon.svg';
import MyInfoPage from './myInfo/page';
import MyReservationPage from './myReservation/page';
import MyExperiencesPage from './myExperiences/page';
import MyReservationStatusPage from './myReservationStatus/page';
import { cn } from '@/src/utils/cn';
import { TabContext } from './pageContext';

export interface ISidebarButtons {
  href: string;
  text: string;
  icon: (className: string) => React.ReactNode;
}

const buttons: ISidebarButtons[] = [
  {
    href: 'myInfo',
    text: '내 정보',
    icon: (className) => <UserIcon className={className} />,
  },
  {
    href: 'myReservation',
    text: '예약 내역',
    icon: (className) => <ListIcon className={className} />,
  },
  {
    href: 'myExperiences',
    text: '내 체험 관리',
    icon: (className) => <SettingIcon className={className} />,
  },
  {
    href: 'myReservationStatus',
    text: '예약 현황',
    icon: (className) => <CalendarIcon className={className} />,
  },
];

export default function MypageLayout() {
  const [tab, setTab] = useState<string | null>(null);
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      <section className='w-full px-4 py-2 mt-24 overflow-hidden'>
        <div
          className={cn(
            'w-[calc(100%+290px+1rem)] sm:w-full sm:max-w-[980px] sm:translate-x-0 flex justify-start sm:justify-between gap-4 mx-auto',
            tab ? '-translate-x-[calc(290px+1rem)] gap-4' : 'w-fit'
          )}
        >
          <LeftSidebar currentTab={tab} setTab={setTab} buttons={buttons} />
          <article
            className={cn('w-full max-w-[640px]', tab ? 'min-w-fit' : 'hidden')}
          >
            <Tabs page={tab} />
          </article>
        </div>
      </section>
    </TabContext.Provider>
  );
}

function Tabs({ page }: { page: string | null }) {
  switch (page) {
    case 'myInfo':
      return <MyInfoPage />;
    case 'myReservation':
      return <MyReservationPage />;
    case 'myExperiences':
      return <MyExperiencesPage />;
    case 'myReservationStatus':
      return <MyReservationStatusPage />;
    default:
      return null;
  }
}
