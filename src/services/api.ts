import axios, { AxiosHeaders } from "axios";
import { useAuthStore } from "@/store/authStore";

// Using localhost:8000 for local development
// This will be replaced by your Docker service name in production
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach the token to every request if it exists in storage
api.interceptors.request.use((config) => {
  const { token, activeStoreId } = useAuthStore.getState();

  // ✅ Ensure headers is AxiosHeaders
  const headers = AxiosHeaders.from(config.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (activeStoreId) {
    headers.set("X-Store-Id", activeStoreId);
  }

  config.headers = headers;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 &&
      window.location.pathname !== "/login") {
      // 🔥 clear auth state
      useAuthStore.getState().logout();

      // 🔥 redirect to login
      window.location.href = `/login?reason=session-expired&redirect=${window.location.pathname}`;
    }

    return Promise.reject(error);
  }
);
