"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useGetStoreConversations } from "@/hooks/store-conversation/useGetStoreConversations";
import { ConversationList } from "./ConversationList";
import { ConversationDetail } from "./ConversationDetail";
import { ConversationSummaryResponse } from "@/types/conversation"; 
import { MessageSquare } from "lucide-react";

export function ConversationsView() {
  const activeStoreId = useAuthStore((state) => state.activeStoreId);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, error } = useGetStoreConversations();

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading conversations...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">Error loading inbox.</div>;

  // Type-safe conversations array
  const conversations: ConversationSummaryResponse[] = data?.conversations || [];

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="w-1/3 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/20">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" /> 
            Inbox
            <span className="ml-2 text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {conversations.length}
            </span>
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <ConversationList 
            conversations={conversations} 
            selectedId={selectedId} 
            onSelect={setSelectedId} 
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white dark:bg-black">
        {selectedId ? (
          <ConversationDetail conversationId={selectedId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-900 mb-4">
              <MessageSquare className="w-8 h-8 opacity-20" />
            </div>
            <p className="text-sm font-medium">Select a thread to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}