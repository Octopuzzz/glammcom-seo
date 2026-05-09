// Base CMS response wrapper
export interface CmsResponse<T> {
  code: number;
  data: T;
  message: string;
}

export interface CmsPaginatedResponse<T> {
  code: number;
  data: {
    data: T[];
    total_data: number;
    total_pages: number;
  };
  message: string;
}

// ─── Table Types ───────────────────────────────────────────────────────────────

export interface HeroContent {
  id: string;
  headline: string;
  subheadline: string;
  cta_text: string;
  cta_url: string;
  bg_image_url: string;
  artist_image_url: string;
  created_at?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  medium: string;
  year: string;
  price: string;
  is_highlighted: boolean;
  order_index: number;
  created_at?: string;
}

export interface AboutContent {
  id: string;
  artist_name: string;
  tagline: string;
  bio: string;
  story: string;
  image_url: string;
  instagram_url: string;
  email: string;
  years_active: number;
  artworks_count: number;
  exhibitions_count: number;
  created_at?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  created_at?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string; // 'new' | 'read' | 'replied'
  created_at?: string;
}

// ─── Admin Auth ────────────────────────────────────────────────────────────────

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role_id: string;
  };
}
