// src/services/pages/main/api.ts

import { apiClient } from "@/src/services/primitives/apiClient";
import { ActivitiesResponse } from "@/src/types/activityType";

export type ActivitiesParams = {
  category?: string;
  keyword?: string;
  sort?: "most_reviewed" | "price_asc" | "price_desc" | "latest";
  page?: number;
  size?: number;
};

export const getActivities = async (params: ActivitiesParams) => {
  // --- 👇 이 부분을 추가/수정합니다 ---
  
  // 전달받은 params 객체를 복사합니다.
  const filteredParams: Partial<ActivitiesParams> & { method: string } = {
    method: "offset",
  };

  // params 객체를 순회하며 값이 undefined가 아닌 것만 filteredParams에 추가합니다.
  for (const key in params) {
    if (params[key as keyof ActivitiesParams] !== undefined) {
      (filteredParams as any)[key] = params[key as keyof ActivitiesParams];
    }
  }
  
  // undefined가 모두 제거된 안전한 파라미터로 요청을 보냅니다.
  const { data } = await apiClient.get<ActivitiesResponse>(`/activities`, {
    params: filteredParams,
  });

  // --- 👆 여기까지 ---

  return data;
};