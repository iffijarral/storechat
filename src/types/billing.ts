// src/types/billing.ts

export type BillingCycle = "monthly" | "yearly";
export type SubscriptionStatus = "active" | "cancelled" | "expired" | "trialing" | "past_due";
export type PlanTier = "free" | "pro" | "enterprise";

export interface Plan {
  id: string;
  name: string;
  tier: PlanTier;
  price_monthly: number;   // cents
  price_yearly: number;    // cents
  max_stores: number;
  max_products: number | null;   // null = unlimited
  max_faqs: number | null;       // null = unlimited
  requests_per_day: number;
  ai_tokens_per_day: number;
  custom_branding: boolean;
  priority_support: boolean;
  analytics_enabled: boolean;
  api_access: boolean;
  is_active: boolean;
}

export interface Subscription {
  id: string;
  store_id: string;
  plan_id: string;
  billing_cycle: BillingCycle;
  status: SubscriptionStatus;
  price_paid: number;         // cents
  discount_amount: number;    // cents
  started_at: string;
  current_period_start: string;
  current_period_end: string;
  cancelled_at: string | null;
  trial_end: string | null;
}

export interface UsageMeter {
  label: string;
  used: number;
  limit: number | null;       // null = unlimited
  unit: string;
  percentage: number | null;  // null = unlimited
}

export interface UsageSummary {
  period_start: string;
  period_end: string;
  meters: UsageMeter[];
}

export interface BillingSummary {
  current_plan: Plan;
  subscription: Subscription;
  available_plans: Plan[];
  usage: UsageSummary;
}

export interface ChangePlanRequest {
  new_plan_id: string;
  billing_cycle: BillingCycle;
  idempotency_key: string;
}

export interface ChangePlanResponse {
  message: string;
  subscription: Subscription;
  new_plan: Plan;
  is_upgrade: boolean;
  effective_immediately: boolean;
}