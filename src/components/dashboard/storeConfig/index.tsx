"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeConfigSchema, StoreConfigValues } from "@/lib/validations/storeConfig";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

import { BrandingForm } from "./brandingForm";
import { UIForm } from "./uiForm";
import { LivePreview } from "./livePreview";
import { useGetStoreConfig } from "@/hooks/store-config/useGetStoreConfig";
import { useUpdateStoreConfig } from "@/hooks/store-config/useUpdateStoreConfig";

export function StoreConfigView() {
  const { data, isLoading } = useGetStoreConfig();
  const { updateConfig, isUpdating } = useUpdateStoreConfig();

  const form = useForm<StoreConfigValues>({
    resolver: zodResolver(storeConfigSchema),
    defaultValues: {
      branding: { primary_color: "#007bff", bot_name: "Assistant" },
      ui: { position: "bottom-right", theme: "light", button_style: "rounded" },
    },
  });

  // ✅ safe reset
  useEffect(() => {
    if (data) {
      form.reset({
        branding: data.branding,
        ui: data.ui,
      });
    }
  }, [data, form]);

  const [branding, ui] = useWatch({
    control: form.control,
    name: ["branding", "ui"],
  });

  const watchedValues = {
    branding: branding ?? form.getValues("branding"),
    ui: ui ?? form.getValues("ui"),
  };

  // ✅ safe submit
  const onSubmit = async (values: StoreConfigValues) => {
    try {
      await updateConfig(values);
    } catch { }
  };

  // ✅ loading guard
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="branding">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="ui">UI Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="branding">
                <BrandingForm form={form} />
              </TabsContent>

              <TabsContent value="ui">
                <UIForm form={form} />
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full" disabled={isUpdating}>
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-5">
        <LivePreview values={watchedValues} />
      </div>
    </div>
  );
}