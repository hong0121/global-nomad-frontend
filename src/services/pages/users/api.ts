import { UserResponseType } from '@/src/types/userType';
import { apiClient } from '../../primitives/apiClient';

interface IAvatarResponse {
  profileImageUrl: string;
}

interface IMyInfoPayload {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}

export async function postAvatar(image: FormData): Promise<IAvatarResponse> {
  try {
    const res = await apiClient.post(
      '/users/me/image',
      {
        image: image.get('image'),
      },
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('아바타 업로드에 실패했습니다!', err.message);
    throw err;
  }
}

export async function patchMyInfo(
  payload: Partial<IMyInfoPayload>
): Promise<UserResponseType> {
  try {
    console.log(payload);
    const res = await apiClient.patch('/users/me', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('내 정보 수정에 실패했습니다!', err.message);
    throw err;
  }
}
