import { apiClient } from '@/src/services/primitives/apiClient';

interface SubmitReviewBody {
  rating: number;
  content: string;
}

export async function submitReview(
  reservationId: number,
  body: SubmitReviewBody
) {
  try {
    const res = await apiClient.post(
      `/my-reservations/${reservationId}/reviews`,
      body
    );
    return res.data;
  } catch (err) {
    if (err instanceof Error)
      console.error('리뷰 등록에 실패했습니다.', err.message);
  }
}
