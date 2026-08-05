import { post } from "../core/axios.mobile";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth.types";

/**
 * Service d'authentification
 * Routes : POST /api/v1/auth/login, /api/v1/auth/register, etc.
 */
export const authService = {
  login: (p: LoginPayload) => {
    console.log("🔐 Calling POST /auth/login", { email: p.email });
    return post<AuthResponse>("/login", p);
  },
  
  register: (p: RegisterPayload) => {
    console.log("📝 Calling POST /auth/register", { email: p.email });
    return post<AuthResponse>("/register", p);
  },
  
  logout: () => post<void>("/auth/logout"),
  
  requestPasswordReset: (p: { email: string }) => 
    post<{ message: string }>("/password/request-reset", p),
  
  resetPassword: (p: { email: string; otp: string; password_confirmation: string }) => 
    post<{ message: string }>("/password/reset", p),
};