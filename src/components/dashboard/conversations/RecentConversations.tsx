"use client";

// components/dashboard/recent-conversations.tsx

import { useGetStoreConversations } from "@/hooks/store-conversation/useGetStoreConversations";
import { SkeletonRecentConversations } from "./SkeletonRecentConversations";
import { ConversationSummaryResponse } from "@/types/conversation";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

// Status dot color mapping
const STATUS_DOT: Record<string, string> = {
  active:        "bg-green-500",
  pending_human: "bg-amber-500 animate-pulse",
  active_human:  "bg-blue-500",
  resolved:      "bg-slate-300",
  ended:         "bg-slate-200",
};

// Relative time formatter (no dependency needed)
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// interface Props {
//   // Parent passes this to switch to the conversations tab
//   // and pre-select the conversation
//   onSelectConversation: (id: string) => void;
// }

function EmptyConversations() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-300 dark:text-slate-700">
      <div className="p-3 rounded-full bg-slate-50 dark:bg-slate-800">
        <MessageSquare className="w-6 h-6" />
      </div>
      <p className="text-xs font-medium text-slate-400">No conversations yet</p>
      <p className="text-[11px] text-slate-300 dark:text-slate-600 text-center max-w-45">
        Conversations will appear here once your widget is live.
      </p>
    </div>
  );
}

interface Props {
  // Parent passes this to switch to the conversations tab
  // and pre-select the conversation
  onSelectConversation: (id: string) => void;
}

export function RecentConversations({ onSelectConversation }: Props) {
  const { data, isLoading } = useGetStoreConversations();

  if (isLoading) return <SkeletonRecentConversations />;

  const conversations: ConversationSummaryResponse[] = data?.conversations?.slice(0, 5) ?? [];

  if (conversations.length === 0) return <EmptyConversations />;

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
      {conversations.map((conv) => (
        <button
          key={conv.id}          
          className="w-full flex items-center justify-between py-3 group text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 -mx-2 px-2 rounded-xl transition-colors"
          onClick={() => onSelectConversation(conv.id)}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar placeholder with status dot */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                {conv.thread_id.slice(-2).toUpperCase()}
              </div>
              <span className={cn(
                "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900",
                STATUS_DOT[conv.status] ?? "bg-slate-300",
              )} />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {conv.intent
                  ? conv.intent.replace(/_/g, " ")
                  : "General Inquiry"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {conv.total_messages} messages · {conv.status.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          {/* Time */}
          <span className="text-[11px] text-slate-400 shrink-0 ml-2 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            {timeAgo(conv.last_message_at)}
          </span>
        </button>
      ))}
    </div>
  );
}