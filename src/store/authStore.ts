"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "@/services/api";

import {
  UserResponse,
  TokenResponse,
  LoginRequest,
} from "@/types/auth";
import { AccountStepValues } from "@/lib/validations/auth";

type Store = {
  id: string;        // DB UUID
  store_id: string;  // public identifier (used in API)
  store_name?: string;
  store_url?: string;
};

type AuthState = {
  user: UserResponse | null;
  token: string | null;
  refreshToken: string | null;

  stores: Store[];
  activeStoreId: string | null;

  isLoading: boolean;
  error: string | null;

  hasHydrated: boolean;
  

  // actions
  setUser: (user: UserResponse | null) => void;
  setActiveStore: (storeId: string) => void;
  setStores: (stores: Store[]) => void;
  setHasHydrated: (value: boolean) => void;
  refreshAccessToken: () => Promise<boolean>;
  
  register: (data: AccountStepValues) => Promise<void>;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,

      stores: [],
      activeStoreId: null,

      isLoading: false,
      error: null,

      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      // ✅ simple setter
      setUser: (user) => set({ user }),

      // ✅ NO side effects
      setActiveStore: (storeId) => {
        set({ activeStoreId: storeId });
      },
      setStores: (stores) => set({ stores }),

      // ✅ clean reset
      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          stores: [],
          activeStoreId: null,
          error: null,
        });
      },

      // 🔥 LOGIN
      login: async (data) => {
        set({ isLoading: true, error: null });

        try {
          const res = await api.post<TokenResponse>("/auth/login", data);

          const { access_token, refresh_token, user } = res.data;

          const stores = user?.stores || [];

          const activeStoreId =
            stores.length > 0 ? stores[0].store_id : null;
          console.log("Active Store ID:", activeStoreId); // Debug log
          set({
            token: access_token,
            refreshToken: refresh_token,
            user,
            stores,
            activeStoreId,
          });
        } catch (err: unknown) {
          set({
            error: (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Store connection failed",
          });
          throw err; // 🔥 important for UI / hooks
        } finally {
          set({ isLoading: false });
        }
      },
      refreshAccessToken: async () => {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) return false;

        try {
          const res = await api.post("/auth/refresh", {
            refresh_token: refreshToken,
          });
          set({ token: res.data.access_token });
          return true;
        } catch {
          // Refresh failed — log out
          useAuthStore.getState().logout();
          return false;
        }
      },

      // 🔥 REGISTER
      register: async (data) => {
        set({ isLoading: true, error: null });

        try {
          const res = await api.post<TokenResponse>("/auth/register", data);

          const { access_token, user } = res.data;

          const stores = user?.stores || [];

          const activeStoreId =
            stores.length > 0 ? stores[0].store_id : null;

          set({
            token: access_token,
            user,
            stores,
            activeStoreId,
          });
        } catch (err: unknown) {
          set({
            error: (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Store connection failed",
          });
          throw err; // 🔥 important
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(() => localStorage),

      // ✅ persist only what matters
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        stores: state.stores,
        activeStoreId: state.activeStoreId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);