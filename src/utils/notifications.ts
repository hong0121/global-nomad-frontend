export const isRecent = (createdAt: string, updatedAt?: string) => {
  const baseTime = updatedAt || createdAt;
  return (
    new Date().getTime() - new Date(baseTime).getTime() < 24 * 60 * 60 * 1000
  );
};

export type NotificationType =
  | 'RESERVATION_APPROVED'
  | 'RESERVATION_REJECTED'
  | 'OTHER';

export const getNotificationType = (content: string): NotificationType => {
  if (content.includes('승인')) return 'RESERVATION_APPROVED';
  if (content.includes('거절')) return 'RESERVATION_REJECTED';
  return 'OTHER';
};

export const parseContent = (content: string) => {
  let formatted = content.replace(/(\))\s*(예약)/, '$1<br />$2');
  if (content.includes('승인'))
    formatted = formatted.replace(
      '승인',
      `<span class="text-primary-500">승인</span>`
    );
  if (content.includes('거절'))
    formatted = formatted.replace(
      '거절',
      `<span class="text-red-500">거절</span>`
    );
  return formatted;
};
