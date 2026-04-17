import * as z from "zod";
import { storeSchema } from "./store";

const PASSWORD_MIN_LENGTH = 10;
const PASSWORD_MAX_LENGTH = 128;

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
  .max(PASSWORD_MAX_LENGTH, `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`)
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol");

/**
 * Base User validation used across Login, Register, and Profile
 */
export const userAuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});

export const accountStepSchema = userAuthSchema.extend({
  fullName: z.string().min(2, "Full name is required"),  
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
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

/**
 * Password Update Schema (For Profile Settings)
 */
export const passwordChangeSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: passwordSchema,
    confirm_password: z.string(),
    revoke_other_sessions: z.boolean().default(true),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "New password and confirmation do not match",
    path: ["confirm_password"],
  })
  .refine((data) => data.new_password !== data.current_password, {
    message: "New password must be different from the current password",
    path: ["new_password"],
  });


// Automated Type Inference
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type AccountStepValues = z.infer<typeof accountStepSchema>;
export type PasswordUpdateFormValues = z.infer<typeof passwordChangeSchema>;