import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, ShieldCheck, Zap } from "lucide-react";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple Nav */}
      <header className="px-6 lg:px-10 h-16 flex items-center border-b">
        <span className="text-xl font-bold tracking-tight">StoreChat</span>
        <nav className="ml-auto flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter">
            Your Store on <span className="text-primary">Autopilot.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            The AI-powered chatbot that connects to your WooCommerce store, 
            answers customers, and boosts sales while you sleep.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-md gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl">
          <FeatureCard icon={Zap} title="Instant Sync" desc="Connects to your products in seconds." />
          <FeatureCard icon={Bot} title="Smart AI" desc="Powered by the latest LLM technology." />
          <FeatureCard icon={ShieldCheck} title="Secure" desc="Enterprise-grade data protection." />
        </div>
      </main>
    </div>
  );
}

import { LucideIcon } from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col items-center">
      <Icon className="h-10 w-10 text-primary mb-4" />
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{desc}</p>
    </div>
  );
}