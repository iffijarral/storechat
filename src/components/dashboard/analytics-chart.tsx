"use client";

import {
  Area, AreaChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";

import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";
import { SkeletonChart } from "../dashboard/common-skeletons/SkeletonChart";

interface TooltipProps<T, K> {
  active?: boolean;
  payload?: Array<{ name: K; value: T }>;
  label?: string | number;
}

function ChartTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-xl text-xs">
      <p className="text-slate-400 mb-0.5">{String(label ?? "")}</p>
      <p className="font-bold text-slate-900 dark:text-white">{payload[0]?.value} conversations</p>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 text-slate-300 dark:text-slate-700">
      <p className="text-xs font-medium">No activity yet in this period</p>
    </div>
  );
}

export function AnalyticsChart() {
  const { data, isLoading } = useAnalytics("7d");

  if (isLoading) return <SkeletonChart height="h-[220px]" className="border-0 p-0 bg-transparent dark:bg-transparent" />;

  const chartData = data?.conversation_volume ?? [];
  const hasData = chartData.length > 0 && chartData.some((d) => d.value > 0);

  return (
    <div className="h-55 w-full">
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100 dark:stroke-slate-800" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              dy={8}
              tickFormatter={(v) => {
                const d = new Date(v);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#chartGrad)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <EmptyChart />
      )}
    </div>
  );
}