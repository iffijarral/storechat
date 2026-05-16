"use client";

import { Bell, UserCircle, LogOut, User, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"; // Ensure you have this shadcn component
import { useAuthStore } from "@/store/authStore";
import { useSwitchStore } from "@/hooks/useSwitchStore";
import { useRouter } from "next/navigation";
import { useBillingSummary } from "@/hooks/billing/useBilling";

export function Topbar() {
  const { user, stores, activeStoreId, logout } = useAuthStore();
  const { data: billingData } = useBillingSummary();
  const switchStore = useSwitchStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to login after logout
  };

  const currentPlanName = billingData?.current_plan?.name || "Free Plan";

  return (
    <header className="h-16 border-b bg-white dark:bg-zinc-950 flex items-center justify-between px-8">
      <div className="relative w-96 hidden md:block">
        <Select value={activeStoreId ?? ""} onValueChange={switchStore}>
          <SelectTrigger className={!activeStoreId ? "border-orange-400" : "w-55"}>
            <SelectValue placeholder="Select a store" />
          </SelectTrigger>
          <SelectContent>
            {stores.map((store) => (
              <SelectItem key={store.store_id} value={store.store_id}>
                {store.store_name || store.store_id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-900 rounded-full relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950" />
        </button>

        <div className="h-8 w-px bg-border mx-2" />

        {/* 🔥 Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 outline-none hover:opacity-80 hover:cursor-pointer transition-opacity">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name || "Store Owner"}</p>
                <p className="text-xs text-muted-foreground uppercase">{currentPlanName}</p>
              </div>
              <UserCircle className="h-8 w-8 text-slate-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}