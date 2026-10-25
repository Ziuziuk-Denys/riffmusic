import { RiffPage } from "@/components/RiffPage";
import { getRiffStats } from "@/components/lib/stats";

export default async function Home() {
  const stats = await getRiffStats();
  return <RiffPage stats={stats} />;
}
