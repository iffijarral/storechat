import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonChart({ className, height = "h-[240px]" }: { className?: string; height?: string }) {
  return (
    <div className={cn("bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="w-36 h-4 rounded mb-2" />
          <Skeleton className="w-48 h-3 rounded" />
        </div>
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
      <div className={cn("relative w-full", height)}>
        {/* Fake bars to suggest chart shape */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 px-2 h-full">
          {[40, 65, 45, 80, 55, 70, 48, 90, 60, 75].map((h, i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-t-md"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}