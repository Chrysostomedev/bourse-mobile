import { get, post, del } from "@/core/axios.mobile";

export type Comment = {
  id: number | string;
  post_id?: number | string;
  scholarship_id?: number | string;
  user_id: number | string;
  content: string;
  created_at: string;
  author: {
    id: number | string;
    name: string;
    avatar_url?: string | null;
  };
};

export const commentService = {
  async getForPost(postId: number | string): Promise<Comment[]> {
    const res = await get<Comment[] | { data: Comment[] }>(`/comments?post_id=${postId}`);
    return Array.isArray(res) ? res : res.data ?? [];
  },

  async getForScholarship(scholarshipId: number | string): Promise<Comment[]> {
    const res = await get<Comment[] | { data: Comment[] }>(`/comments?scholarship_id=${scholarshipId}`);
    return Array.isArray(res) ? res : res.data ?? [];
  },

  async add(payload: { post_id?: number | string; scholarship_id?: number | string; content: string }): Promise<Comment> {
    return post<Comment>("/comments", payload);
  },

  async remove(commentId: number | string): Promise<void> {
    return del<void>(`/comments/${commentId}`);
  }
};
