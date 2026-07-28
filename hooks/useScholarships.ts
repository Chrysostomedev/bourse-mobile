import { useCallback, useEffect, useState } from "react";
import { scholarshipService, type ScholarshipFilters } from "@/services/scholarship.service";
import type { Scholarship } from "@/types/scholarship.types";
import type { ApiError } from "@/core/error";

type UseScholarshipsReturn = {
  data: Scholarship[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refetch: (filters?: ScholarshipFilters) => Promise<void>;
};

export function useScholarships(initialFilters: ScholarshipFilters = {}): UseScholarshipsReturn {
  const [data, setData] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ScholarshipFilters>(initialFilters);

  const fetchData = useCallback(async (isRefetch = false, newFilters?: ScholarshipFilters) => {
    if (isRefetch) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);

    const appliedFilters = newFilters ?? filters;

    try {
      const res = await scholarshipService.getAll(appliedFilters);
      setData(res);
      if (newFilters) setFilters(newFilters);
    } catch (e) {
      const apiError = e as ApiError;
      setError(apiError?.errorMessage ?? "Impossible de charger les bourses");
    } finally {
      if (isRefetch) setIsRefreshing(false);
      else setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    isRefreshing,
    error,
    refetch: (newFilters?: ScholarshipFilters) => fetchData(true, newFilters),
  };
}