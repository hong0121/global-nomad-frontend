import { useEffect, useState } from 'react';
import { KAKAO_JAVASCRIPT_KEY } from '@/src/constants/social';

export default function useMapLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 이미 로드되었는지 확인
    if (window.kakao?.maps?.services) {
      setLoaded(true);
      return;
    }

    // 스크립트가 이미 추가되었는지 확인
    const existingScript = document.getElementById('kakao-script');
    if (existingScript) {
      // 스크립트는 있지만 아직 로드되지 않은 경우 대기
      const checkLoaded = setInterval(() => {
        if (window.kakao?.maps?.services) {
          setLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);

      return () => clearInterval(checkLoaded);
    }

    // 스크립트 생성
    const script = document.createElement('script');
    script.id = 'kakao-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setLoaded(true);
        });
      }
    };

    script.onerror = () => {
      console.error('카카오 지도 로드 실패');
    };

    document.head.appendChild(script);
  }, []);

  return loaded;
}
