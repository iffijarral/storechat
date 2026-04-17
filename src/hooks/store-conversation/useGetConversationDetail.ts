// hooks/useGetConversationDetail.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuthStore } from "@/store/authStore";
import { ConversationDetailResponse } from "@/types/conversation";

export function useGetConversationDetail(conversationId: string | null) {
  const activeStoreId = useAuthStore((state) => state.activeStoreId);

  return useQuery<ConversationDetailResponse>({
    queryKey: ["conversation-detail", activeStoreId, conversationId],
    queryFn: async () => {
      // Logic check: only run if we have both IDs
      if (!activeStoreId || !conversationId) {
        throw new Error("Missing Store ID or Conversation ID");
      }

      const res = await api.get(`/stores/${activeStoreId}/conversations/${conversationId}`);
      return res.data;
    },
    // The query only runs if both IDs exist
    enabled: !!activeStoreId && !!conversationId,
    // Since this is a detailed view, we might want it to stay fresh
    staleTime: 10 * 1000, // 10 seconds
    // refetchInterval: (query) => {
    //   const status = query.state.data?.status;
    // const isLive =
    //   status === "active" ||
    //   status === "active_human" ||
    //   status === "pending_human";
    //   // Only poll actively when conversation is live
    //   return isLive ? 5000 : false;
    // },
  });
}