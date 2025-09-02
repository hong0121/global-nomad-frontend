import { useEffect, useState } from 'react';
import { KAKAO_JAVASCRIPT_KEY } from '@/src/constants/social';

export default function useMapLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao?.maps) {
      setLoaded(true);
      return;
    }

    // 중복 로드 방지
    if (document.getElementById('kakao-script')) return;

    const script = document.createElement('script');
    script.id = 'kakao-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true);
      });
    };

    script.onerror = () => {
      console.error('카카오 지도 로드 실패');
    };

    document.head.appendChild(script);
  }, []);

  return loaded;
}
