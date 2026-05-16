export function BillingLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Current Plan Banner Skeleton */}
      <section>
        <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
        <div className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
      </section>

      {/* Cycle Toggle Skeleton */}
      <div className="h-10 w-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />

      {/* Plan Cards Skeleton */}
      <section>
        <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-80 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
          ))}
        </div>
      </section>

      {/* Usage Meters Skeleton */}
      <section>
        <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
        <div className="space-y-3">
          <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
          <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
        </div>
      </section>
    </div>
  );
}