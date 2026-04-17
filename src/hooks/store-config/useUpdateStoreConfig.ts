"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { StoreConfigValues } from "@/lib/validations/storeConfig";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export function useUpdateStoreConfig() {
  const queryClient = useQueryClient();
  const activeStoreId = useAuthStore((state) => state.activeStoreId);

  const mutation = useMutation({
    mutationFn: async (values: StoreConfigValues) => {
      if (!activeStoreId) throw new Error("No store selected");
      const res = await api.patch(`/stores/${activeStoreId}/config`, values);
      return res.data;
    },

    onSuccess: (data) => {
      toast.success("Configuration updated successfully");
      
      // ✅ Set the returned data directly in cache
      queryClient.setQueryData(
        ["store-config", activeStoreId],
        data
      );

    },

    onError: () => {
      toast.error("Failed to update configuration");
    },
  });

  return {
    updateConfig: mutation.mutateAsync,
    isUpdating: mutation.isPending,
  };
}