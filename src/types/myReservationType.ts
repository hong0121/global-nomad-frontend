export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

export interface MyReservationItem {
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyReservationListResponse {
  cursorId: number | null;
  reservations: MyReservationItem[];
  totalCount: number;
}

export interface CancelMyReservationResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
