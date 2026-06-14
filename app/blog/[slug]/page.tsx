import { redirect, notFound } from 'next/navigation';
import { getPost, getPostSlugs } from '@/lib/sanity';

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// All blog posts now live on Medium — redirect straight to the article.
export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post = null;
  try { post = await getPost(params.slug); } catch {}
  if (!post) notFound();
  redirect(post.mediumUrl);
}
