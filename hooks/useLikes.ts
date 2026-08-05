import { useEffect, useState } from "react";
import { likeService } from "@/services/post.service";

export function useLikes(postId: number, initialIsLiked: boolean = false, initialCount: number = 0) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleLike = async (postId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await likeService.toggle(postId);
      setIsLiked(result.is_liked);
      setLikesCount(result.likes_count);
      return result;
    } catch (err: any) {
      setError(err.errorMessage ?? "Erreur lors du toggle du like");
      console.error("🔴 useLikes error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    likesCount,
    isLoading,
    error,
    toggleLike,
  };
}
