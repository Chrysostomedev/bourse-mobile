import { useCallback, useEffect, useState } from "react";
import { serviceService } from "@/services/service.service";
import type { Service } from "@/types/service.types";
import type { ApiError } from "@/core/error";

type Status = "loading" | "ready" | "notFound" | "error";

type UseServiceReturn = {
  data: Service | null;
  status: Status;
  error: string | null;
  refetch: () => Promise<void>;
};

const KIND_ICON: Record<string, string> = {
  coaching: "briefcase",
  formation: "video",
  dossier: "document",
  ebook: "book",
  produit: "briefcase",
};

function mapService(raw: Service): Service {
  return {
    ...raw,
    category: raw.kind,
    icon: KIND_ICON[raw.kind] ?? "briefcase",
    popular: false,
    priceTag: null,
  };
}

export function useService(id: string | undefined): UseServiceReturn {
  const [data, setData] = useState<Service | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      setStatus("notFound");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const res = await serviceService.getById(id);
      if (!res) {
        setStatus("notFound");
        return;
      }
      setData(mapService(res));
      setStatus("ready");
    } catch (e) {
      const apiError = e as ApiError;
      setError(apiError?.errorMessage ?? "Erreur de chargement");
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, status, error, refetch: fetchData };
}