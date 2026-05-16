"use client";

import { CheckIcon, X } from 'lucide-react';
import { Plan, BillingCycle } from "@/types/billing";

interface PlanCardProps {
  plan: Plan;
  isCurrent: boolean;
  isSelected: boolean;
  billingCycle: BillingCycle;
  onSelect: () => void;
}

const formatPrice = (cents: number) => cents === 0 ? "$0" : `$${Math.round(cents / 100)}`;

export function PlanCard({ plan, isCurrent, isSelected, billingCycle, onSelect }: PlanCardProps) {
  const price = billingCycle === "yearly" ? plan.price_yearly : plan.price_monthly;

  const features = [
    {
      label: plan.max_stores === 0 ? "Unlimited stores" : `${plan.max_stores} store${plan.max_stores > 1 ? "s" : ""}`,
      ok: true,
    },
    {
      label: plan.max_products === null ? "Unlimited conversations/mo" : `${plan.max_products.toLocaleString()} conversations/mo`,
      ok: true,
    },
    { label: plan.analytics_enabled ? "Advanced analytics" : "Basic analytics", ok: true },
    { label: "Email support", ok: plan.priority_support || plan.analytics_enabled },
    { label: "Custom bot persona", ok: plan.custom_branding },
    { label: "Priority support", ok: plan.priority_support },
  ];

  return (
    <div
      onClick={!isCurrent ? onSelect : undefined}
      className={[
        "relative rounded-2xl bg-white dark:bg-zinc-900 p-6 flex flex-col gap-4 transition-all duration-150",
        isCurrent
          ? "border-2 border-emerald-500 dark:border-emerald-400 cursor-default"
          : isSelected
          ? "border-2 border-blue-500 dark:border-blue-400 cursor-pointer"
          : "border border-zinc-200 dark:border-zinc-700 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-500",
      ].join(" ")}
    >
      {plan.tier === "pro" && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <span className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium px-3 py-1 rounded-b-lg border border-t-0 border-emerald-200 dark:border-emerald-700">
            Most popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-1">
        <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{plan.name}</span>
        {isCurrent && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ current</span>}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{formatPrice(price)}</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">/mo</span>
      </div>

      <ul className="flex flex-col gap-2">
        {features.map((f) => (
          <li key={f.label} className="flex items-center gap-2 text-sm">
            {f.ok ? (
              <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <X className="w-4 h-4 text-zinc-300 dark:text-zinc-600 shrink-0" />
            )}
            <span className={f.ok ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-600"}>
              {f.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}