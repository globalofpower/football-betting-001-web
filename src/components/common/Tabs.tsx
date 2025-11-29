import React from 'react';
import DatePicker from './DatePicker';

interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  type: string;
  setType: (value: string) => void;
  tabs: Tab[];
  tabType?: string
}

const Tabs: React.FC<TabsProps> = ({ type, setType, tabs, tabType}) => {
  const activeIndex = tabs.findIndex(tab => tab.value === type);
  const tabWidth = 100 / tabs.length;

  return (
    <div className='w-full flex items-center gap-3'>
      <div
        className="relative grid h-11 w-full mx-auto rounded-md overflow-hidden shadow-sm bg-[var(--main-soft-color)]"
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, 1fr)`, 
        }}
        role="tablist"
      >
        <span
          className="absolute inset-0 left-0 rounded-md bg-[var(--secodary-color)]
                    transition-transform duration-300 ease-out will-change-transform"
          style={{
            width: `${tabWidth}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
          aria-hidden
        />

        {tabs?.map((tab) => (
          <button
            key={tab?.value}
            role="tab"
            aria-selected={type === tab.value}
            onClick={() => setType(tab.value)}
            className={`text-xs z-10 rounded-md font-medium transition-colors text-center
                      ${type === tab.value ? "text-white" : "text-[var(--font-color)]"}`}
          >
            {tab?.label}
          </button>
        ))}
      </div>
      {
        tabType === "football" ? <DatePicker />: ''
      }
      
    </div>
  );
};

export default Tabs;
