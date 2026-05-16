import * as z from "zod";

export const storeConfigSchema = z.object({
  branding: z.object({
    primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid Hex Color"),
    bot_name: z.string().min(2, "Name too short"),
    // bot_avatar: z
    //   .string()
    //   .url("Must be a valid URL")
    //   .optional()
    //   .or(z.literal("")),  // allow empty string to clear the avatar  
  }),
  ui: z.object({
    position: z.enum(["bottom-right", "bottom-left"]),
    theme: z.enum(["light", "dark", "auto"]),
    button_style: z.enum(["rounded", "square", "pill"]),
  }),
  behavior: z.object({
    welcome_message: z
      .string()
      .min(1, "Welcome message is required")
      .max(300, "Keep it under 300 characters"),
 
    placeholder_text: z
      .string()
      .min(1, "Placeholder is required")
      .max(100, "Keep it under 100 characters"),
 
    suggested_questions: z
      .array(
        z.string().min(1, "Question cannot be empty").max(150, "Too long")
      )
      .max(6, "Maximum 6 questions"),
  }),
});

export type StoreConfigValues = z.infer<typeof storeConfigSchema>;