"use client";

import { useState } from "react";
import { useBillingSummary, useChangePlan } from "@/hooks/billing/useBilling";
import { Plan, BillingCycle } from "@/types/billing";

// ─────────────────────────────────────────
// Modular Imports
// ─────────────────────────────────────────
import { PlanCard } from "./PlanCard";
import { UsageBar } from "./UsageBar";
import { ConfirmModal } from "./ConfirmModal";
import { BillingLoadingSkeleton } from "./BillingLoadingSkeleton";
import { BillingErrorState } from "./BillingErrorState";

const TIER_ORDER: Record<string, number> = { free: 0, pro: 1, enterprise: 2 };

// Local helper for price formatting in the banner/action row
const formatPrice = (cents: number) => cents === 0 ? "$0" : `$${Math.round(cents / 100)}`;
const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { 
  month: "long", day: "numeric", year: "numeric" 
});

export function BillingView() {
  const { data, isLoading, isError } = useBillingSummary();
  const { changePlan, isChanging } = useChangePlan();

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [showConfirm, setShowConfirm] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>("");

  if (isLoading) return <BillingLoadingSkeleton />;
  if (isError || !data) return <BillingErrorState />;

  const { current_plan, subscription, available_plans, usage } = data;

  // Logic to determine if we are moving up or down the tiers
  const isUpgrade = selectedPlan
    ? (TIER_ORDER[selectedPlan.tier] ?? 0) > (TIER_ORDER[current_plan.tier] ?? 0)
    : false;

  const handleSelectPlan = (plan: Plan) => {
    if (plan.id === current_plan.id) return;
    setSelectedPlan(plan);
    setIdempotencyKey(crypto.randomUUID());
  };

  const handleConfirm = async () => {
    if (!selectedPlan) return;
    try {
      await changePlan({
        new_plan_id: selectedPlan.id,
        billing_cycle: billingCycle,
        idempotency_key: idempotencyKey,
      });
      setShowConfirm(false);
      setSelectedPlan(null);
    } catch (err) {
      console.error("Plan change failed", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. CONFIRMATION MODAL (Conditional) */}
      {showConfirm && selectedPlan && (
        <ConfirmModal
          plan={selectedPlan}
          isUpgrade={isUpgrade}
          periodEnd={subscription.current_period_end}
          isLoading={isChanging}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* 2. CURRENT PLAN BANNER */}
      <section>
        <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">
          Current plan
        </p>
        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {current_plan.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Renews on {formatDate(subscription.current_period_end)} ·{" "}
                {formatPrice(current_plan.price_monthly)}/mo
              </p>
            </div>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase">
            {subscription.status}
          </span>
        </div>
      </section>

      {/* 3. BILLING CYCLE TOGGLE */}
      <div className="flex items-center gap-1 w-fit bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
        {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
          <button
            key={cycle}
            onClick={() => setBillingCycle(cycle)}
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all capitalize ${
              billingCycle === cycle
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700"
            }`}
          >
            {cycle}
          </button>
        ))}
      </div>

      {/* 4. PLAN CARDS GRID */}
      <section>
        <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">
          All plans
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {available_plans.map((plan: Plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrent={plan.id === current_plan.id}
              isSelected={selectedPlan?.id === plan.id}
              billingCycle={billingCycle}
              onSelect={() => handleSelectPlan(plan)}
            />
          ))}
        </div>
      </section>

      {/* 5. ACTION ROW (The "Confirm" area) */}
      <div className="flex items-center gap-4 min-h-[40px]">
        {selectedPlan ? (
          <>
            <button
              onClick={() => setShowConfirm(true)}
              className={`px-5 py-2 text-sm font-medium rounded-lg text-white transition-colors ${
                isUpgrade
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-zinc-700 hover:bg-zinc-800 dark:bg-zinc-600 dark:hover:bg-zinc-500"
              }`}
            >
              {isUpgrade ? `Upgrade to ${selectedPlan.name}` : `Downgrade to ${selectedPlan.name}`}
            </button>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {isUpgrade
                ? `${formatPrice(selectedPlan.price_monthly)}/mo · starts immediately`
                : "Current features remain until billing period ends"}
            </span>
            <button
              onClick={() => setSelectedPlan(null)}
              className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 ml-auto"
            >
              Clear selection
            </button>
          </>
        ) : (
          <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">
            Select a plan above to modify your subscription.
          </p>
        )}
      </div>

      {/* 6. USAGE METERS */}
      <section>
        <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">
          Usage this period
        </p>
        <div className="flex flex-col gap-3">
          {usage.meters.map((meter) => (
            <UsageBar key={meter.label} {...meter} />
          ))}
        </div>
      </section>
    </div>
  );
}