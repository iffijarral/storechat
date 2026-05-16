"use client";

import {
  LayoutDashboard, MessageSquare, Settings2,
  Settings, ShieldCheck, CreditCard, BarChart3,
  MessageCircle,
  Puzzle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview",      href: "/dashboard",      icon: LayoutDashboard },
  { name: "Test Chat", href: "/test-chat", icon: MessageCircle },
  { name: "Conversations", href: "/conversations",  icon: MessageSquare },
  { name: "Store Config",  href: "/store-config",   icon: Settings2 },
  { name: "Analytics",     href: "/analytics",      icon: BarChart3 },
  { name: "Billing",       href: "/billing",        icon: CreditCard },
  { name: "Install Plugin", href: "/settings/plugin", icon: Puzzle },
  { name: "Settings",      href: "/settings/api-keys", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white dark:bg-zinc-950 flex flex-col h-screen transition-all">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
            StoreChat
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-4">
          Main Menu
        </p>

        {navItems.map((item) => {
          
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100",
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-400 group-hover:text-zinc-600",
              )} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4">
          <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 mb-1">Need help?</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-3">
            Check our documentation for store setup.
          </p>
          <button className="text-xs font-semibold text-blue-600 hover:underline">
            View Docs
          </button>
        </div>
      </div>
    </aside>
  );
}