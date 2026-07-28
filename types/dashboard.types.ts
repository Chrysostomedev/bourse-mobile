export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
  email_verified_at: string | null;
  created_at: string | null;
}

export interface CountryData {
  id: number;
  name: string;
  flag_emoji?: string | null;
}

export interface PartnerData {
  id: number;
  name: string;
  logo_url: string | null;
  website: string | null;
  description: string | null;
  is_featured: boolean;
}

export interface ScholarshipData {
  id: number;
  title: string;
  slug: string;
  organism_name: string;
  country?: CountryData; // absent si relation non eager-loaded côté service
  funding_type: string;
  status: string;
  is_featured: boolean;
  cover_image_url: string | null;
  days_remaining: number | null; // null si intakes non chargées
  created_at: string | null;
}

export interface PostData {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  video_url: string | null;
  author?: UserData; // absent si whenLoaded('author') non chargé
  status: string;
  views_count: number;
  likes_count?: number; // absent si whenCounted('likes') non chargé
  comments_count?: number;
  published_at: string | null;
  created_at: string | null;
}

export interface DashboardStats {
  activeBoursesCount: number;
}

export interface DashboardPub {
  sponsorName: string;
  headline: string;
  subheadline: string;
  phone: string;
}

export interface DashboardResponse {
  user: UserData | null;
  stats: DashboardStats;
  partners: PartnerData[];
  featured: ScholarshipData[];
  recentPosts: PostData[];
  pub: DashboardPub;
}