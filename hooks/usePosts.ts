import { useEffect, useState } from "react";
import { postService, type Post } from "@/services/post.service";

export function usePosts(page = 1) {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await postService.getAll(page);
        setData(res.data);
      } catch (err: any) {
        setError(err.errorMessage ?? "Erreur lors du chargement des posts");
        console.error("🔴 usePosts error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return { data, isLoading, error };
}

export function usePostBySlug(slug: string) {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const post = await postService.getBySlug(slug);
        setData(post);
      } catch (err: any) {
        setError(err.errorMessage ?? "Erreur lors du chargement du post");
        console.error("🔴 usePostBySlug error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { data, isLoading, error };
}
