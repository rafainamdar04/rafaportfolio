'use client';

import { useEffect, useRef, useState } from 'react';
import { STAR_CELLS, STAR_G } from '@/lib/pixel-star';

const SIZE = 84;
const CELL = 4;

/**
 * The star draws itself in top-to-bottom scan order while a bar fills, then
 * the overlay fades out. A hard cap makes sure a slow asset can never trap the
 * visitor behind it.
 */
export default function LoadingScreen() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const off = (SIZE - STAR_G * CELL) / 2;
    const order = STAR_CELLS.slice().sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));
    const ink = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim() || '#eeece7';
    let shown = 0;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = ink;
      for (let i = 0; i < shown; i++) {
        const p = order[i];
        ctx.fillRect(off + p[0] * CELL, off + p[1] * CELL, CELL, CELL);
      }
    };

    const iv = setInterval(() => {
      shown = Math.min(order.length, shown + 4);
      draw();
      if (shown >= order.length) clearInterval(iv);
    }, 16);

    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    // ~450ms to fill the star, then a beat before the fade.
    const t1 = setTimeout(() => setPhase('out'), 780);
    const t2 = setTimeout(() => setPhase('done'), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div id="loader" className={phase === 'out' ? 'done' : ''} role="status" aria-label="Loading">
      <canvas ref={canvasRef} width={SIZE} height={SIZE} aria-hidden="true" />
      <div className="load-bar"><i /></div>
      <span className="load-mark">RI</span>
    </div>
  );
}
