import ResponsiveLayout from '@/src/components/pages/detail/ResponsiveLayout';
import { Activity, getActivityById } from '@/src/services/pages/[id]/Activity';
import {
  getReviewsByActivityId,
  ReviewResponse,
} from '@/src/services/pages/[id]/Review';

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
