import { Plan } from "@/types/billing";

interface ConfirmModalProps {
  plan: Plan;
  isUpgrade: boolean;
  periodEnd: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ plan, isUpgrade, periodEnd, isLoading, onConfirm, onCancel }: ConfirmModalProps) {
  // Helper functions inside the file for local scope
  const formatPrice = (cents: number) => cents === 0 ? "$0" : `$${Math.round(cents / 100)}`;
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          {isUpgrade ? `Upgrade to ${plan.name}?` : `Downgrade to ${plan.name}?`}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
          {isUpgrade
            ? `You'll move to ${plan.name} (${formatPrice(plan.price_monthly)}/mo). Your new plan starts immediately.`
            : `You'll move to ${plan.name} (${formatPrice(plan.price_monthly)}/mo). Your current features remain active until ${formatDate(periodEnd)}.`}
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={isLoading} className="flex-1 px-4 py-2 text-sm rounded-lg border border-zinc-200 text-zinc-600 disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isLoading} className={`flex-1 px-4 py-2 text-sm rounded-lg font-medium text-white transition-colors disabled:opacity-50 ${isUpgrade ? "bg-emerald-600 hover:bg-emerald-700" : "bg-zinc-700"}`}>
            {isLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}