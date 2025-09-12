import { apiClient } from '../../primitives/apiClient';

export interface UpdateExperiencePayload {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrlsToAdd: string[]; // 기존 + 새로 추가된 이미지
  subImageIdsToRemove: number[]; // 삭제할 이미지 ID
  scheduleIdsToRemove: number[]; // 삭제할 스케줄 ID
  schedulesToAdd: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export async function getExperienceDetail(activityId: string) {
  const response = await apiClient.get(`activities/${activityId}`);
  return response.data;
}

export async function updateExperience(
  activityId: string,
  payload: UpdateExperiencePayload
) {
  const response = await apiClient.patch(
    `/my-activities/${activityId}`,
    payload
  );
  return response.data;
}
