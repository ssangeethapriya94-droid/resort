import { useMemo } from 'react';

// Seeded random so shapes are identical on every render.
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

// Palm frond drawn from a curved spine with leaflets.
export function Frond({ className = '', seed = 3, leaflets = 26, color = 'currentColor', sway = true }) {
  const paths = useMemo(() => {
    const r = rng(seed);
    const P0 = [0, 0], P1 = [120, -110], P2 = [260, -30];
    const pt = (t) => [
      (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0],
      (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1],
    ];
    const tan = (t) => {
      const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
      const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
      return Math.atan2(dy, dx);
    };
    const out = [];
    for (let i = 1; i <= leaflets; i++) {
      const t = i / (leaflets + 1);
      const [x, y] = pt(t);
      const a = tan(t);
      const len = 14 + 70 * Math.sin(Math.PI * Math.min(1, t * 1.05)) ** 0.8 * (0.85 + r() * 0.3);
      for (const side of [-1, 1]) {
        const ang = a + side * (0.95 + r() * 0.25);
        const ex = x + Math.cos(ang) * len;
        const ey = y + Math.sin(ang) * len + len * 0.22; // droop
        const cx = x + Math.cos(ang) * len * 0.55;
        const cy = y + Math.sin(ang) * len * 0.55 - 4;
        out.push(`M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
      }
    }
    return out;
  }, [seed, leaflets]);
  return (
    <svg viewBox="-20 -150 320 260" className={`frond ${sway ? 'frond--sway' : ''} ${className}`} aria-hidden="true">
      <path d="M0 0Q120 -110 260 -30" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
      <path d={paths.join('')} fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

// Ripped-paper edge. Place at the bottom (or top, with flip) of a section.
export function TornEdge({ color = 'var(--sand)', flip = false, className = '' }) {
  const d = useMemo(() => {
    const r = rng(11);
    const W = 1440, H = 44;
    let p = `M0 ${H}L0 ${22}`;
    for (let x = 0; x <= W; x += 9) {
      const y = 14 + r() * 14 + (r() > 0.93 ? r() * 8 : 0);
      p += `L${x} ${y.toFixed(1)}`;
    }
    p += `L${W} ${H}Z`;
    return p;
  }, []);
  return (
    <svg className={`torn ${flip ? 'torn--flip' : ''} ${className}`} viewBox="0 0 1440 44" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill={color} />
    </svg>
  );
}

// Animated wave divider, a nod to "Dancing with waves".
export function Wave({ color = 'var(--teal)', flip = false, className = '' }) {
  const d = 'M0 40C120 10 240 10 360 40S600 70 720 40 960 10 1080 40 1320 70 1440 40V80H0Z';
  return (
    <div className={`wave ${flip ? 'wave--flip' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 2880 80" preserveAspectRatio="none" className="wave-a">
        <path d={d} fill={color} opacity=".35" />
        <path d={d} transform="translate(1440 0)" fill={color} opacity=".35" />
      </svg>
      <svg viewBox="0 0 2880 80" preserveAspectRatio="none" className="wave-b">
        <path d={d} fill={color} />
        <path d={d} transform="translate(1440 0)" fill={color} />
      </svg>
    </div>
  );
}

// Hand-drawn underline that draws itself on scroll.
export function ScribbleUnderline({ className = '' }) {
  return (
    <svg viewBox="0 0 220 18" className={`scribble ${className}`} aria-hidden="true" preserveAspectRatio="none">
      <path d="M3 12C40 4 70 15 110 8s70-6 107 2" fill="none" stroke="var(--terracotta)" strokeWidth="3.2" strokeLinecap="round" pathLength="1" />
    </svg>
  );
}

// Coastal artistic shoreline surf illustration for hero corner
export function WaveFlourish({ className = '' }) {
  return (
    <svg viewBox="0 0 340 180" className={`wave-flourish ${className}`} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="oceanDeep" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#02485D" stopOpacity="0.38" />
          <stop offset="65%" stopColor="#02485D" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7DC3E2" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="oceanAqua" x1="0%" y1="80%" x2="90%" y2="0%">
          <stop offset="0%" stopColor="#7DC3E2" stopOpacity="0.52" />
          <stop offset="55%" stopColor="#7DC3E2" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#FEFEFF" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="oceanFoam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEFEFF" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FEFEFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#7DC3E2" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Deep ocean tide swell layer */}
      <path
        d="M-30 180 C 30 165, 80 120, 150 138 C 220 156, 260 110, 340 130 L 350 180 L -30 180 Z"
        fill="url(#oceanDeep)"
      />

      {/* Turquoise rolling swell layer */}
      <path
        d="M-30 180 C 20 145, 65 92, 135 110 C 205 128, 245 82, 310 102 L 330 180 L -30 180 Z"
        fill="url(#oceanAqua)"
      />

      {/* Shoreline Tide Wave Crest 1 (Dark Teal Graceful Edge) */}
      <path
        d="M-20 150 C 30 120, 75 78, 145 95 C 210 112, 250 68, 315 88"
        stroke="#02485D"
        strokeWidth="2.8"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Shoreline Tide Wave Crest 2 (Sky Blue Luminous Wave) */}
      <path
        d="M-10 130 C 40 100, 85 58, 155 75 C 220 92, 260 48, 320 66"
        stroke="#7DC3E2"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Foaming Sea Crest (Ivory Sparkling Ripple) */}
      <path
        d="M10 112 C 55 82, 98 42, 165 58 C 215 70, 250 36, 295 48"
        stroke="url(#oceanFoam)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="7 5"
        opacity="0.92"
      />

      {/* Secondary Ripple Wash in Sand */}
      <path
        d="M-25 170 C 45 155, 105 118, 180 135 C 255 152, 290 118, 335 132"
        stroke="#02485D"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.32"
      />

      {/* Tiny Glistening Ocean Spray Droplets */}
      <circle cx="170" cy="52" r="2.4" fill="#FEFEFF" opacity="0.9" />
      <circle cx="230" cy="42" r="1.8" fill="#7DC3E2" opacity="0.8" />
      <circle cx="270" cy="38" r="2.5" fill="#FEFEFF" opacity="0.85" />
      <circle cx="115" cy="68" r="1.6" fill="#7DC3E2" opacity="0.75" />
      <circle cx="305" cy="52" r="1.8" fill="#D87C51" opacity="0.65" />
    </svg>
  );
}

// Handwritten curved arrow doodle
export function CurvedArrow({ className = '' }) {
  return (
    <svg viewBox="0 0 70 50" className={`curved-arrow ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 40 C 28 42, 54 36, 52 14" />
      <path d="M44 20 L 52 13 L 59 20" />
    </svg>
  );
}

// Cute hand-drawn coastal seashell doodle
export function Seashell({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 48 42" className={`doodle-seashell ${className}`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 38 C 14 38, 4 28, 4 18 C 4 8, 14 4, 24 4 C 34 4, 44 8, 44 18 C 44 28, 34 38, 24 38 Z" fill="rgba(254, 254, 255, 0.4)" />
      <path d="M24 38 L 8 16" />
      <path d="M24 38 L 15 10" />
      <path d="M24 38 L 24 6" />
      <path d="M24 38 L 33 10" />
      <path d="M24 38 L 40 16" />
      <path d="M19 38 C 19 41, 29 41, 29 38" />
    </svg>
  );
}

// Hand-drawn Pondicherry seaside lighthouse sketch with rocks & palm
export function LighthouseDoodle({ className = '', color = '#02485D' }) {
  return (
    <svg viewBox="0 0 110 160" className={`doodle-lighthouse ${className}`} fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 152 C 20 148, 45 155, 75 149 C 95 145, 105 154, 108 152" strokeWidth="2" />
      <path d="M15 156 C 25 150, 40 152, 55 156" opacity="0.6" />
      <path d="M42 148 L 47 48 L 65 48 L 70 148 Z" fill="rgba(254, 254, 255, 0.6)" />
      <path d="M44 125 L 68 125" />
      <path d="M45 100 L 67 100" />
      <path d="M46 74 L 66 74" />
      <rect x="53" y="132" width="6" height="12" rx="3" fill={color} />
      <rect x="54" y="85" width="4" height="7" rx="2" fill={color} />
      <path d="M44 48 L 68 48" strokeWidth="2.4" />
      <path d="M46 48 L 46 32 L 66 32 L 66 48" />
      <path d="M43 32 L 69 32" strokeWidth="2.2" />
      <path d="M47 32 C 47 18, 65 18, 65 32 Z" fill="rgba(254, 254, 255, 0.8)" />
      <circle cx="56" cy="14" r="2.5" fill={color} />
      <path d="M36 34 L 20 28" strokeDasharray="3 3" opacity="0.7" />
      <path d="M34 40 L 16 40" strokeDasharray="3 3" opacity="0.7" />
      <path d="M76 34 L 92 28" strokeDasharray="3 3" opacity="0.7" />
      <path d="M78 40 L 96 40" strokeDasharray="3 3" opacity="0.7" />
      <path d="M22 150 C 20 135, 26 122, 28 114" strokeWidth="2.2" />
      <path d="M28 114 C 22 108, 12 110, 8 114" />
      <path d="M28 114 C 26 104, 30 96, 32 94" />
      <path d="M28 114 C 36 108, 44 112, 46 116" />
      <path d="M28 114 C 20 114, 16 122, 14 126" />
    </svg>
  );
}

// Delicate ocean ripple flourish
export function WaveRipple({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 60 18" className={`doodle-wave ${className}`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M3 11 C 9 6, 17 6, 23 11 C 29 16, 37 16, 43 11 C 49 6, 54 8, 57 11" />
      <path d="M8 15 C 13 11, 19 11, 24 15 C 29 19, 36 19, 41 15 C 46 12, 50 13, 53 15" opacity="0.55" />
    </svg>
  );
}

// Coastal tropical hibiscus blossom accent
export function TropicalFlower({ className = '', size = 52 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`doodle-flower ${className}`} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="petalPink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D87C51" />
          <stop offset="45%" stopColor="#e35d6a" />
          <stop offset="100%" stopColor="#bf3a4b" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="18" r="14" fill="url(#petalPink)" opacity="0.95" />
      <circle cx="45" cy="27" r="14" fill="url(#petalPink)" opacity="0.95" />
      <circle cx="40" cy="44" r="14" fill="url(#petalPink)" opacity="0.95" />
      <circle cx="24" cy="44" r="14" fill="url(#petalPink)" opacity="0.95" />
      <circle cx="19" cy="27" r="14" fill="url(#petalPink)" opacity="0.95" />
      <circle cx="32" cy="32" r="7" fill="#fcd34d" />
      <circle cx="32" cy="32" r="3" fill="#b45309" />
      <path d="M32 32 Q 38 20 46 14" stroke="#fef08a" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="46" cy="14" r="2.5" fill="#f59e0b" />
    </svg>
  );
}

// Delicate flying seagulls in the coastal sky
export function Seagulls({ className = '', color = '#02485D' }) {
  return (
    <svg viewBox="0 0 95 32" className={`doodle-seagulls ${className}`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 18 Q 14 10 22 18 Q 30 10 38 18" opacity="0.75" />
      <path d="M42 22 Q 47 16 52 22 Q 57 16 62 22" opacity="0.6" />
      <path d="M68 12 Q 75 4 82 12 Q 89 4 96 12" opacity="0.8" />
    </svg>
  );
}

