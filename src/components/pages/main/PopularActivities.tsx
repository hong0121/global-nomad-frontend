"use client";

import ProductCard from "@/src/components/primitives/ProductCard";
import { Activity } from "@/src/types/activityType";

// 4개의 인기 체험에 대한 고정 목업(Mockup) 데이터
const mockActivities: Activity[] = [
  {
    id: 1,
    userId: 1,
    title: "함께 배우면 즐거운 스트릿..",
    description: "",
    category: "댄스",
    price: 38000,
    address: "",
    bannerImageUrl: "/images/Dancing.jpg",
    rating: 4.9,
    reviewCount: 703,
    createdAt: "",
    updatedAt: "",
    subImages: [], // 타입 에러 해결을 위해 추가
    schedules: [], // 타입 에러 해결을 위해 추가
  },
  {
    id: 2,
    userId: 1,
    title: "연인과 사랑의 징검다리..",
    description: "",
    category: "자연",
    price: 35000,
    address: "",
    bannerImageUrl: "/images/Nature5.jpg",
    rating: 3.9,
    reviewCount: 108,
    createdAt: "",
    updatedAt: "",
    subImages: [], // 타입 에러 해결을 위해 추가
    schedules: [], // 타입 에러 해결을 위해 추가
  },
  {
    id: 3,
    userId: 1,
    title: "VR 게임 마스터 하는 법",
    description: "",
    category: "게임",
    price: 38000,
    address: "",
    bannerImageUrl: "/images/Play.jpg",
    rating: 4.9,
    reviewCount: 293,
    createdAt: "",
    updatedAt: "",
    subImages: [], // 타입 에러 해결을 위해 추가
    schedules: [], // 타입 에러 해결을 위해 추가
  },
  {
    id: 4,
    userId: 1,
    title: "자연 속에서 캠핑하기",
    description: "",
    category: "아웃도어",
    price: 45000,
    address: "",
    bannerImageUrl: "/images/Nature4.jpg",
    rating: 4.7,
    reviewCount: 236,
    createdAt: "",
    updatedAt: "",
    subImages: [], // 타입 에러 해결을 위해 추가
    schedules: [], // 타입 에러 해결을 위해 추가
  },
];

const PopularActivities = () => {
  return (
    <section className="w-full max-w-[1120px] mx-auto py-10">
      <h2 className="text-[32px] font-bold text-[#1F1F22] mb-5">
        🔥 인기 체험
      </h2>
      {/* 레이아웃 설정 수정:
        - 'flex flex-col' 대신 'grid grid-cols-4'를 사용하여 4개의 열로 구성된 그리드 레이아웃을 만듭니다.
        - 이렇게 하면 카드들이 가로로 한 줄에 나열됩니다.
        - 'gap-6'는 그대로 사용하여 카드 간의 간격을 24px로 유지합니다.
      */}
      <div className="grid grid-cols-4 gap-6">
        {mockActivities.map((activity) => (
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
    </section>
  );
};

export default PopularActivities;