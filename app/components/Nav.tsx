'use client';

import { useState, useEffect } from 'react';

const STAR_PATH =
  'M50,3 L61.2,34.6 L94.7,35.5 L68.1,55.9 L77.6,88 L50,69 L22.4,88 L31.9,55.9 L5.3,35.5 L38.8,34.6 Z ' +
  'M50,30 L54.7,43.5 L69,43.8 L57.6,52.5 L61.8,66.2 L50,58 L38.2,66.2 L42.4,52.5 L31,43.8 L45.3,43.5 Z';

function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" fill="currentColor" d={STAR_PATH} />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

const LINKS = [
  ['#about',      'About'],
  ['#projects',   'Projects'],
  ['#experience', 'Experience'],
  ['/blog',       'Blog'],
  ['#contact',    'Get in touch'],
];

export default function Nav() {
  const [theme, setTheme]     = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = (() => { try { return localStorage.getItem('pf-theme-v2'); } catch { return null; } })();
    const initial = (saved as 'dark' | 'light') || 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('pf-theme-v2', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* Full-screen overlay menu */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={close}>{label}</a>
        ))}
        <div className="mobile-nav-footer">
          <a href="mailto:rafainamdar2@gmail.com" onClick={close}>Email</a>
          <a href="https://github.com/rafainamdar04" target="_blank" rel="noreferrer" onClick={close}>GitHub</a>
          <a href="https://www.linkedin.com/in/rafa-inamdar-477162247/" target="_blank" rel="noreferrer" onClick={close}>LinkedIn</a>
        </div>
      </div>

      {/* Nav bar — logo left, controls right */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="/" className="nav-logo" aria-label="Home">
          <StarIcon />
          <span>RI</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  );
}
