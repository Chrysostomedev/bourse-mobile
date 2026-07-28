import { useCallback, useEffect, useState } from "react";
import { serviceService, type ServiceFilters } from "@/services/service.service";
import type { Service } from "@/types/service.types";
import type { ApiError } from "@/core/error";

type UseServicesReturn = {
  data: Service[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refetch: (filters?: ServiceFilters) => Promise<void>;
};

export function useServices(initialFilters: ServiceFilters = {}): UseServicesReturn {
  const [data, setData] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ServiceFilters>(initialFilters);

  const fetchData = useCallback(
    async (isRefetch = false, newFilters?: ServiceFilters) => {
      if (isRefetch) setIsRefreshing(true);
      else setIsLoading(true);
      setError(null);

      const applied = newFilters ?? filters;

      try {
        const res = await serviceService.getAll(applied);
        setData(res);
        if (newFilters) setFilters(newFilters);
      } catch (e) {
        const apiError = e as ApiError;
        setError(apiError?.errorMessage ?? "Impossible de charger les services");
      } finally {
        if (isRefetch) setIsRefreshing(false);
        else setIsLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    isRefreshing,
    error,
    refetch: (newFilters?: ServiceFilters) => fetchData(true, newFilters),
  };
}