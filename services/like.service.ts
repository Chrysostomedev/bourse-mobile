import { post } from "@/core/axios.mobile";

export const likeService = {
  async toggleLike(payload: { post_id?: number | string; scholarship_id?: number | string }): Promise<{ liked: boolean; likes_count: number }> {
    return post<{ liked: boolean; likes_count: number }>("/likes", payload);
  }
};
