import { get } from "@/core/axios.mobile"; // adapte le chemin

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  video_url: string | null;
  author: {
    id: number;
    name: string;
    avatar_url?: string | null;
  } | null;
  status: string;
  views_count: number;
  likes_count: number;
  comments_count: number;
  published_at: string | null;
  created_at: string;
};

export const postService = {
  async getAll(page = 1): Promise<{ data: Post[]; meta?: any }> {
    const res = await get<any>(`/posts?page=${page}`);
    // Laravel pagination → { data: [...], meta: {...}, links: {...} }
    return {
      data: res.data ?? res,
      meta: res.meta,
    };
  },

  async getBySlug(slug: string): Promise<Post> {
    return get<Post>(`/posts/${slug}`);
  },
};