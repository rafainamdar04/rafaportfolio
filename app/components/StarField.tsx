'use client';

import { useEffect, useRef } from 'react';
import { STAR_CELLS, STAR_G } from '@/lib/pixel-star';

type Star = {
  hx: number; hy: number;           // home position, as a fraction of the canvas
  x: number; y: number;
  vx: number; vy: number;
  z: number;                        // depth: drives size, opacity and parallax
  cell: number;                     // whole-pixel cell size keeps the bitmap true
  base: number;
  ph: number;                       // twinkle phase offset
};
type Dust = { hx: number; hy: number; z: number; ph: number };

/**
 * The hero backdrop: a parallax field of pixel stars that drift toward their
 * home position and are pushed away by the pointer. Drawn on a canvas because
 * the shape is a bitmap — scaling it in whole-pixel cells is what keeps the
 * edges crisp instead of blurring like a scaled SVG would.
 */
export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    let W = 0, H = 0, DPR = 1;
    let stars: Star[] = [];
    let dust: Dust[] = [];
    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, on: false };

    // The canvas can't read CSS custom properties, so the theme ink is pulled
    // off the root element and re-read whenever data-theme flips.
    let ink = '#ffffff';
    const readInk = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--star-ink').trim();
      if (v) ink = v;
    };

    function build() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = Math.floor(W * DPR);
      canvas!.height = Math.floor(H * DPR);
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      ptr.x = ptr.tx = W * 0.72;
      ptr.y = ptr.ty = H * 0.45;

      const n = Math.max(9, Math.min(30, Math.floor((W * H) / 52000)));
      stars = [];
      for (let i = 0; i < n; i++) {
        const z = Math.random();
        stars.push({
          hx: Math.random(), hy: Math.random(), x: 0, y: 0, vx: 0, vy: 0, z,
          cell: 1 + Math.round(z * z * 3),
          base: 0.1 + z * 0.38,
          ph: Math.random() * Math.PI * 2,
        });
      }
      dust = [];
      const dn = Math.floor((W * H) / 9000);
      for (let i = 0; i < dn; i++) {
        dust.push({ hx: Math.random(), hy: Math.random(), z: Math.random() * 0.5 + 0.1, ph: Math.random() * 6.28 });
      }
      for (const s of stars) { s.x = s.hx * W; s.y = s.hy * H; }
    }

    let t = 0;
    function frame() {
      t++;
      ptr.x += (ptr.tx - ptr.x) * 0.07;
      ptr.y += (ptr.ty - ptr.y) * 0.07;
      const pull = ptr.on ? 1 : 0;
      const ox = ptr.x - W / 2;
      const oy = ptr.y - H / 2;

      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = ink;

      for (const d of dust) {
        const x = d.hx * W + (ox / W) * d.z * 10 * pull;
        const y = d.hy * H + (oy / H) * d.z * 10 * pull;
        const tw = reduce ? 0.8 : 0.5 + 0.5 * Math.sin(t * 0.028 + d.ph);
        ctx!.globalAlpha = d.z * tw * 0.5;
        ctx!.fillRect(x | 0, y | 0, 1, 1);
      }

      for (const s of stars) {
        const hx = s.hx * W + (ox / W) * (s.z * 42) * pull;
        const hy = s.hy * H + (oy / H) * (s.z * 42) * pull;

        let fx = 0, fy = 0;
        if (pull) {
          const dx = s.x - ptr.x, dy = s.y - ptr.y, d2 = dx * dx + dy * dy, R = 180;
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2), f = (1 - d / R) * 2.2;
            fx += (dx / d) * f; fy += (dy / d) * f;
          }
        }
        s.vx = (s.vx + fx + (hx - s.x) * 0.012) * 0.86;
        s.vy = (s.vy + fy + (hy - s.y) * 0.012) * 0.86;
        if (reduce) { s.x = hx; s.y = hy; } else { s.x += s.vx; s.y += s.vy; }

        const dx2 = s.x - ptr.x, dy2 = s.y - ptr.y;
        const prox = pull ? Math.max(0, 1 - Math.sqrt(dx2 * dx2 + dy2 * dy2) / 250) : 0;
        const tw = reduce ? 1 : 0.85 + 0.15 * Math.sin(t * 0.02 + s.ph);

        const c = s.cell;
        const x0 = Math.round(s.x - (c * STAR_G) / 2);
        const y0 = Math.round(s.y - (c * STAR_G) / 2);
        ctx!.globalAlpha = Math.min(1, s.base * tw + prox * 0.42);
        for (let i = 0; i < STAR_CELLS.length; i++) {
          const p = STAR_CELLS[i];
          ctx!.fillRect(x0 + p[0] * c, y0 + p[1] * c, c, c);
        }
      }

      ctx!.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.tx = e.clientX - r.left;
      ptr.ty = e.clientY - r.top;
      ptr.on = true;
    };
    const onLeave = () => { ptr.on = false; ptr.tx = W * 0.72; ptr.ty = H * 0.45; };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { build(); if (reduce) frame(); }, 150);
    };

    if (!coarse) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('resize', onResize);

    // Repaint immediately on a theme switch so the static (reduced-motion)
    // render doesn't keep the old ink.
    const themeObs = new MutationObserver(() => { readInk(); if (reduce) frame(); });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    readInk();
    build();
    frame();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      themeObs.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas id="field" ref={ref} aria-hidden="true" />;
}
