export interface Article {
  id: string;
  title: string;
  subtitle: string;
  lead: string;
  content: string;
  section: string;
  tags: string[];
  authorId: string;
  author: Author;
  featuredImage: FeaturedImage;
  readTime: number;
  wordCount: number;
  isPremium: boolean;
  isFeatured: boolean;
  isBreaking: boolean;
  comments: number;
  shares: number;
  category: string | null;
  views: number;
  relatedArticles: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  bio: string;
  name: string;
  avatar: string;
}

export interface FeaturedImage {
  alt: string;
  url: string;
  caption: string;
}

export type FetchState = "initial" | "loading" | "success" | "error" | "fail";
