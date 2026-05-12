// Shared TypeScript types for AI Spend Audit

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export * from "./pricing";

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type Testimonial = {
  author: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
};

export type AIProvider = "openai" | "anthropic" | "google" | "cohere" | "mistral" | "other";

export type SpendRecord = {
  id: string;
  provider: AIProvider;
  model: string;
  tokens: number;
  cost: number;
  timestamp: Date;
  projectId?: string;
};
