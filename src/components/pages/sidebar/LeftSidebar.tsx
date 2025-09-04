'use client';

import { cn } from '@/src/utils/cn';
import ProfilePicture from './ProfilePicture';
import SidebarTabs from '../sidebar/Tabs';
import { ISidebarButtons } from '@/src/app/(global)/(mypage)/myInfo/page';

export default function LeftSidebar({
  currentTab,
  setTab,
  buttons,
}: {
  currentTab: string | null;
  setTab: (tab: string) => void;
  buttons: ISidebarButtons[];
}) {
  const buttonsStyle = {
    buttonClass:
      'w-full h-[54px] flex gap-2 items-center py-3 pl-5 text-gray-600 rounded-[16px] transition-colors hover:bg-primary-100',
    buttonActiveClass: 'text-gray-950 bg-primary-100',
    iconClass: 'fill-gray-600',
    iconActiveClass: 'fill-primary-500',
  };

  return (
    <aside
      className={`shadow-[0px_4px_24px_rgba(156,180,202,0.2)] min-w-[290px] px-3.5 py-6 flex flex-col items-center rounded-xl`}
    >
      <ProfilePicture />
      <SidebarTabs.Root defaultValue={currentTab}>
        <SidebarTabs.List className='w-full mt-6 space-y-2'>
          {buttons.map((button, i) => (
            <SidebarTabs.Item
              value={button.href}
              key={i}
              className={cn(
                buttonsStyle.buttonClass,
                button.href === currentTab && buttonsStyle.buttonActiveClass
              )}
              onClick={setTab}
            >
              {button.icon(
                cn(
                  buttonsStyle.iconClass,
                  button.href === currentTab && buttonsStyle.iconActiveClass
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
