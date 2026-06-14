'use client';

import { useState, useEffect } from 'react';

const STAR_PATH =
  'M50,3 L61.2,34.6 L94.7,35.5 L68.1,55.9 L77.6,88 L50,69 L22.4,88 L31.9,55.9 L5.3,35.5 L38.8,34.6 Z ' +
  'M50,30 L54.7,43.5 L69,43.8 L57.6,52.5 L61.8,66.2 L50,58 L38.2,66.2 L42.4,52.5 L31,43.8 L45.3,43.5 Z';

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'),  900);
    const t2 = setTimeout(() => setPhase('done'), 1350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`loader-overlay${phase === 'out' ? ' loader-exit' : ''}`} aria-hidden="true">
      <svg className="loader-star" viewBox="0 0 100 100" aria-hidden="true">
        <path fillRule="evenodd" fill="currentColor" d={STAR_PATH} />
      </svg>
    </div>
  );
}
