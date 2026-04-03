"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Store, 
  BarChart3,
  Bot
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Bot Settings", href: "/bot-settings", icon: Bot },
  { name: "Store Config", href: "/store-config", icon: Store },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex h-full w-64 flex-col bg-white dark:bg-zinc-950 border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <span className="text-xl font-bold tracking-tight text-primary">StoreChat</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-foreground"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}