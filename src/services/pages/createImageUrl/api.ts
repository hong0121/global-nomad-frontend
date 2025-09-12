import { apiClient } from '@/src/services/primitives/apiClient';

export const uploadActivityImage = async (file: File) => {
  if (!file) throw new Error('업로드할 파일이 없습니다.');
  const formData = new FormData();
  formData.append('image', file);

  try {
    const { data } = await apiClient.post<{ activityImageUrl: string }>(
      '/activities/image',
      formData
    );
    return data.activityImageUrl;
  } catch (err) {
    console.error('❌ 이미지 업로드 실패', err);
    throw err;
  }
};

export const uploadActivityImages = async (files: File[]) => {
  const urls: string[] = [];

  for (const file of files) {
    const url = await uploadActivityImage(file);
    urls.push(url);
  }

  return urls;
};
