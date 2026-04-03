import { Bell, Search, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Topbar() {
  return (
    <header className="h-16 border-b bg-white dark:bg-zinc-950 flex items-center justify-between px-8">
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10 bg-slate-50 border-none focus-visible:ring-1" placeholder="Search conversations..." />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-full relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="h-8 w-[1px] bg-border mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Store Owner</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
          <UserCircle className="h-8 w-8 text-slate-400" />
        </div>
      </div>
    </header>
  );
}