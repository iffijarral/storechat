import { StatsGrid } from "@/components/dashboard/stats-grid";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { RecentConversations } from "@/components/dashboard/recent-conversations";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Performance and active chat sessions.</p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="w-4 h-4" />
          Connect New Store
        </Button>
      </div>

      {/* KPI Stats (Total Chats, AI Accuracy, Tokens Used) */}
      <StatsGrid />

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Chart (60% width) */}
        <div className="md:col-span-4 bg-white dark:bg-zinc-900 border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Chat Volume (7 Days)</h3>
          <AnalyticsChart />
        </div>

        {/* Activity Feed (40% width) */}
        <div className="md:col-span-3 bg-white dark:bg-zinc-900 border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Live Conversations</h3>
          <RecentConversations />
        </div>
      </div>
    </>
  );
}