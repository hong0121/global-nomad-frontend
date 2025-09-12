import { queries } from '@/src/services/primitives/queries';
import { deleteTokenAction } from '@/src/services/primitives/tokenAction';
import { useTokenStore } from '@/src/store/useTokenStore';
import { getQueryClient } from '@/src/utils/getQueryClient';

const PUBLIC_PATH_PATTERNS = [
  /^\/$/,
  /^\/detail\/\d+$/,
  /^\/login$/,
  /^\/login\/social\/kakao$/,
  /^\/signup$/,
  /^\/signup\/social\/kakao$/,
];

export default function logout() {
  const currentPath = window.location.pathname;

  // 1. accessToken을 zustand로 로컬스토리지에서 삭제
  useTokenStore.getState().deleteAccessToken();

  // 2. refreshToken 쿠키에서 삭제
  deleteTokenAction();

  // 3. 리액트 쿼리 유저 정보 초기화
  const queryClient = getQueryClient();
  queryClient.removeQueries({ queryKey: queries.user() });

  const isPublicPath = PUBLIC_PATH_PATTERNS.some((regex) =>
    regex.test(currentPath)
  );

  if (!isPublicPath) {
    // 4. 인증 필요 O - 로그인 페이지 이동
    window.location.href = '/login';
  }
  // 4. 인증 필요 X - 현재 페이지 유지
}
