import Nav from '@/app/components/Nav';
import StarField from '@/app/components/StarField';
import RevealWrapper from '@/app/components/RevealWrapper';
import { getProjects, getExperiences, type Project, type Experience } from '@/lib/sanity';

function formatPeriod(startDate: string, endDate: string | null): string {
  const fmt = (d: string) => {
    const [y, m] = d.split('-').map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const start = startDate ? fmt(startDate) : '';
  const end = endDate ? fmt(endDate) : 'Present';
  if (!start) return end;
  if (start === end) return start;
  return `${start} – ${end}`;
}

export default async function Home() {
  let projects: Project[] = [];
  let experiences: Experience[] = [];
  let sanityError: string | null = null;
  try {
    [projects, experiences] = await Promise.all([getProjects(), getExperiences()]);
  } catch (err) {
    sanityError = String(err);
    console.error('[Sanity] fetch error:', err);
  }

  return (
    <>
      <StarField />
      <Nav />
      <RevealWrapper>

        {/* HERO */}
        <section id="hero">
          <div className="container">
            <div className="hero-eyebrow hero-anim hero-anim-d1">hi i&apos;m,</div>
            <h1 className="hero-name hero-anim hero-anim-d2">
              Rafa<br />
              <span className="dim">Inamdar.</span>
            </h1>
            <p className="hero-tagline hero-anim hero-anim-d3">
              Computer engineering student building full-stack web apps, ML models,
              and things that solve real problems.
            </p>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="container">
            <div className="sl reveal">
              <span className="sl-name">About</span>
            </div>
            <div className="about-text reveal reveal-d1">
              <h2>Building things that <em>matter.</em></h2>
              <p>
                I&apos;m a final-year Computer Engineering student at NMIMS MPSTME who enjoys building
                clean, useful, and user-focused tech. I like working on projects that bring ideas to
                life — whether it&apos;s a web app, a small ML model, or something in between.
              </p>
              <p>
                I&apos;ve also been involved in student-led initiatives and events that let me collaborate,
                lead, and learn outside the classroom. I&apos;m focusing on full-stack development with the
                MERN stack and preparing for software engineering roles.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="container">
            <div className="sl reveal">
              <span className="sl-name">Projects</span>
            </div>
            {projects.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
                No projects yet — add some in Sanity Studio.
              </p>
            ) : (
              <div className="projects-grid">
                {projects.map((p, i) => (
                  <div key={p.slug.current} className={`proj-card reveal reveal-d${(i % 4) + 1}`}>
                    <div className="proj-card-top">
                      <span className="proj-num">{String(i + 1).padStart(2, '0')}</span>
                      {p.link && <span className="proj-arrow">↗</span>}
                    </div>
                    <div className="proj-name">{p.title}</div>
                    <p className="proj-desc">{p.description}</p>
                    {p.tags && p.tags.length > 0 && (
                      <div className="proj-tags">
                        {p.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
                      </div>
                    )}
                    {p.link && (
                      <div className="proj-links">
                        <a href={p.link} target="_blank" rel="noreferrer" className="proj-link">View Project ↗</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="container">
            <div className="sl reveal">
              <span className="sl-name">Experience</span>
            </div>
            {sanityError && (
              <pre style={{ color: 'red', fontSize: '0.75rem', whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{sanityError}</pre>
            )}
            {experiences.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
                No experiences yet — add some in Sanity Studio.
              </p>
            ) : (
              <div className="exp-cards">
                {experiences.map((e, i) => (
                  <div key={e.slug?.current ?? i} className={`exp-card reveal reveal-d${(i % 4) + 1}`}>
                    <div className="exp-card-company">{e.company}</div>
                    <div className="exp-card-role">{e.position}</div>
                    {(e.startDate || e.endDate) && (
                      <div className="exp-card-period">{formatPeriod(e.startDate, e.endDate)}</div>
                    )}
                    {e.description && <p className="exp-card-desc">{e.description}</p>}
                    {e.tags && e.tags.length > 0 && (
                      <div className="proj-tags exp-card-tags">
                        {e.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="container">
            <div className="sl reveal">
              <span className="sl-name">Get in touch</span>
            </div>
            <div className="contact-wrap">
              <p className="contact-sub reveal reveal-d1">
                Whether you have a project in mind, a role to fill, or just want to say hello — my inbox is always open.
              </p>
              <div className="contact-links reveal reveal-d2">
                <a href="mailto:rafainamdar2@gmail.com" className="contact-link">
                  <span className="cl-name">Email</span>
                  <span className="cl-handle">rafainamdar2@gmail.com</span>
                </a>
                <a href="https://github.com/rafainamdar04" target="_blank" rel="noreferrer" className="contact-link">
                  <span className="cl-name">GitHub</span>
                  <span className="cl-handle">@rafainamdar04</span>
                </a>
                <a href="https://www.linkedin.com/in/rafa-inamdar-477162247/" target="_blank" rel="noreferrer" className="contact-link">
                  <span className="cl-name">LinkedIn</span>
                  <span className="cl-handle">/in/rafa-inamdar-477162247</span>
                </a>
                <a href="https://in.pinterest.com/rafainamdar2/" target="_blank" rel="noreferrer" className="contact-link">
                  <span className="cl-name">Pinterest</span>
                  <span className="cl-handle">rafainamdar2</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="container">
            <div className="footer-inner">
              <span className="footer-copy">© {new Date().getFullYear()} Rafa Inamdar. All rights reserved.</span>
            </div>
          </div>
        </footer>

      </RevealWrapper>
    </>
  );
}
