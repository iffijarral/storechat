import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";
import { APIKeyCreated, APIKeySummary } from "@/types/api_keys";
import { toast } from "sonner";

export function useAPIKeys() {
  const activeStoreId = useAuthStore((s) => s.activeStoreId);

  return useQuery<{ keys: APIKeySummary[] }>({
    queryKey: ["api-keys", activeStoreId],
    queryFn: async () => {
      const res = await api.get(`/stores/${activeStoreId}/api-keys`);
      return res.data;
    },
  });
}
 
export function useGenerateKey() {
  const activeStoreId = useAuthStore((s) => s.activeStoreId);
  const queryClient   = useQueryClient();

  return useMutation<APIKeyCreated, Error, { name: string }>({
    mutationFn: async ({ name }) => {
      const res = await api.post(`/stores/${activeStoreId}/api-keys`, { name });
      return res.data;
    },
    onSuccess: () => {
      toast.success("API key generated successfully");
      queryClient.invalidateQueries({ queryKey: ["api-keys", activeStoreId] });
    },
    onError: () => {
      toast.error("Failed to generate API key");
    },
  });
}
 
export function useRevokeKey() {
  const activeStoreId = useAuthStore((s) => s.activeStoreId);
  const queryClient   = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (keyId) => {
      await api.delete(`/stores/${activeStoreId}/api-keys/${keyId}`);
    },
    onSuccess: () => {
      toast.success("API key revoked");
      queryClient.invalidateQueries({ queryKey: ["api-keys", activeStoreId] });
    },
    onError: () => {
      toast.error("Failed to revoke API key");
    },
  });
}