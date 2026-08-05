import { get, put, post } from "@/core/axios.mobile";
import type { Scholarship } from "@/types/scholarship.types";

export type UserProfile = {
  id: number | string;
  name: string;
  email: string;
  avatar_url?: string | null;
  phone?: string | null;
  bio?: string | null;
  // autres champs...
};

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    return get<UserProfile>("/me/profile");
  },

  async updateProfile(payload: Partial<UserProfile>): Promise<UserProfile> {
    return put<UserProfile>("/me/profile", payload);
  },

  async getSavedScholarships(): Promise<Scholarship[]> {
    const res = await get<Scholarship[] | { data: Scholarship[] }>("/me/saved-scholarships");
    return Array.isArray(res) ? res : res.data ?? [];
  },

  async toggleSavedScholarship(scholarshipId: number | string): Promise<{ saved: boolean }> {
    return post<{ saved: boolean }>(`/me/saved-scholarships/${scholarshipId}`);
  }
};
