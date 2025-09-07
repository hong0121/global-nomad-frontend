import React from "react";

const HeroSection = () => {
  return (
    // --- 1. 메인 컨테이너: Figma 명세에 맞춰 스타일을 수정했습니다. ---
    // max-w-[1120px], h-[500px], rounded-[24px]를 적용했습니다.
    <section 
      className="relative w-full max-w-[1120px] h-[500px] rounded-[24px] overflow-hidden shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]"
    >
      
      {/* --- 2. 배경 이미지 --- */}
      {/* div의 배경으로 이미지를 설정하여 '채우기' 효과를 구현합니다. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Dancing.jpg')" }}
      />
      
      {/* --- 3. 그라데이션 오버레이 --- */}
      {/* 이미지 위에 겹쳐져 텍스트 가독성을 높여줍니다. */}
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) -47.7%, rgba(0, 0, 0, 0.5) 100%)' }}
      />
      
      {/* --- 4. 텍스트 컨텐츠 --- */}
      {/* justify-center를 justify-end로 변경하고 하단 패딩(pb-14)을 추가하여 텍스트를 아래로 내렸습니다. */}
      <div className="relative h-full flex flex-col items-center justify-end text-center text-white px-4 pb-14">
        
        {/* -- 메인 제목 -- */}
        <h1 
          className="font-bold text-[32px] leading-none -tracking-[0.025em]"
        >
          함께 배우면 즐거운 스트릿 댄스
        </h1>
        
        {/* -- 부제목 -- */}
        <p 
          className="font-bold text-[18px] leading-none -tracking-[0.025em] mt-[19px]"
        >
          1월의 인기 체험 BEST 🔥
        </p>

      </div>
    </section>
  );
};

export default HeroSection;
