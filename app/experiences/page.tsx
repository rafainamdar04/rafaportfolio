import Link from 'next/link';
import { getExperiences } from '@/lib/sanity';
import Nav from '@/app/components/Nav';
import StarField from '@/app/components/StarField';

export const revalidate = 60;

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

export default async function ExperiencesPage() {
  let experiences: Awaited<ReturnType<typeof getExperiences>> = [];
  try { experiences = await getExperiences(); } catch {}

  return (
    <>
      <StarField />
      <Nav />
      <main style={{ paddingTop: '5rem' }}>
        <section id="experiences">
          <div className="container">
            <div className="sl">
              <span className="sl-num">Exp /</span>
              <span className="sl-name">Experience</span>
            </div>

            {experiences.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
                No experiences yet — add some in Sanity Studio.
              </p>
            ) : (
              <div className="exp-list">
                {experiences.map((e, i) => (
                  <div key={e.slug?.current ?? i} className={`exp-row reveal reveal-d${(i % 4) + 1}`}>
                    <div className="exp-period">{formatPeriod(e.startDate, e.endDate)}</div>
                    <div style={{ flex: 1 }}>
                      <div className="exp-title">{e.position}</div>
                      <div className="exp-company">{e.company}</div>
                      <p className="exp-desc">{e.description}</p>
                      {e.tags && e.tags.length > 0 && (
                        <div className="proj-tags" style={{ marginTop: '0.75rem' }}>
                          {e.tags.map((tag) => (
                            <span key={tag} className="proj-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
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
