import { useCallback, useEffect, useState } from "react";
import { postService, type Post } from "@/services/post.service";
import type { ApiError } from "@/core/error";

type UsePostsReturn = {
  data: Post[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function usePosts(): UsePostsReturn {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefetch = false) => {
    if (isRefetch) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);

    try {
      const res = await postService.getAll();
      setData(res.data);
    } catch (e) {
      const apiError = e as ApiError;
      setError(apiError?.errorMessage ?? "Impossible de charger les publications");
    } finally {
      if (isRefetch) setIsRefreshing(false);
      else setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    isRefreshing,
    error,
    refetch: () => fetchData(true),
  };
}