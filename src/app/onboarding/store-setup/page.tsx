"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useRegisterStore } from "@/hooks/useRegisterStore";
import { StoreStep } from "@/components/auth/StoreStep";
import { StoreValues } from "@/lib/validations/store";

export default function StoreSetupPage() {
  const router     = useRouter();
  const logout     = useAuthStore((s) => s.logout);
  const setStores  = useAuthStore((s) => s.setStores);
  const setActive  = useAuthStore((s) => s.setActiveStore);

  const { mutateAsync: registerStore, isPending, error } = useRegisterStore();

  const handleSubmit = async (data: StoreValues) => {
    try {
      const newStore = await registerStore(data);

      setStores([{
        id:         newStore.id,
        store_id:   newStore.store_id,
        store_name: newStore.store_name,
        store_url:  newStore.store_url,
      }]);

      setActive(newStore.store_id);
      router.push("/dashboard");

    } catch {
      // error handled by useRegisterStore
    }
  };

  const errorMessage = error
    ? (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Failed to connect store."
    : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 max-w-md w-full">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Set up your store
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Connect your WooCommerce store to get started.
            </p>
          </div>
          <button
            onClick={() => { logout(); router.push("/login"); }}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Sign out
          </button>
        </div>

        <StoreStep
          onSubmit={handleSubmit}
          isLoading={isPending}
          error={errorMessage}
        />
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        You can update these settings later from your dashboard.
      </p>
    </div>
  );
}