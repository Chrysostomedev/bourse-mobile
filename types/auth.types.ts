export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
  email_verified_at: string | null;
  created_at: string | null;
};

export type LoginPayload = { email: string; password: string; };
export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string | null;
};

export type AuthResponse = { user: User; token: string; };