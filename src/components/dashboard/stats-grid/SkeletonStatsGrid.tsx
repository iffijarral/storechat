import { SkeletonCard } from "../common-skeletons/SkeletonCard";

export function SkeletonStatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
