'use client';

import { useState, useEffect, useRef } from 'react';

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const LINKS: [string, string][] = [
  ['#work',       'Work'],
  ['#experience', 'Experience'],
  ['#writing',    'Writing'],
  ['/resume.pdf', 'Résumé'],
  ['mailto:rafainamdar2@gmail.com', 'Contact'],
];

export default function Nav() {
  const [theme, setTheme]   = useState<'dark' | 'light'>('dark');
  const [solid, setSolid]   = useState(false);
  const [open, setOpen]     = useState(false);
  const burgerRef           = useRef<HTMLButtonElement>(null);
  const navRef              = useRef<HTMLElement>(null);

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
    const handler = () => setSolid(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onResize = () => { if (window.innerWidth > 760) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus trap while the full-screen menu is up.
  useEffect(() => {
    if (!open) return;
    const el = navRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', trap);
    return () => {
      document.removeEventListener('keydown', trap);
      burgerRef.current?.focus();
    };
  }, [open]);

  return (
    <header className={`bar${solid ? ' solid' : ''}`}>
      <a href="#top" className="mark">RI</a>

      <div className="bar-right">
        <nav
          ref={navRef}
          id="nav"
          className={`top${open ? ' open' : ''}`}
          aria-label="Primary"
        >
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              className="lnk"
              href={href}
              onClick={() => setOpen(false)}
              {...(href.startsWith('/resume') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          className="tgl"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          ref={burgerRef}
          className="burger"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <i /><i /><i />
        </button>
      </div>
    </header>
  );
}
