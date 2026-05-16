// hooks/auth/useForgotPassword.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPassword, resetPassword } from "@/services/userService";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => toast.success("Reset link sent! Check your email."),
    onError: () => toast.error("Failed to send reset link. Try again."),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => toast.success("Password updated successfully!"),
    onError: () => toast.error("Token expired or invalid."),
  });
}