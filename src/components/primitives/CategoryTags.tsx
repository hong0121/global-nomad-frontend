'use client';

import { useState } from 'react';
import FilterButton from './FilterButton';

const CATEGORIES_DATA = [
  { label: '문화 · 예술', icon: '/images/icons/MusicIcon.svg' },
  { label: '식음료', icon: '/images/icons/FoodIcon.svg' },
  { label: '스포츠', icon: '/images/icons/SportIcon.svg' },
  { label: '투어', icon: '/images/icons/TourIcon.svg' },
  { label: '관광', icon: '/images/icons/n.svg' },
  { label: '웰빙', icon: '/images/icons/WellbeingIcon.svg' },
];

interface CategoryTagsProps {
  onSelectCategory: (category: string) => void;
}

export default function CategoryTags({ onSelectCategory }: CategoryTagsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleTagClick = (categoryLabel: string) => {
    const newSelectedCategory = selectedCategory === categoryLabel ? null : categoryLabel;
    
    setSelectedCategory(newSelectedCategory);
    onSelectCategory(newSelectedCategory || '전체');
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {CATEGORIES_DATA.map((category) => (
        <FilterButton
          key={category.label}
          label={category.label}
          state={selectedCategory === category.label ? 'active' : 'normal'}
          onClick={() => handleTagClick(category.label)}
          icon={category.icon}
          showIcon={true}
        />
      ))}
    </div>
  );
}