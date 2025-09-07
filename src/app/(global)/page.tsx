"use client";

// 상태 관리 로직(useState)을 제거했습니다.
import Header from '@/src/components/primitives/global/Header/Header';
import HeroSection from "@/src/components/pages/main/HeroSection";
import SearchSection from "@/src/components/pages/main/SearchSection";
import PopularActivities from "@/src/components/pages/main/PopularActivities";
import AllActivities from "@/src/components/pages/main/AllActivities";

export default function Home() {
  // 상태 관리 로직(handleSearch)을 제거했습니다.
  return (
    // Figma 명세에 맞춰 페이지 전체에 그라데이션 배경을 적용했습니다.
    <div className="bg-[linear-gradient(180deg,_#BBDDFF_-6.85%,_#F7FBFF_22.43%,_#FFFFFF_100%)]">
      <Header />
      <main className="pt-24 md:pt-28 lg:pt-32">
        {/* space-y 클래스를 제거하고 각 섹션에 직접 상단 여백(mt)을 추가합니다. */}
        <div className="flex flex-col items-center pb-24">
          <HeroSection />
          
          {/* HeroSection과 SearchSection 간격: 50px */}
          <div className="mt-[50px] w-full flex justify-center px-4">
            <SearchSection onSearch={function (query: string): void {
              throw new Error('Function not implemented.');
            }} />
          </div>
          
          {/* SearchSection과 PopularActivities 간격: 60px */}
          <div className="mt-[60px] w-full flex justify-center px-4">
            <PopularActivities />
          </div>
          
          {/* PopularActivities와 AllActivities 간격: 80px */}
          <div className="mt-[80px] w-full flex justify-center px-4">
            <AllActivities />
          </div>
        </div>
      </main>
    </div>
  );
}