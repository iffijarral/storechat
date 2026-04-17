"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

export function useGetStoreConfig() {
  const activeStoreId = useAuthStore((state) => state.activeStoreId);

  return useQuery({
    queryKey: ["store-config", activeStoreId],

    queryFn: async () => {
      if (!activeStoreId) throw new Error("No store selected");

      const res = await api.get(`/stores/${activeStoreId}/config`);
      
      return res.data;
    },

    enabled: !!activeStoreId, // only run when store exists
    staleTime: 30 * 1000, // 30 seconds (or even 1–5 min)
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 min
  });
}