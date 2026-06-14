import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type Post = {
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mediumUrl: string;
  tags: string[];
};

export type Project = {
  title: string;
  slug: { current: string };
  description: string;
  link: string | null;
  tags: string[];
  order: number | null;
};

export type Experience = {
  company: string;
  position: string;
  slug: { current: string };
  description: string;
  startDate: string;
  endDate: string | null;
  tags: string[];
  order: number | null;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

const noCache = { next: { revalidate: 0 } };

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      excerpt,
      publishedAt,
      mediumUrl,
      tags
    }`,
    {},
    noCache
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      excerpt,
      publishedAt,
      mediumUrl,
      tags
    }`,
    { slug },
    noCache
  );
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc, _createdAt desc) {
      title,
      slug,
      description,
      link,
      tags,
      order
    }`,
    {},
    noCache
  );
}

export async function getExperiences(): Promise<Experience[]> {
  return client.fetch(
    `*[_type == "experience"] | order(order asc, startDate desc) {
      company,
      position,
      slug,
      description,
      startDate,
      endDate,
      tags,
      order
    }`,
    {},
    noCache
  );
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`*[_type == "post"]{ "slug": slug.current }`, {}, noCache);
}
