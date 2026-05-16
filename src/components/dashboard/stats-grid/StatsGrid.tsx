"use client";

import { MessageCircle, ShieldCheck, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";
import { SkeletonStatsGrid } from "@/components/dashboard/stats-grid/SkeletonStatsGrid";

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  positive?: boolean;
}

function StatCard({ title, value, sub, icon, iconBg, positive }: StatCardProps) {
  return (
    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* ambient glow */}
      <div className={cn("absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-[0.08]", iconBg)} />

      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-xl bg-opacity-10 dark:bg-opacity-20", iconBg)}>
          {icon}
        </div>
      </div>

      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">{value}</p>
      <p className={cn(
        "text-[11px] font-medium mt-1.5",
        positive === undefined ? "text-slate-400" : positive ? "text-emerald-600" : "text-red-500",
      )}>
        {sub}
      </p>
    </div>
  );
}

export function StatsGrid() {
  const { data, isLoading } = useAnalytics("7d");

  if (isLoading) return <SkeletonStatsGrid />;

  const summary = data?.summary;

  const formatResolution = (s: number) => {
    if (!s) return "—";
    if (s < 60) return `${Math.round(s)}s`;
    if (s < 3600) return `${Math.round(s / 60)}m`;
    return `${(s / 3600).toFixed(1)}h`;
  };

  const formatResponseTime = (ms: number) => {
    if (!ms) return "—";
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const stats: StatCardProps[] = [
    {
      title: "Total Chats",
      value: summary?.total_conversations.toLocaleString() ?? "0",
      sub: "Last 7 days",
      icon: <MessageCircle className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-500",
    },
    {
      title: "Total Messages",
      value: summary?.total_messages.toLocaleString() ?? "0",
      sub: "Across all conversations",
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      iconBg: "bg-amber-500",
    },
    {
      title: "Containment Rate",
      value: summary ? `${summary.containment_rate}%` : "—",
      sub: "AI resolved without human",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      iconBg: "bg-emerald-500",
      positive: (summary?.containment_rate ?? 0) >= 70,
    },
    {
      title: "Avg Response",
      value: formatResponseTime(summary?.avg_response_time_ms ?? 0),
      sub: formatResolution(summary?.avg_resolution_time ?? 0) + " avg resolution",
      icon: <Clock className="w-4 h-4 text-violet-600" />,
      iconBg: "bg-violet-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}