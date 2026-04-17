// components/dashboard/layout.tsx
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function DashboardLayout({ 
  children, 
  activeTab, 
  setActiveTab 
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-black">
      {/* Pass the state and the setter to the Sidebar 
          so it can highlight the active button and 
          change the view when clicked.
      */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}