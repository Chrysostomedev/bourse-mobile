import { get } from "@/core/axios.mobile";

export type Partner = {
  id: number | string;
  name: string;
  logo: string | null;
  website: string | null;
  email: string | null;
  description: string | null;
  status: string;
  hasNews?: boolean;
};

export const partnerService = {
  async getAll(): Promise<Partner[]> {
    const res = await get<Partner[] | { data: Partner[] }>("/partners");
    return Array.isArray(res) ? res : res.data ?? [];
  },
};
