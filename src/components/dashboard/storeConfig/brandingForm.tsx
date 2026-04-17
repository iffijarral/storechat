import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StoreConfigValues } from "@/lib/validations/storeConfig";

export function BrandingForm({ form }: { form: UseFormReturn<StoreConfigValues> }) {
  return (
    <div className="space-y-4 pt-4">
      <FormField
        control={form.control}
        name="branding.bot_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bot Name</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="branding.primary_color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Color</FormLabel>
            <div className="flex gap-2">
              <FormControl><Input {...field} /></FormControl>
              <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}