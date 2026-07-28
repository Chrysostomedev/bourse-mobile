import { get } from "@/core/axios.mobile"; // adapte le chemin si besoin
import type { Service } from "@/types/service.types";

export type ServiceFilters = {
  kind?: string;
};

export const serviceService = {
  async getAll(filters: ServiceFilters = {}): Promise<Service[]> {
    const params = new URLSearchParams();

    if (filters.kind && filters.kind !== "tous") {
      params.append("kind", filters.kind);
    }

    const query = params.toString();
    const url = query ? `/services?${query}` : "/services";

    const res = await get<Service[] | { data: Service[] }>(url);
    return Array.isArray(res) ? res : res.data ?? [];
  },
  async getById(id: number | string): Promise<Service | null> {
  const all = await this.getAll();
  return all.find((s) => String(s.id) === String(id)) ?? null;
},
};
