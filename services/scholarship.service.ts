import { get } from "@/core/axios.mobile"; // adapte selon ton chemin (celui avec withRetry)
import type { Scholarship } from "@/types/scholarship.types"; // on va le créer juste après

export type ScholarshipFilters = {
  q?: string;
  country_id?: number | string;
  scholarship_type_id?: number | string;
  study_level_id?: number | string;
  field_of_study_id?: number | string;
};

export const scholarshipService = {
  /**
   * Liste des bourses avec filtres optionnels
   * GET /scholarships?q=...&study_level_id=...
   */
  async getAll(filters: ScholarshipFilters = {}): Promise<Scholarship[]> {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    const query = params.toString();
    const url = query ? `/scholarships?${query}` : "/scholarships";

    // Selon ton api client, ça peut renvoyer directement le tableau
    // ou { data: [...] } si tu utilises la pagination Laravel
    const res = await get<Scholarship[] | { data: Scholarship[] }>(url);
    return Array.isArray(res) ? res : res.data;
  },

  /**
   * Bourses mises en avant
   * GET /scholarships/featured
   */
  async getFeatured(): Promise<Scholarship[]> {
    const res = await get<Scholarship[] | { data: Scholarship[] }>("/scholarships/featured");
    return Array.isArray(res) ? res : res.data;
  },

  /**
   * Détail d’une bourse par slug
   * GET /scholarships/{slug}
   */
  async getBySlug(slug: string): Promise<Scholarship> {
    return get<Scholarship>(`/scholarships/${slug}`);
  },
};