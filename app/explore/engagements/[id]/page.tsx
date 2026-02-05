import { ENGAGEMENTS_MOCK } from '@/modules/explore/data/engagementsMock';
import EngagementDetailClient from './EngagementDetailClient';

// 1. Generate Static Params (Runs at build time)
export async function generateStaticParams() {
  return ENGAGEMENTS_MOCK.map((engagement) => ({
    id: engagement.id,
  }));
}

// 2. Server Page
// 👇 UPDATE: Type definition handles Promise
type Props = {
  params: Promise<{ id: string }>
}

export default async function EngagementPage({ params }: Props) {
  // 👇 UPDATE: Await the params object before accessing id
  const resolvedParams = await params;
  
  return <EngagementDetailClient id={resolvedParams.id} />;
}