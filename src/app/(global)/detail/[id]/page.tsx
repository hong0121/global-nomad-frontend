interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  return (
    <main>
      <h1>체험 상세 페이지</h1>
      <p>체험 ID: {id}</p>
    </main>
  );
}
