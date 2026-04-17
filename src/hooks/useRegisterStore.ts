import { useMutation } from "@tanstack/react-query";
import { storeService } from "@/services/storeService";
import { StoreValues } from "@/lib/validations/store";

export function useRegisterStore() {
  return useMutation({
    mutationFn: async (data: StoreValues) => {
      return await storeService.registerStore(data); // ✅ reuse service
    },
  });
}