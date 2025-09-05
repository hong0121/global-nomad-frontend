// 좌표 생성
export function createLatLng(y: string | number, x: string | number) {
  return new window.kakao.maps.LatLng(
    parseFloat(y as string),
    parseFloat(x as string)
  );
}

// 지도 옵션 생성
export function getMapOptions(center: { lat: number; lng: number }) {
  return {
    center: new window.kakao.maps.LatLng(center.lat, center.lng),
    level: 3,
    scrollwheel: false,
  };
}

// 마커 생성
export function createMarker(map: kakao.maps.Map, position: kakao.maps.LatLng) {
  return new window.kakao.maps.Marker({ map, position });
}

// 지도 리사이즈 트리거
export function triggerResize(map: kakao.maps.Map, center: kakao.maps.LatLng) {
  window.kakao.maps.event.trigger(map, 'resize');
  map.setCenter(center);
}
