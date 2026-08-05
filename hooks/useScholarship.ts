import { useCallback, useEffect, useState } from "react";
import { scholarshipService } from "@/services/scholarship.service";
import type { ApiError } from "@/core/error";

export type ScholarshipDetail = {
  id: number;
  title: string;
  slug: string;
  organism_name: string;
  organism_logo_url: string | null;
  country: {
    id: number;
    name: string;
    flag_emoji?: string;
  } | null;
  scholarship_type: { id: number; name: string } | null;
  funding_type: string | null;
  objective: string | null;
  conditions: string | null;
  advantages: string | string[] | null;
  additional_info: any;
  official_link: string | null;
  cover_image_url: string | null;
  status: string;
  is_featured: boolean;
  views_count: number;
  study_levels: { id: number; name: string }[];
  fields_of_study: { id: number; name: string }[];
  intakes: {
    id: number;
    intake_label: string;
    period_start: string | null;
    period_end: string | null;
    period_label_text: string | null;
  }[];
  created_at: string;
};

type Status = "loading" | "ready" | "notFound" | "error";

type UseScholarshipReturn = {
  data: ScholarshipDetail | null;
  status: Status;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useScholarship(slug: string | undefined): UseScholarshipReturn {
  const [data, setData] = useState<ScholarshipDetail | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!slug) {
      setStatus("notFound");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const res = await scholarshipService.getBySlug(slug);
      setData(res as unknown as ScholarshipDetail);
      setStatus("ready");
    } catch (e) {
      const apiError = e as ApiError;
      // 404 → notFound, le reste → error
      if (apiError?.statusCode === 404) {
        setStatus("notFound");
      } else {
        setError(apiError?.errorMessage ?? "Erreur de chargement");
        setStatus("error");
      }
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, status, error, refetch: fetchData };
}