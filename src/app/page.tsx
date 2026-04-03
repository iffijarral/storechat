"use client";

import { useAuth } from "@/hooks/useAuth";
import { DashboardOverview } from "@/components/dashboard/overview";
import { LandingPage } from "@/components/marketing/landing-page";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function RootPage() {
  const { user, isLoading } = useAuth();

  // 1. Prevent "Flash of Unstyled Content" (FOUC)
  if (isLoading) {
    return <LoadingScreen />;
  }

  // 2. If Logged In -> Show Dashboard
  if (user) {
    return <DashboardOverview />;
  }

  // 3. If Guest -> Show Marketing/Landing Page
  return <LandingPage />;
}