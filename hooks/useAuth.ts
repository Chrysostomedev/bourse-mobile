import { useCallback, useState } from "react";
import { authService } from "../services/auth.service";
import { tokenStorage, userStorage } from "../core/storage";
import { put as apiPut } from "../core/axios.mobile";
import type { AuthResponse, LoginPayload, RegisterPayload, User } from "../types/auth.types";
import { AxiosError } from "axios";

export type UseAuthReturn = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (p: LoginPayload) => Promise<AuthResponse>;
  register: (p: RegisterPayload) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Pick<User, "name" | "email" | "bio">>) => Promise<void>;
  clearError: () => void;
};

function getErrorMessage(e: unknown): string {
  if (e instanceof AxiosError) {
    const data = e.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;
    if (data?.errors) {
      const firstKey = Object.keys(data.errors)[0];
      return data.errors[firstKey]?.[0]?? data.message?? "Erreur de validation";
    }
    return data?.message?? e.message;
  }
  if (e instanceof Error) return e.message;
  return "Une erreur est survenue";
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persistSession = useCallback(async (data: AuthResponse) => {
    await tokenStorage.setToken(data.token);
    await userStorage.setUser(JSON.stringify(data.user));
    setUser(data.user);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true); setError(null);
    try {
      const data = await authService.login(payload);
      await persistSession(data);
      return data;
    } catch (e) {
      const msg = getErrorMessage(e);
      setError(msg); throw new Error(msg);
    } finally { setIsLoading(false); }
  }, [persistSession]);

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsLoading(true); setError(null);
    try {
      const data = await authService.register(payload);
      await persistSession(data);
      return data;
    } catch (e) {
      const msg = getErrorMessage(e);
      setError(msg); throw new Error(msg);
    } finally { setIsLoading(false); }
  }, [persistSession]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try { await authService.logout(); } catch { }
    finally {
      await tokenStorage.clearToken();
      await userStorage.clearUser();
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<Pick<User, "name" | "email" | "bio">>) => {
    setIsLoading(true); setError(null);
    try {
      const updated = await apiPut<{ user: User }>("/auth/profile", data);
      setUser(updated.user);
      await userStorage.setUser(JSON.stringify(updated.user));
    } catch (e) {
      const msg = getErrorMessage(e);
      setError(msg); throw new Error(msg);
    } finally { setIsLoading(false); }
  }, []);

  return { user, isAuthenticated:!!user, isLoading, error, login, register, logout, updateProfile, clearError: () => setError(null) };
}