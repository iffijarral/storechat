import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5", className)}>
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-9 h-9 rounded-xl" />
        <Skeleton className="w-12 h-4 rounded-full" />
      </div>
      <Skeleton className="w-16 h-3 rounded mb-3" />
      <Skeleton className="w-24 h-7 rounded" />
      <Skeleton className="w-32 h-3 rounded mt-2" />
    </div>
  );
}