"use client";

// components/auth/changePassword.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch } from "react-hook-form";
import { Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordStrength } from "@/components/auth/passwordStrength";

import { passwordChangeSchema, PasswordChangeValues } from "@/lib/validations/auth";
import { useChangePassword } from "@/hooks/user/useChangePassword";
import { useAuthStore } from "@/store/authStore";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { mutateAsync, isPending, isError } = useChangePassword();
  const logout = useAuthStore((s) => s.logout);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: { revoke_other_sessions: true },
  });

  const newPassword = useWatch({ control, name: "new_password" });
  const confirmPassword = useWatch({ control, name: "confirm_password" });
  const passwordsMatch = !!confirmPassword && confirmPassword === newPassword;
  const passwordsMismatch = !!confirmPassword && confirmPassword !== newPassword;

  const onSubmit = async (data: PasswordChangeValues) => {
    try {
      await mutateAsync(data);
      setSuccess(true);
      reset();
      // Brief delay so user sees the success message before logout
      setTimeout(() => logout(), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Success state ──
  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Password updated successfully
        </p>
        <p className="text-xs text-slate-400">
          Signing you out in a moment…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md">

      {/* Current Password */}
      <div className="space-y-1.5">
        <Label htmlFor="current_password" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Current Password
        </Label>
        <div className="relative">
          <Input
            id="current_password"
            type={showPassword ? "text" : "password"}
            {...register("current_password")}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.current_password && (
          <p className="text-xs text-red-500">{errors.current_password.message}</p>
        )}
      </div>

      {/* New Password */}
      <div className="space-y-1.5">
        <Label htmlFor="new_password" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          New Password
        </Label>
        <div className="relative">
          <Input
            id="new_password"
            type={showPassword ? "text" : "password"}
            {...register("new_password")}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {newPassword && <PasswordStrength password={newPassword} />}
        {errors.new_password && (
          <p className="text-xs text-red-500">{errors.new_password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <Label htmlFor="confirm_password" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Confirm Password
        </Label>
        <Input
          id="confirm_password"
          type={showPassword ? "text" : "password"}
          {...register("confirm_password")}
        />
        {passwordsMatch && (
          <p className="text-xs text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Passwords match
          </p>
        )}
        {passwordsMismatch && (
          <p className="text-xs text-red-500">Passwords do not match</p>
        )}
        {errors.confirm_password && (
          <p className="text-xs text-red-500">{errors.confirm_password.message}</p>
        )}
      </div>

      {/* Revoke other sessions */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          {...register("revoke_other_sessions")}
          defaultChecked
          className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
        />
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Sign out of all other sessions
        </span>
      </label>

      {/* API error */}
      {isError && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/10 px-3 py-2 rounded-lg">
          Current password is incorrect or request failed. Please try again.
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending || passwordsMismatch || !newPassword}
        className="w-full"
      >
        {isPending
          ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating…</>
          : "Update Password"}
      </Button>

    </form>
  );
}