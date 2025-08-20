interface DetailPageProps {
  params: { id: string };
}

export default function DetailPage({ params }: DetailPageProps) {
  return (
    <main>
      <h1>체험 상세 페이지</h1>
      <p>체험 ID: {params.id}</p>
    </main>
  );
}
