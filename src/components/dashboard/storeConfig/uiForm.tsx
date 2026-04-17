import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StoreConfigValues } from "@/lib/validations/storeConfig";
import { Card, CardContent } from "@/components/ui/card";

export function UIForm({ form }: { form: UseFormReturn<StoreConfigValues> }) {
  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Widget Position */}
          <FormField
            control={form.control}
            name="ui.position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Widget Position</FormLabel>
                <FormDescription>Which side of the screen the chat icon appears.</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Widget Theme */}
          <FormField
            control={form.control}
            name="ui.theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Widget Theme</FormLabel>
                <FormDescription>Match the chat window to your sites aesthetic.</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="auto">System Default (Auto)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button Style */}
          <FormField
            control={form.control}
            name="ui.button_style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Launcher Style</FormLabel>
                <FormDescription>The shape of the chat toggle button.</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="rounded">Rounded Square</SelectItem>
                    <SelectItem value="square">Sharp Square</SelectItem>
                    <SelectItem value="pill">Circular / Pill</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}