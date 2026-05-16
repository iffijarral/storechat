// src/hooks/useBilling.ts

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { billingService } from "@/services/billingService";
import { useAuthStore } from "@/store/authStore";
import { ChangePlanRequest } from "@/types/billing";
import { toast } from "sonner";

// ─────────────────────────────────────────
// Query key factory — consistent cache keys
// ─────────────────────────────────────────
export const billingKeys = {
  all: (storeId: string) => ["billing", storeId] as const,
  summary: (storeId: string) => ["billing", storeId, "summary"] as const,
};

// ─────────────────────────────────────────
// Fetch billing summary
// ─────────────────────────────────────────
export function useBillingSummary() {
  const activeStoreId = useAuthStore((state) => state.activeStoreId);

  return useQuery({
    queryKey: billingKeys.summary(activeStoreId ?? ""),
    queryFn: () => {
      if (!activeStoreId) throw new Error("No store selected");
      return billingService.getSummary(activeStoreId);
    },
    enabled: !!activeStoreId,
    staleTime: 1000 * 60 * 5,   // 5 min — billing data doesn't change often
  });
}

// ─────────────────────────────────────────
// Change plan (upgrade or downgrade)
// ─────────────────────────────────────────
export function useChangePlan() {
  const queryClient = useQueryClient();
  const activeStoreId = useAuthStore((state) => state.activeStoreId);

  const mutation = useMutation({
    mutationFn: async (data: ChangePlanRequest) => {
      if (!activeStoreId) throw new Error("No store selected");
      return billingService.changePlan(activeStoreId, data);
    },

    onSuccess: (data) => {
      // Invalidate billing summary so the banner and cards refresh
      queryClient.invalidateQueries({
        queryKey: billingKeys.summary(activeStoreId ?? ""),
      });

      const action = data.is_upgrade ? "upgraded" : "downgraded";
      const timing = data.effective_immediately
        ? "Your new plan is active now."
        : `Your plan changes at the end of the current billing period.`;

      toast.success(`Successfully ${action} to ${data.new_plan.name}. ${timing}`);
    },

    onError: (error: unknown) => {
      const detail =
        (error as { response?: { data?: { detail?: string } } })?.response
          ?.data?.detail ?? "Failed to change plan. Please try again.";
      toast.error(detail);
    },
  });

  return {
    changePlan: mutation.mutateAsync,
    isChanging: mutation.isPending,
  };
}