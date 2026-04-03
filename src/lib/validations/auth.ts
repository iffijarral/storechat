import * as z from "zod";
import { storeSchema } from "./store";

/**
 * Base User validation used across Login, Register, and Profile
 */
export const userAuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(12, "Password must be at least 12 characters")
    .max(128, "Password too long"),
});

/**
 * Combined Registration Schema (Unified Signup)
 */
export const registerSchema = userAuthSchema.extend({
  fullName: z.string().min(2, "Full name is required"),
}).merge(storeSchema);

/**
 * Login Schema (Reuses the base user validation)
 */
export const loginSchema = userAuthSchema;

// Automated Type Inference
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;