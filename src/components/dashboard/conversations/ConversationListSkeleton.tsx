// components/conversations/conversation-list-skeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

function ConversationRowSkeleton() {
  return (
    <div className="p-4 border-b border-slate-100 dark:border-slate-900">
      {/* Top row: ID + time */}
      <div className="flex justify-between items-start mb-3">
        <Skeleton className="w-16 h-3 rounded" />
        <Skeleton className="w-12 h-3 rounded" />
      </div>

      {/* Middle row: status dot + intent */}
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="w-2 h-2 rounded-full shrink-0" />
        <Skeleton className="w-32 h-3.5 rounded" />
      </div>

      {/* Bottom row: msgs + tokens */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-3 rounded" />
        <Skeleton className="w-1 h-1 rounded-full" />
        <Skeleton className="w-16 h-3 rounded" />
      </div>
    </div>
  );
}

export function ConversationListSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-900">
      {[...Array(rows)].map((_, i) => (
        <ConversationRowSkeleton key={i} />
      ))}
    </div>
  );
}