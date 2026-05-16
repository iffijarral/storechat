import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";
import { OnboardingStatus } from "@/types/onboarding";

export function useOnboardingStatus() {
  const activeStoreId = useAuthStore((s) => s.activeStoreId);

  return useQuery<OnboardingStatus>({
    queryKey: ["onboarding-status", activeStoreId],
    queryFn: async () => {
      const res = await api.get(`/stores/${activeStoreId}/onboarding-status`);
      return res.data;
    },
    enabled: !!activeStoreId,
    staleTime: 30 * 1000,   // recheck every 30s — owner may complete steps
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data || data.all_done) return 30000;

      const configStep = data.steps.find(s => s.key === "store_configured");
      const isBusy = configStep?.status === "processing"
        || configStep?.status === "pending";

      return isBusy ? 5000 : 30000;
    },
  });
}