import axiosInstance from './apiClient';

interface SubmitReviewBody {
  rating: number;
  content: string;
}

export async function submitReview(
  reservationId: number,
  body: SubmitReviewBody
) {
  try {
    const res = await axiosInstance.post(
      `/my-reservations/${reservationId}/reviews`,
      body
    );
    return res.data;
  } catch (err: any) {
    console.error('리뷰 등록 실패', err);
    throw err;
  }
}
