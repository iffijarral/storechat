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

// ── Response interceptor — silent token refresh on 401 ───────────────────────
//
// Flow:
//   Request fails with 401
//     → try to refresh access token silently
//     → if refresh succeeds: retry original request with new token
//     → if refresh fails: logout + redirect to login
//
// Queue handles concurrent requests that all fail at the same time —
// they wait for the single refresh to complete then retry together.
 
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject:  (err: unknown) => void;
}> = [];
 
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else       p.resolve(token!);
  });
  failedQueue = [];
};
 
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
 
    const is401          = error.response?.status === 401;
    const notRetried     = !originalRequest._retry;
    const notAuthRoute   = !originalRequest.url?.includes("/auth/");
 
    if (is401 && notRetried && notAuthRoute) {
 
      // Queue concurrent requests while refresh is in progress
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => Promise.reject(err));
      }
 
      originalRequest._retry = true;
      isRefreshing            = true;
 
      try {
        const success = await useAuthStore.getState().refreshAccessToken();
 
        if (success) {
          const newToken = useAuthStore.getState().token;
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          // refreshAccessToken already called logout()
          processQueue(error, null);
          if (typeof window !== "undefined") {
            window.location.href = `/login?reason=session-expired&redirect=${window.location.pathname}`;
          }
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
 
    return Promise.reject(error);
  }
);