export interface INotification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface INotifications {
  cursorId: number | null;
  notifications: INotification[];
  totalCount: number;
}
