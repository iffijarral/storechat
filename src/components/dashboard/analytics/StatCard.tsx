// components/analytics/StatCard.tsx
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  isCurrency?: boolean;
}

export function StatCard({ label, value, change, isCurrency }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;
  
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 border rounded-2xl">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-end gap-2 mt-2">
        <h3 className="text-2xl font-bold">
          {isCurrency ? `$${value}` : value}
        </h3>
        {change !== undefined && (
          <span className={`text-xs font-medium flex items-center mb-1 ${
            isPositive ? "text-emerald-600" : "text-red-600"
          }`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
}