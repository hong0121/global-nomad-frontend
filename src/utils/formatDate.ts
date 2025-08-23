// 날짜 형식 변환 함수 ("2025-12-01" => "2025. 12. 14")

export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDay()).padStart(2, '0');

  return `${year}. ${month}. ${day}`;
}
