export interface IReservedSchedule {
  date: string;
  reservations: IScheduleCount;
}

export interface IScheduleCount {
  completed: number;
  confirmed: number;
  pending: number;
}
