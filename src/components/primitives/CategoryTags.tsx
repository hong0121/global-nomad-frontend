'use client';

import { useState } from 'react';
import FilterButton from './FilterButton';

const CATEGORIES = ['전체', '문화', '예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

interface CategoryTagsProps {
  onSelectCategory: (category: string) => void;
}

export default function CategoryTags({ onSelectCategory }: CategoryTagsProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleTagClick = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {CATEGORIES.map((category) => (
        <FilterButton
          key={category}
          label={category}
          state={selectedCategory === category ? 'active' : 'normal'}
          onClick={() => handleTagClick(category)}
          showIcon={false}
        />
      ))}
    </div>
  );
}