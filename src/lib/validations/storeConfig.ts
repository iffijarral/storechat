import * as z from "zod";

export const storeConfigSchema = z.object({
  branding: z.object({
    primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid Hex Color"),
    bot_name: z.string().min(2, "Name too short"),
  }),
  ui: z.object({
    position: z.enum(["bottom-right", "bottom-left"]),
    theme: z.enum(["light", "dark", "auto"]),
    button_style: z.enum(["rounded", "square", "pill"]),
  }),
});

export type StoreConfigValues = z.infer<typeof storeConfigSchema>;