export interface APIKeySummary {
  id: string;
  name: string | null;
  key_prefix: string;
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
}
 
export interface APIKeyCreated {
  id: string;
  name: string | null;
  key_prefix: string;
  raw_key: string;
  created_at: string;
}