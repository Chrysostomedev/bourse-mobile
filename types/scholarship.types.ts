export type Scholarship = {
  id: number;
  title: string;
  slug: string;
  organism_name: string;
  country: {
    id: number;
    name: string;
    code_iso2?: string;
    flag_emoji?: string;
  } | null;
  study_level: string | null;          // "Master", "Licence"...
  funding_type: string | null;
  status: string;
  is_featured: boolean;
  cover_image_url: string | null;
  next_deadline: string | null;        // ISO date
  days_remaining: number | null;
  created_at: string;
};