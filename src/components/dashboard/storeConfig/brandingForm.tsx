import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StoreConfigValues } from "@/lib/validations/storeConfig";
import { UseFormReturn } from "react-hook-form";
 
export function BrandingForm({ form }: { form: UseFormReturn<StoreConfigValues> }) {
  return (
    <div className="space-y-5 pt-4">
 
      {/* Bot Name */}
      <FormField
        control={form.control}
        name="branding.bot_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bot Name</FormLabel>
            <FormDescription>Displayed in the chat header your customers see.</FormDescription>
            <FormControl>
              <Input placeholder="e.g. Store Assistant" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
 
      {/* Primary Color */}
      <FormField
        control={form.control}
        name="branding.primary_color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Color</FormLabel>
            <FormDescription>Used for the chat header and launcher button background.</FormDescription>
            <FormControl>
              <div className="flex items-center gap-3">
                {/* Native color picker */}
                <div className="relative w-10 h-10 shrink-0">
                  <div
                    className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
                    style={{ backgroundColor: field.value }}
                  />
                  <input
                    type="color"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Pick a color"
                  />
                </div>
                {/* Hex text input */}
                <Input
                  {...field}
                  placeholder="#007bff"
                  className="font-mono text-sm"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}