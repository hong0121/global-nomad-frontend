"use client";
import Gnb from "@/app/(global)/_components/Header/Gnb";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <header className="sticky top-0">
      <div className="flex justify-between items-center max-w-[1520px] h-12 mx-auto px-6 md:px-[30px] lg:px-0 lg:w-[calc(100%-60px)]">
        <h1>
          <Link href="/" className="w-7 md:w-[174px]">
            <Image
              src="/images/LogoSm.svg"
              width={28}
              height={28}
              alt="GlobalNomad"
              className="md:hidden"
            />
            <Image
              src="/images/LogoLg.svg"
              width={174}
              height={28}
              alt="GlobalNomad"
              className="hidden md:block"
            />
          </Link>
        </h1>

        {isLogin ? (
          // 로그인 전
          <div className="flex items-center gap-5">
            <div className="relative">
              <button>알림 아이콘</button>
            </div>
            <span className="w-[1px] h-[14px] bg-gray-100" />
            <div className="relative">
              <button className="flex items-center gap-[10px]">
                <Image
                  src="/images/UserDefaultImg.svg"
                  width={30}
                  height={30}
                  alt="유저 기본 이미지"
                />
                <strong className="text-14 font-medium">홍길동</strong>
              </button>
            </div>
          </div>
        ) : (
          // 로그인 후
          <Gnb />
        )}
      </div>
    </header>
  );
}
