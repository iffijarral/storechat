import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-black">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header with Search/User Profile */}
        <Topbar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}