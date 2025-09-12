'use client';

import { useState } from 'react';
import UserIcon from '@/public/images/icons/UserIcon.svg';
import ListIcon from '@/public/images/icons/ListIcon.svg';
import SettingIcon from '@/public/images/icons/SettingIcon.svg';
import CalendarIcon from '@/public/images/icons/CalendarIcon.svg';
import { cn } from '@/src/utils/cn';
import { TabContext } from './pageContext';
import LeftSidebar from '@/src/components/pages/sidebar/LeftSidebar';
import MyExperiencesPage from './_components/myExperiences';
import MyInfoPage from './_components/myInfo';
import MyReservationStatusPage from '@/src/components/pages/myReservationStatus/myReservationStatus';
import MyReservation from '@/src/components/pages/myReservation/MyReservation';

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
  const [tab, setTab] = useState<string>(buttons[0].href);
  const [isTabOpen, setIsTabOpen] = useState(false);

  const handleTabClick = (page: string) => {
    setTab(page);
    setIsTabOpen(true);
  };

  return (
    <TabContext.Provider value={{ tab, setTab, isTabOpen, setIsTabOpen }}>
      <section
        id='my-info-body'
        className='w-full pt-[85px] pb-[64px] overflow-hidden md:pt-[120px] md:pb-[54px] h-full'
      >
        <div
          className={cn(
            'flex w-[200vw] transition-all md:w-[calc(100%-60px)] md:gap-[30px] md:max-w-[980px] md:mx-auto lg:gap-[50px] h-[480px] md:h-auto',
            isTabOpen && '-translate-x-1/2 md:translate-x-0 h-auto'
          )}
        >
          <div className='w-screen px-6 shrink-0 md:w-[178px] md:px-0 lg:w-[290px]'>
            <LeftSidebar
              currentTab={tab}
              setTab={handleTabClick}
              buttons={buttons}
            />
          </div>
          <article
            className={cn(
              'w-screen h-100% px-6 shrink-0 md:w-auto md:shrink-1 md:px-0 md:grow-1'
            )}
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
      return <MyReservation />;
    case 'myExperiences':
      return <MyExperiencesPage />;
    case 'myReservationStatus':
      return <MyReservationStatusPage />;
    default:
      return null;
  }
}
