import * as z from "zod";

/**
 * 1. The Full Schema (The "Contract" for Registration)
 */
export const storeSchema = z.object({
  storeName: z.string().min(2, "Store name is required"),
  storeUrl: z.string().url("Must be a valid URL"),
  wooKey: z.string().startsWith("ck_", "Must start with ck_"),
  wooSecret: z.string().startsWith("cs_", "Must start with cs_"),
});

/**
 * A schema specifically for the "General Settings" tab 
 * that excludes sensitive API keys entirely.
 */
export const generalSettingsSchema = storeSchema.pick({
  storeName: true,
  storeUrl: true,
});



/**
 * 2. The Partial Schema (The "Contract" for Settings/Updates)
 * .partial() makes all keys in storeSchema optional.
 */
export const storeUpdateSchema = storeSchema.partial();

/**
 * 3. Type Inference
 * Professionals export these so the Services and Hooks are strictly typed.
 */
export type StoreValues = z.infer<typeof storeSchema>;
export type StoreUpdateValues = z.infer<typeof storeUpdateSchema>;
export type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;