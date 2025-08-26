interface Props {
  rating: number;
}

export default function RatingText({ rating }: Props) {
  const getRatingText = (score: number) => {
    if (score >= 4.5) return '최고 만족';
    if (score >= 4.0) return '매우 만족';
    if (score >= 3.0) return '만족';
    if (score >= 2.0) return '보통';
    return '불만족';
  };

  return (
    <>
      <span>{getRatingText(rating)}</span>
    </>
  );
}
