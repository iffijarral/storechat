// hooks/useChangePassword.ts

import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/userService";
import { toast } from "sonner";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,

    onSuccess: () => {
      toast.success("Password updated successfully");      
    },

    onError: () => {      
      toast.error("Failed to update password");
    },
  });
}