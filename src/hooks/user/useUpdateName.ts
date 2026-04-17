import { useMutation } from "@tanstack/react-query";
import { updateName } from "@/services/userService";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export function useUpdateName() {  
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: updateName,

    onSuccess: (data) => {
      // ✅ update Zustand directly because user was comming from zustand
      if (user) {
        setUser({
          ...user,
          name: data.name, // or data.name if backend returns it
        });
      }
      toast.success("Name updated");      
    },

    onError: () => {
      toast.error("Failed to update name");
    },
  });
}