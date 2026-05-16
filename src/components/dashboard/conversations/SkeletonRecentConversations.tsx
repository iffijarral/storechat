import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "../common-skeletons/SkeletonCard";

export function SkeletonConversationRow() {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-9 h-9 rounded-full shrink-0" />
        <div>
          <Skeleton className="w-28 h-3.5 rounded mb-2" />
          <Skeleton className="w-40 h-3 rounded" />
        </div>
      </div>
      <Skeleton className="w-10 h-3 rounded" />
    </div>
  );
}
 
export function SkeletonStatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
 
export function SkeletonRecentConversations() {
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {[...Array(4)].map((_, i) => <SkeletonConversationRow key={i} />)}
    </div>
  );
}