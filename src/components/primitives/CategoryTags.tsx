'use client';

import FilterButton from './FilterButton';
import MusicIcon from '@/src/assets/icons/MusicIcon.svg';
import FoodIcon from '@/src/assets/icons/FoodIcon.svg';
import SportIcon from '@/src/assets/icons/SportIcon.svg';
import TourIcon from '@/src/assets/icons/TourIcon.svg';
import BusIcon from '@/src/assets/icons/BusIcon.svg';
import WellbeingIcon from '@/src/assets/icons/WellbeingIcon.svg';

const CATEGORIES_DATA = [
  { label: '문화 · 예술', icon: MusicIcon },
  { label: '식음료', icon: FoodIcon },
  { label: '스포츠', icon: SportIcon },
  { label: '투어', icon: TourIcon },
  { label: '관광', icon: BusIcon },
  { label: '웰빙', icon: WellbeingIcon },
];

interface CategoryTagsProps {
  currentCat: string | undefined;
  onSelectCategory: (category: string) => void;
}

export default function CategoryTags({
  currentCat,
  onSelectCategory,
}: CategoryTagsProps) {
  return (
    <div className='flex gap-2 md:gap-5 overflow-auto pr-6 -mr-6 md:overflow-hidden md:pr-0 md:mr-0 md:flex-wrap'>
      {CATEGORIES_DATA.map((category) => (
        <FilterButton
          key={category.label}
          label={category.label}
          activeCategory={currentCat}
          onClick={() => onSelectCategory(category.label)}
          Icon={category.icon}
        />
      ))}
    </div>
  );
}
