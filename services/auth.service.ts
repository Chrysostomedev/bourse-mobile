import { post } from "../core/axios.mobile";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/auth.types";

export const authService = {
  login: (p: LoginPayload) => post<AuthResponse>("/login", p),
  register: (p: RegisterPayload) => post<AuthResponse>("/register", p),
  logout: () => post<void>("/logout"),
  requestPasswordReset: (p: { email: string }) => post<{ message: string }>("/password/request-reset", p),
  resetPassword: (p: { email: string; otp: string; password_confirmation: string }) => 
    post<{ message: string }>("/password/reset", p),
};