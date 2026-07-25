export interface BlogPost {
  id: string;
  slug: string;

  title: string;
  excerpt: string;

  cover: string;

  category: string;

  author: {
    name: string;
    role: string;
    avatar: string;
  };

  publishedAt: string;

  readingTime: number;

  featured: boolean;

  tags: string[];

  content: {
    heading?: string;
    paragraph?: string;
    list?: string[];
  }[];
}
