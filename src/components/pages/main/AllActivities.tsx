"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import ProductCard from "@/src/components/primitives/ProductCard";
import { Activity } from "@/src/types/activityType";
import FilterButton from "@/src/components/primitives/FilterButton";
import Pagination from "@/src/components/primitives/Pagination";

const CATEGORIES = [
  { label: "문화 · 예술", icon: "/images/icons/MusicIcon.svg" },
  { label: "식음료", icon: "/images/icons/FoodIcon.svg" },
  { label: "투어", icon: "/images/icons/TourIcon.svg" },
  { label: "관광", icon: "/images/icons/BusIcon.svg" },
  { label: "웰빙", icon: "/images/icons/WellbeingIcon.svg" },
];

const mockActivities: Activity[] = [
    { id: 1, userId: 1, title: "피오르 체험", description: "", category: "투어", price: 42800, address: "", bannerImageUrl: "/images/Nature7.jpg", rating: 3.9, reviewCount: 14, createdAt: "", updatedAt: "", subImages: [], schedules: [] },
    { id: 2, userId: 1, title: "해안가 마을에서 1주일", description: "", category: "투어", price: 217000, address: "", bannerImageUrl: "/images/Nature2.jpg", rating: 2.9, reviewCount: 30, createdAt: "", updatedAt: "", subImages: [], schedules: [] },
    { id: 3, userId: 1, title: "부모님과 함께 일출 캠핑", description: "", category: "체험", price: 60000, address: "", bannerImageUrl: "/images/Nature.jpg", rating: 4.0, reviewCount: 13, createdAt: "", updatedAt: "", subImages: [], schedules: [] },
    { id: 4, userId: 1, title: "열기구 페스티벌", description: "", category: "체험", price: 35000, address: "", bannerImageUrl: "/images/Balloon.jpg", rating: 4.8, reviewCount: 18, createdAt: "", updatedAt: "", subImages: [], schedules: [] },
    { id: 5, userId: 1, title: "도심 속 자전거 여행", description: "", category: "스포츠", price: 42800, address: "", bannerImageUrl: "/images/Bike.jpg", rating: 3.9, reviewCount: 18, createdAt: "", updatedAt: "", subImages: [], schedules: [] },
    { id: 6, userId: 1, title: "다양한 물고기 구경하기", description: "", category: "체험", price: 12000, address: "", bannerImageUrl: "/images/Sea.jpg", rating: 4.3, reviewCount: 18, createdAt: "", updatedAt: "", subImages: [], schedules: [] },
    { id: 7, userId: 1, title: "세상에서 가장 멋진 석양", description: "", category: "투어", price: 10000, address: "", bannerImageUrl: "/images/Nature6.jpg", rating: 4.2, reviewCount: 78, createdAt: "", updatedAt: "", subImages: [], schedules: [] },
    { id: 8, userId: 1, title: "가이드와 함께하는 숲", description: "", category: "웰빙", price: 18000, address: "", bannerImageUrl: "/images/Nature3.jpg", rating: 4.8, reviewCount: 19, createdAt: "", updatedAt: "", subImages: [], schedules: [] },
];
const PAGE_SIZE = 8;


const AllActivities = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<string>("default");

  // useMemo를 사용해 필터링과 정렬 로직을 구현합니다.
  const processedActivities = useMemo(() => {
    let activities = [...mockActivities];

    // 카테고리 필터링
    if (activeCategory) {
      activities = activities.filter(
        // mock 데이터의 category는 영문 소문자일 수 있으므로, 실제 데이터에 맞게 수정이 필요할 수 있습니다.
        // 여기서는 한글 레이블과 일치한다고 가정합니다.
        (activity) => activity.category === activeCategory
      );
    }

    // 가격 정렬
    if (sortOrder === "price_asc") {
      activities.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price_desc") {
      activities.sort((a, b) => b.price - a.price);
    }

    return activities;
  }, [activeCategory, sortOrder]);

  const totalPages = Math.ceil(processedActivities.length / PAGE_SIZE);
  const currentActivities = processedActivities.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleFilterClick = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="w-full max-w-[1120px] mx-auto py-10">
      <h2 className="text-[32px] font-bold text-[#1F1F22] mb-8">🛼 모든 체험</h2>

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-3">
          {CATEGORIES.map((category) => (
            <FilterButton
              key={category.label}
              label={category.label}
              icon={category.icon}
              state={activeCategory === category.label ? "active" : "normal"}
              size="pc/tb"
              showIcon={true}
              onClick={() => handleFilterClick(category.label)}
            />
          ))}
        </div>

        <div className="relative">
          <select
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md py-2 px-4 appearance-none pr-8 cursor-pointer bg-white text-[#1F1F22]"
          >
            <option value="default">가격</option>
            <option value="price_asc">낮은 순</option>
            <option value="price_desc">높은 순</option>
          </select>
          <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none w-[10px] h-[6px]">
             <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="#1F1F22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {currentActivities.map((activity) => (
            <ProductCard
              key={activity.id}
              size="pc/tb"
              imageUrl={activity.bannerImageUrl}
              title={activity.title}
              price={`₩ ${activity.price.toLocaleString()}`}
              ratingValue={activity.rating}
              ratingCount={`(${activity.reviewCount})`}
            />
          ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-12">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
      )}
    </section>
  );
};

export default AllActivities;
