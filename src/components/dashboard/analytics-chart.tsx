"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "Mar 27", sessions: 45 },
  { date: "Mar 28", sessions: 52 },
  { date: "Mar 29", sessions: 48 },
  { date: "Mar 30", sessions: 70 },
  { date: "Mar 31", sessions: 61 },
  { date: "Apr 01", sessions: 85 },
  { date: "Apr 02", sessions: 78 },
];

export function AnalyticsChart() {
  return (
    <div className="h-[300px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            className="stroke-muted/30" 
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="sessions"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSessions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}