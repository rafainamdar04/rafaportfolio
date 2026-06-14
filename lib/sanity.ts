import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Lazily create the client so a missing env var fails at request time
// (caught by callers) instead of crashing the whole production build.
let _client: ReturnType<typeof createClient> | null = null;
export function getClient(): ReturnType<typeof createClient> {
  if (!_client) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    if (!projectId || !dataset) {
      throw new Error(
        'Sanity is not configured: set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET'
      );
    }
    _client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    });
  }
  return _client;
}

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(getClient()).image(source);
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
  return getClient().fetch(
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
  return getClient().fetch(
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
  return getClient().fetch(
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
  return getClient().fetch(
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
  return getClient().fetch(`*[_type == "post"]{ "slug": slug.current }`, {}, noCache);
}
