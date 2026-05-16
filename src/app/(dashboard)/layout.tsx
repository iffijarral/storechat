"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const activeStoreId = useAuthStore((s) => s.activeStoreId);
  const token = useAuthStore((s) => s.token);
  const pathname      = usePathname();
  const hasHydrated   = useAuthStore((s) => s.hasHydrated);    
  const isSetupPage   = pathname === "/dashboard/setup";

  useEffect(() => {
    if (!hasHydrated) return;   // ← wait for rehydration

    if (!token) {
      router.push("/login");
      return;
    }
    if (!activeStoreId && !isSetupPage) {
      router.push("/dashboard/setup");
      return;
    }
    if (activeStoreId && isSetupPage) {
      router.push("/dashboard");
    }
  }, [hasHydrated, token, activeStoreId, isSetupPage, router]);

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!activeStoreId) return null;  // prevent flash of dashboard before redirect
  if (!token) return null;          // prevent flash of dashboard before redirect

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8">
          {children} {/* This is where the specific page content renders */}
        </main>
      </div>
    </div>
  );
}