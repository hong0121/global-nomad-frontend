'use client';

import { cn } from '@/src/utils/cn';
import { createContext, useContext, useState } from 'react';

interface ITabsControl {
  value: string;
  setValue: (value: string) => void;
  className: string;
}

const TabsContext = createContext<ITabsControl>({
  value: '',
  setValue: () => {},
  className: '',
});

function Root({
  children,
  defaultValue,
  className = '',
}: {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}) {
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue, className }}>
      {children}
    </TabsContext.Provider>
  );
}

function List({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={className}>{children}</ul>;
}

function Item({
  children,
  className,
  selectedClassName,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  selectedClassName?: string;
  value: string;
}) {
  const { value: selectedValue, setValue } = useContext(TabsContext);
  return (
    <li className={cn(className, value === selectedValue && selectedClassName)}>
      <button
        className='w-full h-full flex items-center gap-2'
        onClick={() => setValue(value)}
      >
        {children}
      </button>
    </li>
  );
}

const SidebarTabs = {
  Root,
  List,
  Item,
};

export default SidebarTabs;
