  import { useCallback, useEffect, useState } from "react";
  import { dashboardService } from "@/services/dashboard.service";
  import type { DashboardResponse } from "@/types/dashboard.types";
  import type { ApiError } from "@/core/error";

  type UseDashboardReturn = {
    data: DashboardResponse | null;
    isLoading: boolean;
    isRefreshing: boolean;
    error: string | null;
    refetch: () => Promise<void>;
  };

  export function useDashboard(): UseDashboardReturn {
    const [data, setData] = useState<DashboardResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (isRefetch = false) => {
      if (isRefetch) setIsRefreshing(true);
      else setIsLoading(true);
      setError(null);

      try {
        const res = await dashboardService.getHome();
        setData(res);
      } catch (e) {
        const apiError = e as ApiError;
        setError(apiError?.errorMessage ?? "Impossible de charger le tableau de bord");
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