import { StatsGrid } from "@/components/dashboard/stats-grid";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { RecentConversations } from "@/components/dashboard/recent-conversations";

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here is what is happening today.</p>
      </div>

      <StatsGrid />

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Store Activity</h3>
          <AnalyticsChart />
        </div>

        <div className="md:col-span-3 bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Recent Chats</h3>
          <RecentConversations />
        </div>
      </div>
    </div>
  );
}