import Image from 'next/image';
import RevealWrapper from '@/app/components/RevealWrapper';
import StarField from '@/app/components/StarField';
import { getProjects, getExperiences, getPosts, urlFor, type Project, type Experience, type Post } from '@/lib/sanity';
import { formatPeriod } from '@/lib/format-period';

function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default async function Home() {
  let projects: Project[] = [];
  let experiences: Experience[] = [];
  let posts: Post[] = [];
  try {
    [projects, experiences, posts] = await Promise.all([getProjects(), getExperiences(), getPosts()]);
  } catch (err) {
    console.error('[Sanity] fetch error:', err);
  }

  return (
    <RevealWrapper>
      <main>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="hero" id="top">
          <StarField />
          <div className="scrim" aria-hidden="true" />
          <div className="wrap">
            <p className="kicker hero-anim hero-anim-d1">
              Computer Engineer. <b>Data, machine learning, and intelligent systems.</b>
            </p>
            <h1 className="name hero-anim hero-anim-d2">Rafa&nbsp;Inamdar</h1>
            <p className="lede hero-anim hero-anim-d3">
              I follow data wherever it lives, and look for the <em>pattern underneath</em>.
            </p>
            <div className="hero-links hero-anim hero-anim-d4">
              <a className="lnk" href="mailto:rafainamdar2@gmail.com">Email</a>
              <a className="lnk" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
              <a className="lnk" href="https://www.linkedin.com/in/rafa-inamdar-477162247/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="lnk" href="https://github.com/rafainamdar04" target="_blank" rel="noreferrer">GitHub</a>
              <a className="lnk" href="#writing">Writing</a>
            </div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────── */}
        <section className="block" id="about">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">About</p>
              <h2 className="title">Data doesn&apos;t care where it came from.</h2>
            </div>
            <div className="about-grid">
              <p className="about-lead reveal">
                Scans, telemetry, support tickets, enterprise records. The source changes; the work
                doesn&apos;t. <b>Find the structure, test it, see if it holds.</b>
              </p>
              <div className="about-body reveal reveal-d1">
                <p>
                  I build <strong>machine learning and intelligent systems</strong>: classification
                  models, retrieval pipelines, and the tooling around them. The question is always the
                  same one. Is this pattern real, or am I fooling myself?
                </p>
                <p>
                  My day job puts me inside <strong>enterprise data at scale</strong>, where records are
                  messy, incomplete, and consequential. It taught me that analysis is only as good as
                  the data underneath it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORK ─────────────────────────────────────────────────── */}
        <section className="block" id="work">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Selected work</p>
              <h2 className="title">Same instinct, different data.</h2>
            </div>

            {projects.length === 0 ? (
              <p className="empty">No projects yet — add some in Sanity Studio.</p>
            ) : (
              <div className="projects">
                {projects.map((p, i) => (
                  <article key={p.slug.current} className={`card reveal reveal-d${(i % 4) + 1}`}>
                    {p.coverImage && (
                      <div className="card-shot">
                        <Image
                          src={urlFor(p.coverImage).width(800).height(450).fit('crop').url()}
                          alt={`${p.title} screenshot`}
                          width={800}
                          height={450}
                        />
                      </div>
                    )}
                    <p className="val">{String(i + 1).padStart(2, '0')}</p>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    {p.tags && p.tags.length > 0 && (
                      <div className="tag-row">{p.tags.join('  ·  ')}</div>
                    )}
                    {p.link && (
                      <div className="card-go">
                        <a className="lnk" href={p.link} target="_blank" rel="noreferrer">
                          View project ↗
                        </a>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────────── */}
        <section className="block" id="experience">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Experience</p>
              <h2 className="title">The path, in order.</h2>
            </div>

            {experiences.length === 0 ? (
              <p className="empty">No experiences yet — add some in Sanity Studio.</p>
            ) : (
              <div className="timeline reveal">
                {experiences.map((e, i) => (
                  // A missing end date means the role is current — that's what
                  // fills the timeline node rather than a hard-coded index.
                  <div key={e.slug?.current ?? i} className={`row${e.endDate ? '' : ' now'}`}>
                    <span className="node" />
                    {(e.startDate || e.endDate) && (
                      <p className="when">{formatPeriod(e.startDate, e.endDate)}</p>
                    )}
                    <div className="row-head">
                      {e.coverImage && (
                        <Image
                          src={urlFor(e.coverImage).width(120).height(120).fit('crop').url()}
                          alt={`${e.company} logo`}
                          width={38}
                          height={38}
                          className="row-logo"
                        />
                      )}
                      <div>
                        <h3>{e.position}</h3>
                        <p className="org">{e.company}</p>
                      </div>
                    </div>
                    {e.description && <p className="desc">{e.description}</p>}
                    {e.tags && e.tags.length > 0 && (
                      <div className="tag-row">{e.tags.join('  ·  ')}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── WRITING ──────────────────────────────────────────────── */}
        <section className="block" id="writing">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="eyebrow">Writing</p>
              <h2 className="title">Thinking out loud, in public.</h2>
            </div>

            {posts.length === 0 ? (
              <p className="empty">No posts yet — add some in Sanity Studio.</p>
            ) : (
              <div className="reveal">
                {posts.map((post) => (
                  <a
                    key={post.slug.current}
                    className="post"
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="meta">
                      {post.publishedAt ? formatPostDate(post.publishedAt) : 'Medium'}
                    </span>
                    <div>
                      <p className="headline">{post.title}</p>
                      <p className="dek">{post.excerpt}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="tag-row">{post.tags.join('  ·  ')}</div>
                      )}
                    </div>
                    <span className="go">Read ↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      <footer>
        <div className="wrap">
          <div className="colophon reveal">
            <span>© {new Date().getFullYear()} Rafa Inamdar</span>
            <span>Next.js · Sanity</span>
          </div>
        </div>
      </footer>
    </RevealWrapper>
  );
}
