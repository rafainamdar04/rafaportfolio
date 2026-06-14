'use client';

import { useEffect } from 'react';

// Filled 5-pointed star with inner pentagonal cutout (evenodd fillRule)
// Outer star: R=47, r=19 centered at (50,50) — thick chunky arms
// Inner star: R=20, r=8  centered at (50,50) — creates the hollow center
const STAR_PATH =
  'M50,3 L61.2,34.6 L94.7,35.5 L68.1,55.9 L77.6,88 L50,69 L22.4,88 L31.9,55.9 L5.3,35.5 L38.8,34.6 Z ' +
  'M50,30 L54.7,43.5 L69,43.8 L57.6,52.5 L61.8,66.2 L50,58 L38.2,66.2 L42.4,52.5 L31,43.8 L45.3,43.5 Z';

// [left%, top%, widthPx, baseOpacity, durationS, delayS, rotateDeg]
const STARS = [
  [5,   8,  130, 0.48, 3.2, 0.0,  5  ],
  [84,  6,   95, 0.40, 3.9, 1.3, -8  ],
  [8,  70,  150, 0.44, 4.2, 0.8,  12 ],
  [77, 58,  110, 0.37, 3.5, 2.1, -5  ],
  [46, 86,   85, 0.42, 4.6, 1.7,  8  ],
  [92, 33,  120, 0.35, 3.8, 0.5, -12 ],
  [26, 44,   75, 0.33, 4.1, 2.8,  3  ],
  [63, 20,  100, 0.38, 3.4, 1.9, -7  ],
] as const;

export default function StarField() {
  useEffect(() => {
    const field = document.getElementById('star-field');
    if (!field) return;
    field.innerHTML = '';

    const NS = 'http://www.w3.org/2000/svg';

    STARS.forEach(([x, y, size, op, dur, delay, rot]) => {
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('class', 'svg-star');
      svg.style.cssText =
        `left:${x}%;top:${y}%;width:${size}px;height:${size}px;` +
        `--op:${op};--rot:${rot}deg`;

      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', STAR_PATH);
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('fill', 'currentColor');

      svg.appendChild(path);
      field.appendChild(svg);
    });
  }, []);

  return <div id="star-field" />;
}
