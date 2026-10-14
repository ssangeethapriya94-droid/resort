import { IMAGES } from '../data/imageMeta.js';

// Responsive WebP image from /public/img. Pass `name` (file base name), `alt`, `sizes`.
export default function Img({ name, alt = '', sizes = '100vw', className = '', eager = false, style, onLoad }) {
  const m = IMAGES[name];
  if (!m) return null;
  const srcSet = m.widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(', ');
  const fallback = `/img/${name}-${m.widths[Math.min(1, m.widths.length - 1)]}.webp`;
  return (
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={m.w}
      height={m.h}
      className={className}
      style={style}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      onLoad={onLoad}
    />
  );
}
