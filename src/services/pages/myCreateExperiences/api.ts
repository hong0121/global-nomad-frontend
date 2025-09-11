import { apiClient } from '../../primitives/apiClient';

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface CreateExperienceDto {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export const createExperience = async (data: CreateExperienceDto) => {
  const res = await apiClient.post('/activities', data);
  return res.data;
};
