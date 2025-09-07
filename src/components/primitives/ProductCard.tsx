"use client";

import React from "react";

// next/image's Image component is specific to the Next.js environment and may not render in all sandboxes.
// We'll use the standard <img> tag for broader compatibility.

// ProductCard 컴포넌트가 받을 props 타입을 정의합니다.
interface ProductCardProps {
  size: 'pc/tb' | 'mo';
  imageUrl: string;
  title: string;
  price: string;
  ratingValue: number;
  ratingCount: string;
  perPerson?: boolean; // '/인' 텍스트 표시 여부
}

const ProductCard: React.FC<ProductCardProps> = ({
  size,
  imageUrl,
  title,
  price,
  ratingValue,
  ratingCount,
  perPerson = true, // 기본값으로 '/인' 표시
}) => {
  // size prop에 따라 스타일을 동적으로 결정합니다.
  const isLarge = size === 'pc/tb';

  return (
    <div
      className={`relative overflow-hidden ${
        isLarge
          ? 'w-[262px] h-[366px] rounded-[32px] shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]'
          : 'w-[154.5px] h-[242.875px] rounded-[18px] shadow-[0px_2.25px_13.5px_0px_rgba(156,180,202,0.2)]'
      }`}
    >
      {/* 이미지 섹션: 요청하신 w-[262px] h-[290px] 크기 유지 */}
      <div
        className={`relative ${
          isLarge
            ? 'w-[262px] h-[290px]'
            : 'w-[154.5px] h-[176.625px]'
        }`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 정보 섹션: Figma 명세에 맞춰 absolute 포지셔닝과 고정 높이로 수정 */}
      <div
        className={`absolute bottom-0 bg-white flex flex-col justify-between ${
          isLarge
            ? 'w-[262px] h-[136px] rounded-[32px] p-[20px_30px] shadow-[0px_-8px_20px_0px_rgba(0,0,0,0.05)]'
            : 'w-[154.5px] h-[100px] rounded-[18px] p-[16px_17px] gap-[10px] shadow-[0px_-4.5px_11.25px_0px_rgba(0,0,0,0.05)]'
        }`}
      >
        {/* 제목: truncate 클래스를 제거하여 줄바꿈을 허용하고 글자가 잘리지 않도록 수정 */}
        <h3
          className={`font-bold text-[#1F1F22] whitespace-normal tracking-tight ${
            isLarge
              ? 'text-[18px] leading-[26px]'
              : 'text-[14px] leading-[18px]'
          }`}
        >
          {title}
        </h3>

        {/* 평점과 가격을 담는 부분 */}
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
                <img
                src="/images/icons/StarFilled.svg"
                alt="별점"
                className={isLarge ? 'w-5 h-5' : 'w-4 h-4'}
                />
                <span
                className={`font-medium text-[#1F1F22] tracking-tight ${
                    isLarge
                    ? 'text-[14px] leading-[24px]'
                    : 'text-[12px] leading-[18px]'
                }`}
                >
                {ratingValue}
                </span>
                <span
                className={`font-medium text-[#9FA0A7] tracking-tight ${
                    isLarge
                    ? 'text-[14px] leading-[24px]'
                    : 'text-[12px] leading-[18px]'
                }`}
                >
                {ratingCount}
                </span>
            </div>

            <div className="flex items-baseline">
                <p
                className={`font-bold text-[#1F1F22] tracking-tight ${
                    isLarge
                    ? 'text-[18px] leading-[26px]'
                    : 'text-[15px] leading-[18px]'
                }`}
                >
                {price}
                </p>
                {perPerson && (
                <span
                    className={`font-bold text-[#9FA0A7] tracking-tight ${
                    isLarge
                        ? 'text-[16px] leading-[26px]'
                        : 'text-[12px] leading-[18px]'
                    }`}
                >
                    /인
                </span>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;