import { Bot } from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

interface AuthBrandingPanelProps {
  quote?: string;
  tagline?: string;
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { value: "2 min", label: "Setup time" },
  { value: "24/7", label: "AI availability" },
  { value: "100%", label: "WooCommerce native" },
];

export function AuthBrandingPanel({
  quote = "Set up once, automate forever. Your AI support agent never sleeps.",
  tagline = "Join store owners using StoreChat to handle orders, FAQs, and product queries automatically — 24/7.",
  stats = DEFAULT_STATS,
}: AuthBrandingPanelProps) {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-linear-to-br from-emerald-400 to-blue-500">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <span className="font-serif text-xl font-normal tracking-tight text-slate-100">
          StoreChat
        </span>
      </div>

      {/* Quote / value prop */}
      <div className="space-y-4">
        <blockquote className="text-3xl font-bold leading-snug tracking-tight">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <p className="text-primary-foreground/70 text-sm max-w-xs">{tagline}</p>
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-3 gap-4 border-t border-primary-foreground/20 pt-6">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-primary-foreground/60 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}