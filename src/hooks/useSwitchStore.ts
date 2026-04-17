import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function useSwitchStore() {
  const queryClient = useQueryClient();
  const setActiveStore = useAuthStore((s) => s.setActiveStore);
  const router = useRouter();

  return (storeId: string) => {
    setActiveStore(storeId);

    // 🔥 clear or invalidate cache here
    queryClient.clear();
    router.push("/"); // Redirect to the main dashboard page or any default page for the store
  };
}