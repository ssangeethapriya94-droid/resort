const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

const PATHS = {
  sea: <><path d="M3 15c2.5-3 4.5-3 7 0s4.5 3 7 0 3-2.5 4-2" {...P} /><path d="M3 20c2.5-3 4.5-3 7 0s4.5 3 7 0 3-2.5 4-2" {...P} /><circle cx="16" cy="6" r="2.6" {...P} /></>,
  boat: <><path d="M3 18l2.2 3.2c.4.5 1 .8 1.6.8h10.4c.6 0 1.2-.3 1.6-.8L21 18H3z" {...P} /><path d="M12 4v13" {...P} /><path d="M12 5.5l6.5 8.5H12z" {...P} /><path d="M12 8L6.5 14H12" {...P} /></>,
  beach: <><path d="M12 4v16" {...P} /><path d="M4 11a8 7 0 0 1 16 0z" {...P} /><path d="M3 20h18" {...P} /></>,
  wifi: <><path d="M3 9a14 14 0 0 1 18 0" {...P} /><path d="M6 12.5a9.5 9.5 0 0 1 12 0" {...P} /><path d="M9 16a5 5 0 0 1 6 0" {...P} /><circle cx="12" cy="19" r="1" {...P} /></>,
  parking: <><rect x="4" y="4" width="16" height="16" rx="4" {...P} /><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" {...P} /></>,
  food: <><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10" {...P} /><path d="M16 21V3c-2 2-3 5-3 8h3" {...P} /></>,
  roof: <><path d="M3 11 12 4l9 7" {...P} /><path d="M6 10v10h12V10" {...P} /><path d="M10 20v-5h4v5" {...P} /></>,
  garden: <><path d="M12 21v-9" {...P} /><path d="M12 12c-4 0-6-2-6-6 4 0 6 2 6 6Z" {...P} /><path d="M12 14c3 0 5-2 5-5-3 0-5 2-5 5Z" {...P} /></>,
  heritage: <><path d="M3 21h18M5 21V10m14 11V10M3 10l9-6 9 6M9 21v-6h6v6" {...P} /></>,
  temple: <><circle cx="12" cy="11" r="6" {...P} /><path d="M12 5V3M8 21h8M12 17v4" {...P} /></>,
  shop: <><path d="M5 8h14l-1 12H6L5 8Z" {...P} /><path d="M9 8a3 3 0 0 1 6 0" {...P} /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="3" {...P} /><path d="M4 10h16M8 3v4M16 3v4" {...P} /></>,
  guests: <><circle cx="9" cy="8" r="3" {...P} /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" {...P} /><path d="M16 5.5a3 3 0 0 1 0 5.5M18 14c2 .8 3 2.6 3 6" {...P} /></>,
  phone: <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" {...P} /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" {...P} /><path d="m4 7 8 6 8-6" {...P} /></>,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" {...P} /><circle cx="12" cy="10" r="2.5" {...P} /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" {...P} /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" {...P} /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" {...P} /></>,
  left: <><path d="m15 5-7 7 7 7" {...P} /></>,
  right: <><path d="m9 5 7 7-7 7" {...P} /></>,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="5" {...P} /><circle cx="12" cy="12" r="3.6" {...P} /><circle cx="17" cy="7" r=".8" fill="currentColor" /></>,
  facebook: <><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8Z" {...P} /></>,
  whatsapp: <><path d="M4 20l1.2-4A8 8 0 1 1 8 18.8L4 20Z" {...P} /><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 9Z" {...P} /></>,
  heart: <><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.500-7 10-7 10Z" {...P} /></>,
  check: <><path d="m5 12 5 5 9-10" {...P} /></>,
  sound: <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" {...P} /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" {...P} /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" {...P} /></>,
  mute: <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" {...P} /><line x1="23" y1="9" x2="17" y2="15" {...P} /><line x1="17" y1="9" x2="23" y2="15" {...P} /></>,
  home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" {...P} /><polyline points="9 22 9 12 15 12 15 22" {...P} /></>,
  sun: <><circle cx="12" cy="12" r="5" {...P} /><line x1="12" y1="1" x2="12" y2="3" {...P} /><line x1="12" y1="21" x2="12" y2="23" {...P} /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" {...P} /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" {...P} /><line x1="1" y1="12" x2="3" y2="12" {...P} /><line x1="21" y1="12" x2="23" y2="12" {...P} /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" {...P} /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" {...P} /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" {...P} /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" {...P} /></>,
  'chevron-left': <><polyline points="15 18 9 12 15 6" {...P} /></>,
  'chevron-right': <><polyline points="9 18 15 12 9 6" {...P} /></>,
  zoom: <><circle cx="11" cy="11" r="7" {...P} /><line x1="21" y1="21" x2="16.65" y2="16.65" {...P} /><line x1="11" y1="8" x2="11" y2="14" {...P} /><line x1="8" y1="11" x2="14" y2="11" {...P} /></>,
  youtube: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" {...P} /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" /></>,
  play: <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" />,
  bed: <><path d="M3 7v13M3 17h18M21 11v9" {...P} /><path d="M3 13h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H3" {...P} /><circle cx="7" cy="10" r="1.5" fill="currentColor" /></>,
  wind: <><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" {...P} /></>,
  spark: <><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" {...P} /></>,
  chair: <><path d="M6 10V6a4 4 0 0 1 8 0v4M4 13a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM5 19v3M15 19v3" {...P} /></>,
  camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" {...P} /><circle cx="12" cy="13" r="4" {...P} /></>,
  compass: <><circle cx="12" cy="12" r="10" {...P} /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" {...P} /></>,
  star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" {...P} /></>,
  headset: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" {...P} /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" {...P} /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" {...P} /><circle cx="12" cy="7" r="4" {...P} /></>,
  car: <><path d="M5 17h14M4 14l2-6h12l2 6" {...P} /><circle cx="7.5" cy="17.5" r="2.5" {...P} /><circle cx="16.5" cy="17.5" r="2.5" {...P} /></>,
  send: <><line x1="22" y1="2" x2="11" y2="13" {...P} /><polygon points="22 2 15 22 11 13 2 9 22 2" {...P} /></>,
  lightning: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...P} /></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" {...P} /><path d="M13.73 21a2 2 0 0 1-3.46 0" {...P} /></>,
};

export default function Icon({ name, size = 24, className = '', title }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {PATHS[name]}
    </svg>
  );
}
