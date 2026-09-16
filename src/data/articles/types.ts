export type Article = {
  slug: string;
  title: string;
  h1?: string;
  seoTitle?: string;
  metaDescription?: string;
  tag: string;
  date: string;
  publishedAtIso?: string;
  updatedAt?: string;
  updatedAtIso?: string;
  excerpt: string;
  body: string;
  image: string;
  imageAlt?: string;
  authorName?: string;
  reviewerName?: string;
  reviewedAt?: string;
  targetQuery?: string;
  summary?: string;
  keyTakeaways?: string[];
  sections?: ArticleSection[];
  faq?: ArticleFaq[];
  sources?: ArticleSource[];
  cta?: {
    title?: string;
    body?: string;
    bullets?: string[];
    note?: string;
    label: string;
    href: string;
  };
};

export type ArticleSection = {
  id: string;
  title: string;
  body?: string[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type ArticleSource = {
  title: string;
  publisher: string;
  url: string;
};
