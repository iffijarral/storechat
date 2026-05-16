// components/auth/ForgotPasswordForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { useForgotPassword } from "@/hooks/user/useForgotPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ForgotPasswordRequest } from "@/types/auth";
import Link from "next/dist/client/link";

export function ForgotPasswordForm() {
    const { mutate, isPending } = useForgotPassword();
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordRequest>({
        resolver: zodResolver(forgotPasswordSchema)
    });

    return (
        <form
            onSubmit={handleSubmit((data) => mutate(data as ForgotPasswordRequest))}
            className="space-y-4"
        >
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                </label>

                <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="name@company.com"
                    className={errors.email ? "border-red-500" : ""}
                />

                {errors.email?.message && (
                    <p role="alert" className="text-xs text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="space-y-1.5">
                <Link href="/login" className="text-xs text-primary">
                    Back to login
                </Link>
            </div>
        </form>
    );
}