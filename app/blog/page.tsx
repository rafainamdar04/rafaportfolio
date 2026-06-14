import Link from 'next/link';
import { getPosts, type Post } from '@/lib/sanity';
import Nav from '@/app/components/Nav';
import StarField from '@/app/components/StarField';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try { posts = await getPosts(); } catch {}

  return (
    <>
      <StarField />
      <Nav />
      <main style={{ paddingTop: '5rem' }}>
        <section id="blog">
          <div className="container">
            <div className="sl">
              <span className="sl-num">Blog /</span>
              <span className="sl-name">Writing</span>
            </div>

            {posts.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
                No posts yet — add some in Sanity Studio.
              </p>
            ) : (
              <div className="blog-list">
                {posts.map((post) => (
                  <a
                    key={post.slug.current}
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="blog-row"
                  >
                    <span className="blog-date">
                      {post.publishedAt ? formatDate(post.publishedAt) : '—'}
                    </span>
                    <span className="blog-title">{post.title}</span>
                    <span className="blog-cat">Read on Medium ↗</span>
                  </a>
                ))}
              </div>
            )}

            <div style={{ marginTop: '3rem' }}>
              <Link
                href="/"
                style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}
              >
                ← Back to portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
