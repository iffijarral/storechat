import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { BotMessageSquare } from "lucide-react";
import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";

export const metadata: Metadata = {
  title: "Create Account | WooChat Dashboard",
  description: "Register your account and connect your WooCommerce store.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left panel: branding ────────────────────────────────────────── */}
      <AuthBrandingPanel
        quote="Set up once, automate forever. Your AI support agent never sleeps."
        tagline="Join store owners using WooChat to handle orders, FAQs, and product queries automatically — 24/7."
        stats={[
          { value: "2 min", label: "Setup time" },
          { value: "24/7", label: "AI availability" },
          { value: "100%", label: "WooCommerce native" },
        ]}
      />
      {/* ── Right panel: form ───────────────────────────────────────────── */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <BotMessageSquare className="h-6 w-6 text-primary" />
            <span className="text-base font-semibold">WooChat</span>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
