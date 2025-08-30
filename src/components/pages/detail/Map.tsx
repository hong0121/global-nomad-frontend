'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Activity } from '@/src/types/activityType';
import { KAKAO_JAVASCRIPT_KEY } from '@/src/constants/social';

interface Props {
  activity: Activity;
}

export default function ActivityMap({ activity }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const fallbackCoords = { lat: 37.5665, lng: 126.978 }; // 서울 시청

  // 지도 초기화 함수
  const initializeMap = () => {
    if (!mapRef.current || !window.kakao?.maps) return;

    // 이미 생성된 지도 인스턴스가 있다면 파괴
    if (mapInstanceRef.current) {
      mapInstanceRef.current.destroy && mapInstanceRef.current.destroy();
    }

    // 지도 생성
    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(
        fallbackCoords.lat,
        fallbackCoords.lng
      ),
      level: 3,
      draggable: true,
      // 성능 최적화를 위해 확대, 축소 이벤트 방지
      scrollwheel: false,
    });
    mapInstanceRef.current = map;

    // 주소-좌표 변환
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      activity.address,
      (
        result: kakao.maps.services.AddressSearchResult[],
        status: kakao.maps.services.Status
      ) => {
        if (
          status === window.kakao.maps.services.Status.OK &&
          result.length > 0
        ) {
          const coords = new window.kakao.maps.LatLng(
            parseFloat(result[0].y),
            parseFloat(result[0].x)
          );

          // 결과 좌표로 지도 중심 이동
          map.setCenter(coords);

          // 마커 찍기
          new window.kakao.maps.Marker({
            map,
            position: coords,
          });
        } else {
          console.warn('주소 변환 실패, fallback 좌표 사용');
        }
      }
    );
  };

  // 스크립트가 로드되면 지도 초기화
  useEffect(() => {
    if (isScriptLoaded) {
      initializeMap();
    }
  }, [isScriptLoaded, activity.address]);

  // cleanup
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy && mapInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* 카카오 지도 SDK 비동기 로드 */}
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`}
        strategy='afterInteractive'
        onLoad={() => {
          // SDK 로드 후 kakao.maps.load를 통해 초기화
          window.kakao.maps.load(() => {
            setIsScriptLoaded(true);
          });
        }}
      />

      {/* 지도 영역 */}
      <div
        ref={mapRef}
        className='w-full h-[180px] md:h-80 lg:h-[450px] rounded-2xl shadow'
      />
    </>
  );
}
