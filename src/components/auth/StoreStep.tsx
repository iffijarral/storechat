"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store, Globe, Key, Eye, EyeOff, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { storeSchema, type StoreValues } from "@/lib/validations/store";

interface StoreStepProps {
  defaultValues?: Partial<StoreValues>;
  onSubmit: (data: StoreValues) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function StoreStep({
  defaultValues,
  onSubmit,
  onBack,
  isLoading,
  error,
}: StoreStepProps) {
  const [showSecret, setShowSecret] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreValues>({
    resolver: zodResolver(storeSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Store Name */}
      <div className="space-y-1.5">
        <Label htmlFor="store_name" className="text-sm font-medium text-foreground">
          Store Name
        </Label>
        <div className="relative">
          <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="store_name"
            placeholder="My Awesome Store"
            className="pl-10"
            aria-invalid={!!errors.storeName}
            {...register("storeName")}
          />
        </div>
        {errors.storeName && (
          <p className="text-xs text-destructive">{errors.storeName.message}</p>
        )}
      </div>

      {/* Store URL */}
      <div className="space-y-1.5">
        <Label htmlFor="store_url" className="text-sm font-medium text-foreground">
          Store URL
        </Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="store_url"
            type="url"
            placeholder="https://mystore.com"
            className="pl-10"
            aria-invalid={!!errors.storeUrl}
            {...register("storeUrl")}
          />
        </div>
        {errors.storeUrl && (
          <p className="text-xs text-destructive">{errors.storeUrl.message}</p>
        )}
      </div>

      {/* API Keys helper */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40 p-3">
        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
          Find your API keys in your WordPress admin under{" "}
          <strong>WooCommerce → Settings → Advanced → REST API</strong>.
        </p>
        <a
          href="https://woocommerce.com/document/woocommerce-rest-api/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium mt-1 hover:underline"
        >
          View WooCommerce API docs <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Consumer Key */}
      <div className="space-y-1.5">
        <Label htmlFor="consumer_key" className="text-sm font-medium text-foreground">
          Consumer Key
        </Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="consumer_key"
            placeholder="ck_xxxxxxxxxxxxxxxxxxxx"
            className="pl-10 font-mono text-sm"
            aria-invalid={!!errors.wooKey}
            {...register("wooKey")}
          />
        </div>
        {errors.wooKey && (
          <p className="text-xs text-destructive">{errors.wooKey.message}</p>
        )}
      </div>

      {/* Consumer Secret */}
      <div className="space-y-1.5">
        <Label htmlFor="consumer_secret" className="text-sm font-medium text-foreground">
          Consumer Secret
        </Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="consumer_secret"
            type={showSecret ? "text" : "password"}
            placeholder="cs_xxxxxxxxxxxxxxxxxxxx"
            className="pl-10 pr-10 font-mono text-sm"
            aria-invalid={!!errors.wooSecret}
            {...register("wooSecret")}
          />
          <button
            type="button"
            onClick={() => setShowSecret((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showSecret ? "Hide secret" : "Show secret"}
          >
            {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.wooSecret && (
          <p className="text-xs text-destructive">{errors.wooSecret.message}</p>
        )}
      </div>

      {/* API Error */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
          disabled={isLoading}
        >
          ← Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Connecting store…" : "Complete Setup"}
        </Button>
      </div>
    </form>
  );
}
