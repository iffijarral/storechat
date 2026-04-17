export interface BrandingConfig {
  primary_color: string;
  secondary_color?: string;
  font_family?: string;
  bot_name: string;
  logo_url?: string | null;
  bot_avatar?: string | null;
}

export interface BehaviorConfig {
  welcome_message: string;
  placeholder_text: string;
  suggested_questions: string[];
}

export interface UIConfig {
  position: "bottom-right" | "bottom-left";
  button_style: "rounded" | "square";
  chat_window_size: "small" | "medium" | "large";
  show_branding: boolean;
  theme: "light" | "dark";
}

export interface RAGConfig {
  chunk_size: number;
  chunk_overlap: number;
  k_neighbors: number;
  similarity_threshold: number;
  max_chunks: number;
  max_context_chars: number;
  min_context_length: number;
  llm_timeout: number;
  system_prompt_override?: string | null;
}

export interface StoreConfigResponse {
  store_id: string;
  branding: BrandingConfig;
  behavior: BehaviorConfig;
  ui: UIConfig;
  rag: RAGConfig;
}

export interface StoreRegistrationRequest {
  store_url: string;
  store_name: string;
  woo_consumer_key: string;
  woo_consumer_secret: string;
}

export interface StoreResponse extends StoreBase {  
  store_url: string;
  owner_id: string;
  is_active: boolean;
  created_at: string;
}

export interface StoreBase {
  id: string; // UUID
  store_id: string;
  store_name: string;
}