import { get, post, put, del } from "@/core/axios.mobile";

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
    email?: string;
    role?: string;
  } | null;
  status: string;
  views_count: number;
  likes_count: number;
  comments_count: number;
  is_liked?: boolean;
  published_at: string | null;
  created_at: string;
  updated_at?: string;
};

export type Comment = {
  id: number;
  content: string;
  post_id: number;
  user_id: number;
  user: {
    id: number;
    name: string;
    avatar_url?: string | null;
    email?: string;
  };
  created_at: string;
  updated_at?: string;
  is_author?: boolean;
};

export const postService = {
  // ── Posts ──
  async getAll(page = 1): Promise<{ data: Post[]; meta?: any }> {
    const res = await get<any>(`/posts?page=${page}`);
    return {
      data: res.data ?? res,
      meta: res.meta,
    };
  },

  async getBySlug(slug: string): Promise<Post> {
    return get<Post>(`/posts/${slug}`);
  },

  async create(payload: FormData): Promise<Post> {
    return post<Post>(`/posts`, payload);
  },

  async update(id: number, payload: FormData): Promise<Post> {
    return put<Post>(`/posts/${id}`, payload);
  },

  async delete(id: number): Promise<void> {
    return del<void>(`/posts/${id}`);
  },
};

export const commentService = {
  // ── Comments ──
  async getByPostId(postId: number, page = 1): Promise<{ data: Comment[]; meta?: any }> {
    const res = await get<any>(`/posts/${postId}/comments?page=${page}`);
    return {
      data: res.data ?? res,
      meta: res.meta,
    };
  },

  async create(postId: number, content: string): Promise<Comment> {
    return post<Comment>(`/posts/${postId}/comments`, { content });
  },

  async update(commentId: number, content: string): Promise<Comment> {
    return put<Comment>(`/comments/${commentId}`, { content });
  },

  async delete(commentId: number): Promise<void> {
    return del<void>(`/comments/${commentId}`);
  },
};

export const likeService = {
  // ── Likes ──
  async toggle(postId: number): Promise<{ is_liked: boolean; likes_count: number }> {
    return post<{ is_liked: boolean; likes_count: number }>(`/posts/${postId}/like`, {});
  },

  async getLikesByPost(postId: number): Promise<{ data: any[]; count: number }> {
    return get<{ data: any[]; count: number }>(`/posts/${postId}/likes`);
  },
};