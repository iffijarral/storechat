// hooks/store-conversation/useAgentReply.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";

export function useAgentReply(conversationId: string) {
  const activeStoreId = useAuthStore((state) => state.activeStoreId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ threadId, message, agentId }: { 
      threadId: string; 
      message: string;
      agentId: string;
    }) => {
      const res = await api.post(`/chat/agent-reply`, {
        thread_id: threadId,
        message,
        agent_id: agentId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversation-detail", activeStoreId, conversationId] });
    },
  });
}