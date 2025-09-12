'use client';

import { cn } from '@/src/utils/cn';
import { createContext, useContext, useState } from 'react';

interface ITabsControl {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

export const TabsContext = createContext<ITabsControl>({
  value: '',
  setValue: () => {},
  className: undefined,
});

function Root({
  children,
  defaultValue,
  className,
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

function List({ children }: { children: React.ReactNode }) {
  return <nav className='w-full border-b border-gray-100'>{children}</nav>;
}

function Trigger({
  children,
  value,
  onClick,
}: {
  children: React.ReactNode;
  value: string;
  onClick: () => void;
}) {
  const { value: selectedValue, setValue } = useContext(TabsContext);
  return (
    <button
      onClick={() => {
        onClick();
        setValue(value);
      }}
      className={cn(
        'p-2',
        value === selectedValue &&
          'text-primary-500 border-b-2 border-primary-500'
      )}
    >
      <span className='px-4 py-1 rounded transition-colors hover:bg-gray-100'>
        {children}
      </span>
    </button>
  );
}

function Content({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  const { value: selectedValue } = useContext(TabsContext);

  return (
    <article
      className={cn(
        'mt-8 space-y-8',
        className,
        value === selectedValue ? 'visible' : 'hidden'
      )}
    >
      {children}
    </article>
  );
}

const Tabs = {
  Root,
  Trigger,
  List,
  Content,
};

export default Tabs;
