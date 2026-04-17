import { StoreBase } from "./store";

export interface UserBase {
  email: string;
  name?: string | null;
}

export interface UserResponse extends UserBase {
  id: string; // UUID
  is_active: boolean;
  created_at: string; // ISO DateTime
  stores: StoreBase[];
}

export interface RegisterRequest extends UserBase {
  password: string; // Note: Frontend should enforce 12-128 chars based on your Pydantic validator
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: UserResponse;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  is_active?: boolean;
}

export interface UnifiedSignupRequest {
  // User Identity
  email: string;
  password: string;
  full_name: string; 

  // Initial Store Setup
  store_name: string;
  store_url: string;
  woo_consumer_key: string;
  woo_consumer_secret: string;
}