export type ConversationStatus = 
  | "active" 
  | "pending_human" 
  | "active_human" 
  | "resolved" 
  | "ended"
  | "closed";

export interface MessageResponse {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  intent?: string | null;
  confidence?: number | null;
  tools_used: string[];
  tokens_used: number;
  response_time_ms?: number | null;
  created_at: string;
}

export interface ConversationSummaryResponse {
  id: string;
  thread_id: string;
  intent?: string | null;
  total_messages: number;
  tokens_used: number;
  status: ConversationStatus;
  started_at: string;
  last_message_at: string;
}

export interface ConversationDetailResponse extends ConversationSummaryResponse {
  conversation_id: string;
  store_id: string;
  messages: MessageResponse[];
  tokens_remaining?: number | null;
  requires_auth: boolean;
  last_intent?: string | null;
}

export interface AnalyticsResponse {
  period_days: number;
  total_conversations: number;
  total_messages: number;
  total_tokens: number;
  avg_messages_per_conversation: number;
  avg_response_time_ms: number;
  intent_breakdown: Record<string, number>; // dict in Python
}