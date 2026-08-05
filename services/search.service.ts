import { get } from "@/core/axios.mobile";
import type { Scholarship } from "@/types/scholarship.types";
import type { Post } from "./post.service";

export type SearchResults = {
  scholarships?: Scholarship[];
  posts?: Post[];
  // autres entités (partners, services, etc.) si le backend l'inclut
};

export const searchService = {
  async globalSearch(q: string): Promise<SearchResults> {
    const res = await get<SearchResults | { data: SearchResults }>(`/search?q=${encodeURIComponent(q)}`);
    return ('data' in res) ? res.data : res;
  }
};
