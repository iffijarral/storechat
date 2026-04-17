import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { StoreConfigValues } from "@/lib/validations/storeConfig";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export function useStoreConfig() {
  const queryClient = useQueryClient();
  const activeStoreId = useAuthStore((state) => state.activeStoreId);

  const updateMutation = useMutation({
    mutationFn: async (values: StoreConfigValues) => {
      const res = await api.patch(`/stores/${activeStoreId}/config`, values);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Configuration updated successfully");

      // 🔥 IMPORTANT: invalidate cache
      queryClient.invalidateQueries({
        queryKey: ["store-config"],
      });
    },

    onError: (error: unknown) => {
      toast.error(
        (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Failed to update store configuration"
      );
    },
  });

  return {
    updateConfig: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}