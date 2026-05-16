import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";
 
export function useReingestStore() {
  const queryClient   = useQueryClient();
  const activeStoreId = useAuthStore((s) => s.activeStoreId);
 
  return useMutation({
    mutationFn: async () => {
      if (!activeStoreId) throw new Error("No active store");
      const res = await api.post(`/stores/${activeStoreId}/reingest`);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate so checklist polls fresh status immediately
      queryClient.invalidateQueries({
        queryKey: ["onboarding-status", activeStoreId],
      });
    },
  });
}