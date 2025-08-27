import ResponsiveLayout from '@/src/components/pages/detail/ResponsiveLayout';
import { getActivityById } from '@/src/services/pages/detail/activity';
import { getReviewsByActivityId } from '@/src/services/pages/detail/review';
import { Activity } from '@/src/types/activityType';
import { ReviewResponse } from '@/src/types/reviewType';

interface Props {
  params: { id: string };
}

export default async function DetailPage({ params }: Props) {
  const { id } = await params;
  const activityId = Number(id);
  const activity: Activity = await getActivityById(activityId);
  const reviewData: ReviewResponse = await getReviewsByActivityId(activityId);

  // ResponsiveLayout 컴포넌트에 데이터만 전달
  return <ResponsiveLayout activity={activity} reviewData={reviewData} />;
}
