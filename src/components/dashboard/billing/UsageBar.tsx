"use client";

import { UsageMeter } from "@/types/billing";

type UsageBarProps = UsageMeter;

function formatUsageValue(used: number, limit: number | null): string {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`);
  if (limit === null) return `${fmt(used)} / ∞`;
  return `${fmt(used)} / ${fmt(limit)}`;
}

export function UsageBar({ label, used, limit, percentage }: UsageBarProps) {
  const pct = percentage ?? 0;
  const fillColor = pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-400" : "bg-emerald-500";

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
          {formatUsageValue(used, limit)}
        </span>
      </div>
      <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillColor}`}
          style={{ width: limit === null ? "0%" : `${pct}%` }}
        />
      </div>
    </div>
  );
}