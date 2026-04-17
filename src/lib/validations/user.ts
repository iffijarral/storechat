// schemas/user.ts
import * as z from "zod";

export const updateNameSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .trim(),
});

export type UpdateNameValues = z.infer<typeof updateNameSchema>;