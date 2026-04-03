"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { useAuth } from "@/hooks/useAuth"; // Centralized Auth Logic

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  // Use our professional hook instead of raw axios calls in the component
  const { register: registerUser, isLoading, error: serverError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      storeName: "",
      storeUrl: "",
      wooKey: "",
      wooSecret: "",
    }
  });

  const onSubmit = async (values: RegisterFormValues) => {
    // The 'values' here strictly follow the RegisterFormValues type
    await registerUser({
      full_name: values.fullName,
      email: values.email,
      password: values.password,
      store_name: values.storeName,
      store_url: values.storeUrl,
      woo_consumer_key: values.wooKey,
      woo_consumer_secret: values.wooSecret,
    });
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] my-10 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Get Started</h1>
        <p className="text-sm text-muted-foreground">
          Create your account and connect your store.
        </p>
      </div>

      {serverError && (
        <div className="p-3 text-sm border border-destructive/50 bg-destructive/10 text-destructive rounded-md">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* SECTION: User Identity */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
            Owner Information
          </h2>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="Jane Doe" {...register("fullName")} />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="jane@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Account Password</Label>
            <Input id="password" type="password" placeholder="Min. 12 characters" {...register("password")} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
        </div>

        <Separator />

        {/* SECTION: Store Tenant */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
            Store Integration
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" placeholder="My Boutique" {...register("storeName")} />
              {errors.storeName && <p className="text-xs text-destructive">{errors.storeName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeUrl">Store URL</Label>
              <Input id="storeUrl" placeholder="https://store.com" {...register("storeUrl")} />
              {errors.storeUrl && <p className="text-xs text-destructive">{errors.storeUrl.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wooKey">WooCommerce Consumer Key</Label>
            <Input id="wooKey" placeholder="ck_xxxxxxxx..." {...register("wooKey")} />
            {errors.wooKey && <p className="text-xs text-destructive">{errors.wooKey.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="wooSecret">WooCommerce Consumer Secret</Label>
            <Input id="wooSecret" type="password" placeholder="cs_xxxxxxxx..." {...register("wooSecret")} />
            {errors.wooSecret && <p className="text-xs text-destructive">{errors.wooSecret.message}</p>}
          </div>
        </div>

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? "Provisioning Store..." : "Complete Setup"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have a store?{" "}
        <Link href="/login" className="font-medium underline hover:text-primary transition-colors">
          Log in
        </Link>
      </p>
    </div>
  );
}