// hooks/store-conversation/useUpdateConversationStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

export function useUpdateConversationStatus(conversationId: string) {
  const activeStoreId = useAuthStore((state) => state.activeStoreId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (status: string) => {
      const res = await api.patch(
        `/stores/${activeStoreId}/conversations/${conversationId}/status`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => {
      // Refresh both the detail and the list
      queryClient.invalidateQueries({ queryKey: ["conversation-detail", activeStoreId, conversationId] });
      queryClient.invalidateQueries({ queryKey: ["store-conversations", activeStoreId] });
    },
  });
}