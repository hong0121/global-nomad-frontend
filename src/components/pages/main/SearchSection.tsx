"use client";

import SearchBar from "@/src/components/primitives/SearchBar";

// 부모 컴포넌트(page.tsx)로부터 onSearch 함수를 받기 위한 props 타입을 정의합니다.
interface SearchSectionProps {
  onSearch: (query: string) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  return (
    // Figma 명세에 맞춰 최대 너비를 1040px로 수정했습니다.
    <section className="w-full max-w-[1040px] flex flex-col items-center px-4">
      {/* SearchBar가 검색을 실행하면 부모로부터 받은 onSearch 함수를 그대로 전달합니다. */}
      <SearchBar size="pc/tb" onSearch={onSearch} />
    </section>
  );
};

export default SearchSection;