import type { Metadata } from "next";
import { BotMessageSquare } from "lucide-react";

import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | StoreChat Dashboard",
  description: "Reset your StoreChat store dashboard password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left panel: branding ─────────────────────────────────────────── */}
      <AuthBrandingPanel
        quote="Every customer question answered, every order tracked — automatically."
        tagline="Reset your StoreChat store dashboard password."
        stats={[
          { value: "< 1s", label: "Avg. response time" },
          { value: "24/7", label: "AI availability" },
          { value: "0", label: "Missed inquiries" },
        ]}
      />

      {/* ── Right panel: form ────────────────────────────────────────────── */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <BotMessageSquare className="h-6 w-6 text-primary" />
            <span className="text-base font-semibold">WooChat</span>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
