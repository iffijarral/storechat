// components/dashboard/sidebar.tsx
"use client";

import { LayoutDashboard, MessageSquare, Bot, Store, BarChart3, UserCircle } from "lucide-react";

const navigation = [
  { name: "Overview", id: "overview", icon: LayoutDashboard },
  { name: "Conversations", id: "conversations", icon: MessageSquare },
  // { name: "Bot Settings", id: "bot-settings", icon: Bot },
  { name: "Store Config", id: "storeConfig", icon: Store },
  { name: "Analytics", id: "analytics", icon: BarChart3 },
  { name: "Profile", id: "profile", icon: UserCircle },
];

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) {
  return (
    <aside className="w-64 border-r bg-white dark:bg-zinc-950">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === item.id 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}