import { z } from "zod";

// ── Step 1: Account schema ────────────────────────────────────────────────────
export const accountSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

// ── Step 2: Store schema ──────────────────────────────────────────────────────
export const storeSchema = z.object({
  store_name: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(100, "Store name must be under 100 characters"),
  store_url: z
    .string()
    .url("Please enter a valid URL (e.g. https://mystore.com)"),
  consumer_key: z
    .string()
    .min(10, "Consumer key appears too short")
    .startsWith("ck_", "Consumer key must start with ck_"),
  consumer_secret: z
    .string()
    .min(10, "Consumer secret appears too short")
    .startsWith("cs_", "Consumer secret must start with cs_"),
});

// ── Inferred TypeScript types ─────────────────────────────────────────────────
export type AccountFormData = z.infer<typeof accountSchema>;
export type StoreFormData = z.infer<typeof storeSchema>;

export type RegistrationStep = 1 | 2;

export interface RegistrationState {
  step: RegistrationStep;
  accountData: Partial<AccountFormData>;
  storeData: Partial<StoreFormData>;
  userId: string | null; // set after Step 1 API success
}

// ── API response types ────────────────────────────────────────────────────────
export interface RegisterUserResponse {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

export interface RegisterStoreResponse {
  id: string;
  store_name: string;
  store_url: string;
  owner_id: string;
  created_at: string;
}
