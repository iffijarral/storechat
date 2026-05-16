"use client";

// src/app/(dashboard)/store-config/index.tsx

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeConfigSchema, StoreConfigValues } from "@/lib/validations/storeConfig";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { BrandingForm } from "./brandingForm";
import { UIForm }       from "./uiForm";
import { BehaviorForm } from "./behaviorForm";
import { LivePreview }  from "./livePreview";
import { useGetStoreConfig }    from "@/hooks/store-config/useGetStoreConfig";
import { useUpdateStoreConfig } from "@/hooks/store-config/useUpdateStoreConfig";

// ── Skeleton ───────────────────────────────────────────────────────────────

function StoreConfigSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Skeleton className="h-10 w-full rounded-xl" />
        <div className="space-y-4 pt-4">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
      <div className="lg:col-span-5">
        <Skeleton className="h-125 w-full rounded-2xl" />
      </div>
    </div>
  );
}

// ── Main view ──────────────────────────────────────────────────────────────

export function StoreConfigView() {
  const { data, isLoading }       = useGetStoreConfig();
  const { updateConfig, isUpdating } = useUpdateStoreConfig();
  const [saved, setSaved]         = useState(false);

  const form = useForm<StoreConfigValues>({
    resolver: zodResolver(storeConfigSchema),
    defaultValues: {
      branding: {
        primary_color: "#007bff",
        bot_name:      "Assistant",
      },
      ui: {
        position:     "bottom-right",
        theme:        "light",
        button_style: "rounded",
      },
      behavior: {
        welcome_message:     "Hi! How can I help you today?",
        placeholder_text:    "Type your message...",
        suggested_questions: [],
      },
    },
  });

  // Sync API data into form once loaded
  useEffect(() => {
    if (data) {
      form.reset({
        branding: data.branding,
        ui:       data.ui,
        behavior: {
          welcome_message:     data.behavior?.welcome_message     ?? "Hi! How can I help you today?",
          placeholder_text:    data.behavior?.placeholder_text    ?? "Type your message...",
          suggested_questions: data.behavior?.suggested_questions ?? [],
        },
      });
    }
  }, [data, form]);

  // Live preview — watches all three sections
  const [branding, ui, behavior] = useWatch({
    control: form.control,
    name:    ["branding", "ui", "behavior"],
  });

  const watchedValues = {
    branding: branding ?? form.getValues("branding"),
    ui:       ui       ?? form.getValues("ui"),
    behavior: behavior ?? form.getValues("behavior"),
  };

  const onSubmit = async (values: StoreConfigValues) => {
    try {
      await updateConfig(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { }
  };

  if (isLoading) return <StoreConfigSkeleton />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="branding">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="ui">UI Settings</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
              </TabsList>

              <TabsContent value="branding">
                <BrandingForm form={form} />
              </TabsContent>

              <TabsContent value="ui">
                <UIForm form={form} />
              </TabsContent>

              <TabsContent value="behavior">
                <BehaviorForm form={form} />
              </TabsContent>
            </Tabs>

            {/* Save button */}
            <div className="flex items-center gap-3">
              <Button type="submit" className="flex-1" disabled={isUpdating}>
                {isUpdating ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</>
                ) : (
                  <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                )}
              </Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium animate-in fade-in slide-in-from-left-2">
                  <CheckCircle2 className="w-4 h-4" /> Saved
                </span>
              )}
            </div>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-5">
        <LivePreview values={watchedValues} />
      </div>
    </div>
  );
}