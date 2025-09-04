'use client';

import { useEffect, useRef } from 'react';
import { Activity } from '@/src/types/activityType';
import useMapLoader from '@/src/hooks/pages/detail/useMapLoader';
import { useBreakPoint } from '@/src/hooks/useBreakPoint';
import {
  createLatLng,
  getMapOptions,
  createMarker,
  triggerResize,
} from '@/src/utils/mapUtils';

interface Props {
  activity: Activity;
}

export default function ActivityMap({ activity }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const markerCoordsRef = useRef<kakao.maps.LatLng | null>(null);
  const isLoaded = useMapLoader();
  const { isMd, isLg } = useBreakPoint();

  const fallbackCoords = { lat: 37.5665, lng: 126.978 };

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // 기존 지도 정리
    mapInstanceRef.current = null;

    // 지도 생성
    const map = new window.kakao.maps.Map(
      mapRef.current,
      getMapOptions(fallbackCoords)
    );
    mapInstanceRef.current = map;

    // 주소 -> 좌표 변환
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(activity.address, (result, status) => {
      if (status === 'OK' && result.length > 0) {
        const coords = createLatLng(result[0].y, result[0].x);
        markerCoordsRef.current = coords;
        map.setCenter(coords);
        createMarker(map, coords);

        // 지도 리사이즈
        setTimeout(() => triggerResize(map, coords), 100);
      }
    });
  }, [isLoaded, activity.address]);

  // 리사이즈 이벤트
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current && markerCoordsRef.current) {
        triggerResize(mapInstanceRef.current, markerCoordsRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMd, isLg]);

  // clean up
  useEffect(() => {
    return () => {
      mapInstanceRef.current = null;
      if (mapRef.current) mapRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className='w-full h-45 md:h-80 lg:h-[450px] rounded-2xl shadow'
    />
  );
}
