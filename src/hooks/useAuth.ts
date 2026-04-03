import { useState, useEffect, useCallback } from "react";
import { api, setAuthToken } from "@/services/api";
import { useRouter } from "next/navigation";
import {
    UnifiedSignupRequest,
    TokenResponse,
    UserResponse,
    LoginRequest
} from "@/types/auth";

export function useAuth() {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const logout = useCallback(() => {
        setAuthToken("");
        setUser(null);
        router.push("/login");
    }, [router]);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            // Endpoint to get current user info
            const response = await api.get<UserResponse>("/auth/me");
            setUser(response.data);
        } catch (err: unknown) {
            setError((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || "Failed to fetch user information");
            logout();
        } finally {
            setIsLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const register = async (data: UnifiedSignupRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post<TokenResponse>("/auth/register", data);

            if (response.data.access_token) {
                setAuthToken(response.data.access_token);
                // Map the user from your TokenResponse to the state immediately
                setUser(response.data.user);
                router.push("/");
            }
        } catch (err: unknown) {
            setError((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Add this inside your useAuth hook in src/hooks/use-auth.tsx

const login = async (data: LoginRequest) => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await api.post<TokenResponse>("/auth/login", data);
    
    if (response.data.access_token) {
      setAuthToken(response.data.access_token);
      setUser(response.data.user);
      router.push("/"); // Go to Dashboard
    }
  } catch (err: unknown) {
    setError((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || "Invalid email or password");
  } finally {
    setIsLoading(false);
  }
};


return { user, register, login, logout, isLoading, error };

    return {
        user,      // Now correctly typed as UserResponse | null
        register,
        login,
        isLoading,
        error,
        logout
    };
}