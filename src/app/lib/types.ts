import * as z from "zod";

const JobZod = z.object({
  name: z.string(),
  position: z.string(),
  url: z.string(),
  startDate: z.date(),
  endDate: z.optional(z.date()),
  summary: z.string(),
  highlights: z.array(z.string())
});



export type Job = z.infer<typeof JobZod>;


export interface Post {
  slug: string[];
  title: string;
  date?: string;
  datePublished?: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  readingTime?: string; // Common field name, formerly readTime?
  draft?: boolean;
  [key: string]: any;
}

export type BlogPost = Post;

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  outcome: string;
}

export interface GardenNote {
  id: string;
  title: string;
  topic: string;
  status: 'Seed' | 'Budding' | 'Evergreen';
  preview: string;
}

export enum UserType {
  RECRUITER = 'recruiter',
  BUSINESS = 'business'
}