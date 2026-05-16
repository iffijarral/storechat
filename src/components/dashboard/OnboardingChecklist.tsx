"use client";
 
import { useRouter } from "next/navigation";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { useReingestStore } from "@/hooks/store/useReingestStore";
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
 
import { OnboardingStep } from "@/types/onboarding";
 
export function OnboardingChecklist() {
  const router                                       = useRouter();
  const [collapsed, setCollapsed]                    = useState(false);
  const { data, isLoading }                          = useOnboardingStatus();
  const { mutate: reingest, isPending: reingesting } = useReingestStore();
 
  // Disappears once all steps are complete
  if (!isLoading && data?.all_done) return null;
 
  // ── CTA handler — delegates to hook or router based on action ────────────
  const handleCta = (step: OnboardingStep) => {
    if (step.cta_action === "reingest") {
      reingest();
    } else if (step.cta_path) {
      router.push(step.cta_path);
    }
  };
 
  // ── Icon resolver — based on raw status field, not string matching ────────
  const renderIcon = (step: OnboardingStep, index: number) => {
    if (step.done) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
    }
    if (step.status === "processing") {
      return (
        <div className="w-5 h-5 shrink-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    if (step.status === "failed") {
      return (
        <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold text-red-500">!</span>
        </div>
      );
    }
    return (
      <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0">
        <span className="text-[10px] font-bold text-slate-400">
          {index + 1}
        </span>
      </div>
    );
  };
 
  // ── Label colour — based on raw status field ──────────────────────────────
  const labelClass = (step: OnboardingStep) =>
    cn(
      "text-sm font-medium",
      step.done          ? "text-slate-400 line-through"          :
      step.status === "failed"     ? "text-red-500"               :
      step.status === "processing" ? "text-blue-600 dark:text-blue-400" :
      "text-slate-800 dark:text-slate-100",
    );
 
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
 
      {/* ── Header ── */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white text-left">
              Get Started
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 text-left">
              {isLoading
                ? "Loading..."
                : `${data?.steps.filter((s) => s.done).length} of ${data?.steps.length} steps complete`}
            </p>
          </div>
 
          {!isLoading && data && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${data.progress}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                {data.progress}%
              </span>
            </div>
          )}
        </div>
 
        {collapsed
          ? <ChevronDown className="w-4 h-4 text-slate-400" />
          : <ChevronUp   className="w-4 h-4 text-slate-400" />}
      </button>
 
      {/* ── Steps ── */}
      {!collapsed && (
        <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
 
          {/* Loading skeleton */}
          {isLoading && [...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
              <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0" />
              <div className="w-48 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
          ))}
 
          {/* Step rows */}
          {!isLoading && data?.steps.map((step, index) => {
            const isRetryAction = step.cta_action === "reingest";
 
            return (
              <div
                key={step.key}
                className={cn(
                  "flex items-center justify-between px-6 py-4 transition-colors",
                  step.done
                    ? "opacity-60"
                    : "bg-slate-50/50 dark:bg-slate-800/20",
                )}
              >
                {/* Icon + label */}
                <div className="flex items-center gap-4 min-w-0">
                  {renderIcon(step, index)}
 
                  <span className={labelClass(step)}>
                    {step.status_text || step.label}
                  </span>
                </div>
 
                {/* CTA — only shown when step is not done and cta_label exists */}
                {!step.done && step.cta_label && (
                  <button
                    onClick={() => handleCta(step)}
                    disabled={isRetryAction && reingesting}
                    className={cn(
                      "flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0 ml-4 disabled:opacity-50",
                      isRetryAction
                        ? "text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20"
                        : "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20",
                    )}
                  >
                    {isRetryAction && reingesting ? (
                      <>
                        <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        {isRetryAction
                          ? <RotateCcw className="w-3 h-3" />
                          : <ArrowRight className="w-3 h-3" />}
                        {step.cta_label}
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}