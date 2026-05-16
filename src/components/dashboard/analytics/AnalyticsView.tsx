"use client";

import { useState } from "react";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  MessageSquare, Zap, Clock, ShieldCheck,
  TrendingUp, TrendingDown, Minus, AlertCircle, BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type Range = "7d" | "30d" | "90d";

// ─── Palette ─────────────────────────────────────────────────────────────────

const INTENT_COLORS = [
  "#2563eb", "#7c3aed", "#0891b2", "#059669", "#d97706", "#dc2626",
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function RangePill({
  label, value, active, onClick,
}: { label: string; value: Range; active: boolean; onClick: (v: Range) => void }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all",
        active
          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
          : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
      )}
    >
      {label}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;           // positive = good, negative = bad
  trendLabel?: string;
  accent: string;           // tailwind bg class for icon bg
}

type BarTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    name?: string;
  }>;
  label?: string | number;
};

function StatCard({ label, value, icon, trend, trendLabel, accent }: StatCardProps) {
  const hasTrend = trend !== undefined;
  const isUp = (trend ?? 0) > 0;
  const isFlat = trend === 0;

  return (
    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 overflow-hidden group hover:shadow-md transition-shadow">
      {/* accent glow */}
      <div className={cn("absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl", accent)} />

      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-xl", accent, "bg-opacity-10 dark:bg-opacity-20")}>
          {icon}
        </div>
        {hasTrend && (
          <span className={cn(
            "flex items-center gap-0.5 text-[11px] font-bold",
            isFlat ? "text-slate-400" : isUp ? "text-emerald-600" : "text-red-500",
          )}>
            {isFlat ? <Minus className="w-3 h-3" /> : isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend ?? 0)}%
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">{value}</p>
        {trendLabel && (
          <p className="text-[10px] text-slate-400 mt-0.5">{trendLabel}</p>
        )}
      </div>
    </div>
  );
}

// Custom tooltip for AreaChart
function VolumeTooltip({ active, payload, label }: BarTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-xl text-xs">
      <p className="text-slate-400 mb-0.5">{label??""}</p>
      <p className="font-bold text-slate-900 dark:text-white">{payload[0]?.value} conversations</p>
    </div>
  );
}

// Custom tooltip for BarChart
function BarTooltip({ active, payload, label }: BarTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-xl text-xs">
      <p className="text-slate-400 mb-0.5">{String(label ?? "")}</p>
      <p className="font-bold text-slate-900 dark:text-white">{payload[0]?.value} conversations</p>
    </div>
  );
}

// Empty state
function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-300 dark:text-slate-700">
      <BarChart2 className="w-8 h-8" />
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AnalyticsView() {
  const [range, setRange] = useState<Range>("30d");
  const { data, isLoading, error } = useAnalytics(range);

  const RANGES: { label: string; value: Range }[] = [
    { label: "7 days", value: "7d" },
    { label: "30 days", value: "30d" },
    { label: "90 days", value: "90d" },
  ];

  // ── Loading ──
  if (isLoading) return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        ))}
      </div>
      <div className="h-72 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );

  // ── Error ──
  if (error || !data) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-red-400">
      <AlertCircle className="w-8 h-8" />
      <p className="text-sm font-medium">Failed to load analytics</p>
      <p className="text-xs text-slate-400">Check your connection and try again</p>
    </div>
  );

  const hasVolumeData = data.conversation_volume?.length > 0;
  const hasTopicData = data.topic_distribution?.length > 0;

  // Format avg resolution time nicely
  const formatResolution = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${(seconds / 3600).toFixed(1)}h`;
  };

  // Format response time
  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-6">

      {/* ── Header with range selector ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Analytics</h2>
          <p className="text-xs text-slate-400 mt-0.5">Performance overview for your store</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl p-1">
          {RANGES.map((r) => (
            <RangePill key={r.value} {...r} active={range === r.value} onClick={setRange} />
          ))}
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Conversations"
          value={data.summary.total_conversations.toLocaleString()}
          icon={<MessageSquare className="w-4 h-4 text-blue-600" />}
          accent="bg-blue-500"
          trendLabel={`Last ${range}`}
        />
        <StatCard
          label="Containment Rate"
          value={`${data.summary.containment_rate}%`}
          icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
          accent="bg-emerald-500"
          trendLabel="AI resolved without human"
        />
        <StatCard
          label="Avg Resolution"
          value={formatResolution(data.summary.avg_resolution_time)}
          icon={<Clock className="w-4 h-4 text-violet-600" />}
          accent="bg-violet-500"
          trendLabel="Per conversation"
        />
        <StatCard
          label="Avg Response Time"
          value={formatResponseTime(data.summary.avg_response_time_ms)}
          icon={<Zap className="w-4 h-4 text-amber-500" />}
          accent="bg-amber-500"
          trendLabel="AI response latency"
        />
      </div>

      {/* ── Conversation Volume Chart ── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Conversation Volume</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Daily conversations over the last {range}</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <div className="w-3 h-0.5 bg-blue-600 rounded" />
            Conversations
          </div>
        </div>

        <div className="h-60">
          {hasVolumeData ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.conversation_volume} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => {
                    const d = new Date(v);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<VolumeTooltip />} cursor={{ stroke: "#2563eb", strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fill="url(#volGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart label="No conversation data for this period" />
          )}
        </div>
      </div>

      {/* ── Bottom Row: Topic Bar + Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Topic Distribution — Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Topic Breakdown</h3>
          <p className="text-[11px] text-slate-400 mb-6">Conversations by detected intent</p>

          <div className="h-50">
            {hasTopicData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.topic_distribution}
                  layout="vertical"
                  margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                  barSize={10}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    width={110}
                    tickFormatter={(v) => v.replace(/_/g, " ")}
                  />
                  <Tooltip content={<BarTooltip />} cursor={{ fill: "#f8fafc" }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {data.topic_distribution.map((_, i) => (
                      <Cell key={i} fill={INTENT_COLORS[i % INTENT_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart label="No topic data for this period" />
            )}
          </div>
        </div>

        {/* Status Distribution — Donut */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">AI Containment</h3>
          <p className="text-[11px] text-slate-400 mb-4">How conversations were resolved</p>

          {hasTopicData ? (
            <div className="flex items-center gap-6">
              {/* Donut */}
              <div className="w-35 h-35 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "AI Contained", value: data.summary.containment_rate },
                        { name: "Escalated", value: Math.max(0, 100 - data.summary.containment_rate) },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="#2563eb" />
                      <Cell fill="#f1f5f9" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-3 flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="text-[11px] text-slate-500 font-medium">AI Contained</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white pl-4">
                    {data.summary.containment_rate}%
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <span className="text-[11px] text-slate-500 font-medium">Escalated to Human</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white pl-4">
                    {Math.max(0, Math.round(100 - data.summary.containment_rate))}%
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] text-slate-400">
                    {data.summary.total_conversations} total · {Math.round(data.summary.total_conversations * data.summary.containment_rate / 100)} AI resolved
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-35">
              <EmptyChart label="No data for this period" />
            </div>
          )}
        </div>
      </div>

      {/* ── Footer metrics ── */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Total Messages</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {data.summary.total_messages.toLocaleString()}
            </p>
          </div>
          <MessageSquare className="w-8 h-8 text-slate-200 dark:text-slate-700" />
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Tokens Consumed</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {data.summary.total_tokens.toLocaleString()}
            </p>
          </div>
          <Zap className="w-8 h-8 text-slate-200 dark:text-slate-700" />
        </div>
      </div>

    </div>
  );
}