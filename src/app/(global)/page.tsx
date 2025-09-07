"use client";

import Header from '@/src/components/primitives/global/Header/Header';
import HeroSection from "@/src/components/pages/main/HeroSection";
import SearchSection from "@/src/components/pages/main/SearchSection";
import PopularActivities from "@/src/components/pages/main/PopularActivities";
import AllActivities from "@/src/components/pages/main/AllActivities";

export default function Home() {
  
  return (
    <div className="bg-[linear-gradient(180deg,_#BBDDFF_-6.85%,_#F7FBFF_22.43%,_#FFFFFF_100%)]">
      <Header />
      <main className="pt-24 md:pt-28 lg:pt-32">
        <div className="flex flex-col items-center pb-24">
          <HeroSection />
          <div className="mt-[50px] w-full flex justify-center px-4">
            <SearchSection onSearch={function (query: string): void {
              throw new Error('Function not implemented.');
            }} />
          </div>
          
          <div className="mt-[60px] w-full flex justify-center px-4">
            <PopularActivities />
          </div>
          
          <div className="mt-[80px] w-full flex justify-center px-4">
            <AllActivities />
          </div>
        </div>
      </main>
    </div>
  );
}