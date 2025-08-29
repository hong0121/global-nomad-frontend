export interface IReservedSchedule {
  date: string;
  reservations: IScheduleCount;
}

export interface IScheduleCount {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface IAvailableReservationSchedule {
  date: Date;
  times:
    | {
        endTime: string;
        startTime: string;
        id: number;
      }[]
    | null;
}

export interface ISubImage {
  id: number;
  imageUrl: string;
}

export interface ISchedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface IActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: ISubImage[];
  schedules: ISchedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface IReservation {
  scheduleId: number;
  headCount: number;
}
