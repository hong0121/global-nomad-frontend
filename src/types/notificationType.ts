export interface INotification {
  cursorId: number;
  notification: {
    id: number;
    teamId: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }[];
  totalCount: number;
}
