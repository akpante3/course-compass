export interface Popularity {
  views?: number;
  likes?: number;
  rating?: number;
}

export interface Course {
  score: number;
  provider: string;
  providerId: string;
  title: string;
  url: string;
  priceUsd: number;
  level: string;
  durationMinutes: number;
  popularity: Popularity;
  certificationAvailable: boolean;
  thumbnail?: string;
  locale?: string;
}

export interface SearchResponse {
  query: string;
  count: number;
  results: Course[];
}
