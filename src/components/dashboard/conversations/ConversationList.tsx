"use client";

import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { ConversationSummaryResponse } from "@/types/conversation";

interface ListProps {
  conversations: ConversationSummaryResponse[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusDot: Record<string, string> = {
  active:        "bg-green-500",
  pending_human: "bg-amber-500 animate-pulse",
  active_human:  "bg-blue-500",
  resolved:      "bg-slate-300",
  ended:         "bg-slate-200",
};

export function ConversationList({ conversations, selectedId, onSelect }: ListProps) {
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-900">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={cn(
            "w-full text-left p-4 transition-all relative",
            selectedId === conv.id 
              ? "bg-white dark:bg-slate-900 shadow-sm z-10" 
              : "hover:bg-slate-50 dark:hover:bg-slate-900/40"
          )}
        >
          {selectedId === conv.id && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
          )}
          
          <div className="flex justify-between items-start mb-1.5">
            <span className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
              ID: {conv.thread_id.slice(-6)}
            </span>
            <span className="text-[10px] text-slate-400">
              {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <div className={cn("w-2 h-2 rounded-full", statusDot[conv.status] ?? "bg-slate-300")} />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
              {conv.intent || "General Inquiry"}
            </span>
          </div>
          
          <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
            <span>{conv.total_messages} msgs</span>
            <span>•</span>
            <span>{conv.tokens_used.toLocaleString()} tokens</span>
          </div>
        </button>
      ))}
    </div>
  );
}