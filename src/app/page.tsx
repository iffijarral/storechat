"use client";

import { useEffect } from "react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const token = useAuthStore((s) => s.token);
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;
    if (token) router.push("/dashboard");
  }, [hasHydrated, token, router]);

  if (!hasHydrated) return <LoadingScreen />;
}