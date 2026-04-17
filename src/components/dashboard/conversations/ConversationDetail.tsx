"use client";

import { useState, useRef, useEffect } from "react";
import { useGetConversationDetail } from "@/hooks/store-conversation/useGetConversationDetail";
import { useUpdateConversationStatus } from "@/hooks/store-conversation/useUpdateConversationStatus";
import { useAgentReply } from "@/hooks/store-conversation/useAgentReply";
import { MessageResponse } from "@/types/conversation";
import { cn } from "@/lib/utils";
import { Send, Sparkles, AlertCircle, CheckCircle2, User, Bot } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

// 1. Status Mapping for dynamic UI
const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "AI Active", className: "bg-green-100 text-green-700" },
  pending_human: { label: "Pending Human", className: "bg-amber-100 text-amber-700" },
  active_human: { label: "Human Active", className: "bg-blue-100 text-blue-700" },
  resolved: { label: "Resolved", className: "bg-slate-100 text-slate-500" },
  ended: { label: "Ended", className: "bg-slate-100 text-slate-400" },
};

interface Props {
  conversationId: string;
}

export function ConversationDetail({ conversationId }: Props) {
  const [reply, setReply] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);
  // Hooks
  const { data, isLoading, error } = useGetConversationDetail(conversationId);
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateConversationStatus(conversationId);
  const { mutate: sendReply, isPending: isSending } = useAgentReply(conversationId);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data?.messages]);

  const handleSend = async () => {
    if (!reply.trim() || !data) return;

    sendReply(
      {
        threadId: data.thread_id,
        message: reply,
        agentId: user?.id ?? "admin", // Fallback to "admin" if user ID is not available
      },
      {
        onSuccess: () => {
          setReply("");
          // Auto-transition from pending_human → active_human on first reply
          if (data.status === "pending_human") {
            updateStatus("active_human");
          }
        },
      }
    );
  };

  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center text-slate-400 text-sm animate-pulse">
      Loading history...
    </div>
  );

  if (error || !data) return (
    <div className="flex-1 flex items-center justify-center text-red-500 text-sm">
      <AlertCircle className="w-4 h-4 mr-2" />
      Failed to load conversation.
    </div>
  );

  // Determine Badge UI
  const badge = statusConfig[data.status] ?? { label: data.status, className: "bg-slate-100 text-slate-500" };

  const canReply = data.status === "pending_human" || data.status === "active_human";

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      {/* 1. Header Area */}
      <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950 z-10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold">Thread: {data.thread_id.slice(-8)}</h3>
            <span className={cn(
              "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
              badge.className
            )}>
              {badge.label}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Last active: {new Date(data.last_message_at).toLocaleString()}</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-mono text-slate-400">Tokens: {data.tokens_used}</p>
          {data.last_intent && <p className="text-[10px] text-blue-500 font-medium italic">{data.last_intent}</p>}
        </div>
      </header>

      {/* 2. Escalation / Human Intervention Alerts */}
      {(data.status === "pending_human" || data.status === "active_human") && (
        <div className={cn(
          "border-b p-3 flex items-center justify-between transition-colors",
          data.status === "pending_human" ? "bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/40" : "bg-blue-50/30 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/40"
        )}>
          <p className={cn(
            "text-xs flex items-center gap-2 font-medium",
            data.status === "pending_human" ? "text-amber-700 dark:text-amber-400" : "text-blue-700 dark:text-blue-400"
          )}>
            <AlertCircle className="w-4 h-4" />
            {data.status === "pending_human" ? "AI is paused. Customer awaiting response." : "Human Mode Active: AI will not respond."}
          </p>
          <button
            className="flex items-center gap-1.5 text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm font-bold disabled:opacity-50"
            onClick={() => updateStatus("resolved")}
            disabled={isUpdatingStatus}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> MARK RESOLVED
          </button>
        </div>
      )}

      {/* 3. Message List */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-slate-900/5 custom-scrollbar"
      >
        {data.messages.map((msg: MessageResponse) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div
              className={cn(
                "px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none"
              )}
            >
              {msg.content}
            </div>

            <div className="mt-1.5 flex gap-2 text-[9px] text-slate-400 font-medium uppercase px-1 items-center">
              {msg.role === "user" ? <User className="w-2.5 h-2.5" /> : <Bot className="w-2.5 h-2.5" />}
              <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              {msg.role === "assistant" && (
                <>
                  <span>•</span>
                  <span>{msg.tokens_used} tokens</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Input UI (Manual Reply & Notes), Only visible when status is active_human */}
      {canReply && (
        <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            {/* <div className="flex items-center gap-4 mb-3 px-1">
            <button
              onClick={() => setIsInternal(false)}
              className={cn(
                "text-[11px] font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all",
                !isInternal ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-500"
              )}
            >
              Reply to Customer
            </button>
            <button
              onClick={() => setIsInternal(true)}
              className={cn(
                "text-[11px] font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all",
                isInternal ? "border-amber-500 text-amber-500" : "border-transparent text-slate-400 hover:text-slate-500"
              )}
            >
              Internal Note
            </button>
          </div> */}

            <div className="relative flex items-end gap-3">
              <div className="relative flex-1">
                <textarea
                  rows={1}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  disabled={data.status === "ended" || data.status === "resolved"}
                  placeholder={isInternal ? "Add a private note for staff..." : "Type your message to the customer..."}
                  className={cn(
                    "w-full bg-slate-50 dark:bg-slate-900 border rounded-xl py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 transition-all resize-none max-h-32 custom-scrollbar disabled:opacity-50",
                    isInternal
                      ? "border-amber-200 focus:ring-amber-500/30 focus:border-amber-400"
                      : "border-slate-200 dark:border-slate-800 focus:ring-blue-500/30 focus:border-blue-400"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                {!isInternal && (
                  <button
                    className="absolute right-3 bottom-3 p-1 text-slate-400 hover:text-blue-500"
                    title="AI Draft Suggestion"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={handleSend}
                disabled={!reply.trim() || data.status === "ended" || data.status === "resolved"}
                className={cn(
                  "p-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:grayscale",
                  isInternal ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-2 text-[10px] text-center text-slate-400">
              {data.status === "resolved" || data.status === "ended"
                ? "Conversation is closed. Re-open to send messages."
                : "Enter to send • Shift + Enter for new line"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}