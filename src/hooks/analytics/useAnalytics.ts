// hooks/useAnalytics.ts
import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analyticsService";
import { useAuthStore } from "@/store/authStore";

export function useAnalytics(range: "7d" | "30d" | "90d" = "30d") {
  const activeStoreId = useAuthStore((state) => state.activeStoreId);  

  return useQuery({
    queryKey: ["analytics", activeStoreId, range],
    queryFn: async () => {
      if (!activeStoreId) {
        throw new Error("Missing store ID");
      }
      return analyticsService.getReport(activeStoreId, range);
    },
    enabled: !!activeStoreId,
    staleTime: 1000 * 60 * 5,
  });
}