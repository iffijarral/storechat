import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useRegisterStore } from "@/hooks/useRegisterStore";

import { AccountStepValues } from "@/lib/validations/auth";
import { StoreValues } from "@/lib/validations/store";

export type RegistrationStep = 1 | 2;

export function useRegistration() {
  const router = useRouter();

  // ✅ ONLY auth source
  const register = useAuthStore((s) => s.register);
  const { user, setUser } = useAuthStore();
  // ✅ store creation (TanStack)
  const { mutateAsync: registerStore } = useRegisterStore();

  const [step, setStep] = useState<RegistrationStep>(1);
  const [accountData, setAccountData] = useState<Partial<AccountStepValues>>({});
  const [storeData, setStoreData] = useState<Partial<StoreValues>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 STEP 1 — AUTH (Zustand ONLY)
  const submitAccount = async (data: AccountStepValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await register(data);
      setAccountData(data);
      setStep(2);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Account registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 STEP 2 — STORE (TanStack)
  const submitStore = async (data: StoreValues) => {
    setIsLoading(true);
    setError(null);

    try {
      setStoreData(data);

      const newStore = await registerStore(data); // ✅ correct
      // 🔥 Update Zustand so the UI knows about the new store immediately
      if (user) {
        setUser({
          ...user,
          stores: [...(user.stores || []), {
            id: newStore.id,
            store_id: newStore.store_id,
            store_name: newStore.store_name
          }]
        });
      }
      router.push("/"); // ✅ user already logged in
    } catch (err: unknown) {
      setError((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Store connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    isLoading,
    error,
    accountData,
    storeData,
    submitAccount,
    submitStore,
    goBack: () => setStep(1),
  };
}