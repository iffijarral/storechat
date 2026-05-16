"use client";

// ConversationsView.tsx

import { useState } from "react";
import { useGetStoreConversations } from "@/hooks/store-conversation/useGetStoreConversations";
import { ConversationList } from "./ConversationList";
import { ConversationDetail } from "./ConversationDetail";
import { ConversationSummaryResponse } from "@/types/conversation";
import { MessageSquare } from "lucide-react";
import { ConversationListSkeleton } from "./ConversationListSkeleton";
import { cn } from "@/lib/utils";

// ─── Status Legend ────────────────────────────────────────────────────────────

const STATUS_LEGEND = [
  { dot: "bg-green-500",                    label: "AI active" },
  { dot: "bg-amber-500 animate-pulse",      label: "Awaiting agent" },
  { dot: "bg-blue-500",                     label: "Agent live" },
  { dot: "bg-slate-300",                    label: "Resolved" },
  { dot: "bg-slate-200 dark:bg-slate-700",  label: "Ended" },
];

function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-5 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
      {STATUS_LEGEND.map(({ dot, label }) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dot)} />
          <span className="text-[10px] text-slate-400 font-medium">{label}</span>
        </span>
      ))}
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────

export function ConversationsView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading, error } = useGetStoreConversations();

  const conversations: ConversationSummaryResponse[] = data?.conversations || [];

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

      {/* ── Left panel: list ── */}
      <div className="w-1/3 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/20">

        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            Inbox
            {!isLoading && (
              <span className="ml-1 text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {conversations.length}
              </span>
            )}
          </h2>
        </div>

        {/* Legend — always visible, not part of scroll */}
        <StatusLegend />

        {/* List — skeleton stays inside the panel */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <ConversationListSkeleton rows={8} />
          ) : error ? (
            <div className="p-6 text-center text-xs text-red-400">
              Failed to load conversations.
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-300 dark:text-slate-700 py-16">
              <MessageSquare className="w-7 h-7" />
              <p className="text-xs font-medium text-slate-400">No conversations yet</p>
            </div>
          ) : (
            <ConversationList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          )}
        </div>
      </div>

      {/* ── Right panel: detail ── */}
      <div className="flex-1 flex flex-col bg-white dark:bg-black">
        {selectedId ? (
          <ConversationDetail conversationId={selectedId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-900 mb-4">
              <MessageSquare className="w-8 h-8 opacity-20" />
            </div>
            <p className="text-sm font-medium">Select a thread to view details</p>
            <p className="text-xs text-slate-300 dark:text-slate-700 mt-1">
              Choose a conversation from the left panel
            </p>
          </div>
        )}
      </div>

    </div>
  );
}