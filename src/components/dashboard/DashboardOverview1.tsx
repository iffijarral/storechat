"use client";

// components/dashboard/DashboardOverview.tsx

import { StatsGrid } from "@/components/dashboard/stats-grid/StatsGrid";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { RecentConversations } from "@/components/dashboard/conversations/RecentConversations";


// interface Props {
//   // Passed down from the parent layout that controls navigation
//   onNavigateToConversation: (conversationId: string) => void;
// }

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Here is what is happening in your store today.
        </p>
      </div>

      {/* KPI Cards — real data */}
      <StatsGrid />

      {/* Chart + Recent Conversations */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Store Activity
          </h3>
          <p className="text-[11px] text-slate-400 mb-4">Conversations over the last 7 days</p>
          <AnalyticsChart />
        </div>

        <div className="md:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Chats</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Latest 5 conversations</p>
            </div>
          </div>
          <RecentConversations />
        </div>
      </div>
    </div>
  );
}