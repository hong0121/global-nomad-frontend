'use client';

import { createContext, useContext, useState } from 'react';

interface ITabsControl {
  value: string | null;
  setValue: (value: string | null) => void;
  className: string;
}

const TabsContext = createContext<ITabsControl>({
  value: null,
  setValue: () => {},
  className: '',
});

function Root({
  children,
  defaultValue,
  className = '',
}: {
  children: React.ReactNode;
  defaultValue: string | null;
  className?: string;
}) {
  const [value, setValue] = useState<string | null>(defaultValue);

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
  value,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
  onClick: (tab: string) => void;
}) {
  const { setValue } = useContext(TabsContext);
  return (
    <li className={className}>
      <button
        className='w-full h-full flex items-center gap-2'
        onClick={() => {
          onClick(value);
          setValue(value);
        }}
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
