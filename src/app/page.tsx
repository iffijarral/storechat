"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { LandingPage } from "@/components/marketing/landing-page";
import { useAuthStore } from "@/store/authStore";
// Import your Dashboard files
import DashboardLayout from "./(dashboard)/layout";
import DashboardPage from "./(dashboard)/page";
import { StoreConfigView } from "@/components/dashboard/storeConfig";
import { ConversationsView } from "@/components/dashboard/conversations/ConversationsView";
import { ProfileView } from "@/components/dashboard/profile/ProfileView";

export default function RootPage() {
  const { user, isLoading } = useAuthStore(); 
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) return <LoadingScreen />;

  if (user) {
    return (
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === "overview" && <DashboardPage />}
        {activeTab === "storeConfig" && <StoreConfigView />}
        {activeTab === "conversations" && <ConversationsView />}
        {activeTab === "profile" && <ProfileView />}
      </DashboardLayout>
    );
  }

  return <LandingPage />;
}