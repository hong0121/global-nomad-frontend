'use client';

import { useEffect, useRef, useState } from 'react';
import { Activity } from '@/src/types/activityType';
import { KAKAO_JAVASCRIPT_KEY } from '@/src/constants/social';

interface Props {
  activity: Activity;
}

export default function ActivityMap({ activity }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const markerCoordsRef = useRef<kakao.maps.LatLng | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const fallbackCoords = { lat: 37.5665, lng: 126.978 };

  // 스크립트 동적 로드
  useEffect(() => {
    // 이미 로드되었는지 확인
    if (window.kakao?.maps) {
      setIsScriptLoaded(true);
      return;
    }

    // 스크립트 태그 생성
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log('Kakao script loaded');
      window.kakao.maps.load(() => {
        console.log('Kakao maps initialized');
        setIsScriptLoaded(true);
      });
    };

    script.onerror = () => {
      console.error('Failed to load Kakao maps script');
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {};
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return;

    console.log('Initializing map...');

    // 이전 지도 인스턴스 정리
    if (mapInstanceRef.current) {
      // destroy 메서드가 없으므로 null로 설정만 함
      mapInstanceRef.current = null;
    }

    // 지도 생성
    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(
        fallbackCoords.lat,
        fallbackCoords.lng
      ),
      level: 3,
      scrollwheel: false,
    });

    mapInstanceRef.current = map;

    // 주소 검색
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(activity.address, (result, status) => {
      if (status === 'OK' && result.length > 0) {
        const coords = new kakao.maps.LatLng(
          parseFloat(result[0].y),
          parseFloat(result[0].x)
        );

        markerCoordsRef.current = coords;

        map.setCenter(coords);

        new window.kakao.maps.Marker({
          map,
          position: coords,
        });

        // 지도 리사이즈
        setTimeout(() => {
          window.kakao.maps.event.trigger(map, 'resize');
          map.setCenter(coords);
        }, 100);
      }
    });
  }, [isScriptLoaded, activity.address]);

  // 리사이즈 이벤트 처리
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current && window.kakao?.maps?.event) {
        window.kakao.maps.event.trigger(mapInstanceRef.current, 'resize');

        if (markerCoordsRef.current) {
          mapInstanceRef.current.setCenter(markerCoordsRef.current);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      // 지도 인스턴스 정리
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }

      // 지도 컨테이너 내용 비우기
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className='w-full h-[180px] md:h-80 lg:h-[450px] rounded-2xl shadow'
    />
  );
}
