import { useCallback, useEffect, useRef, useState } from 'react';
import Img from './Img.jsx';
import Icon from './Icons.jsx';
import { GALLERY, GALLERY_FILTERS } from '../data/site.js';
import { waLink } from '../lib/whatsapp.js';

const FILTER_ICONS = {
  'All': 'spark',
  'Resort & Tower': 'home',
  'Rooms': 'bed',
  'Sea & Beach': 'sea',
  'Sunrise & Sunset': 'sun',
  'Night & Moon': 'compass',
  'Garden': 'leaf',
};

export default function GalleryGrid() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(-1);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const items = GALLERY.filter((g) => filter === 'All' || g.cat === filter);

  const show = (i) => {
    lastFocus.current = document.activeElement;
    setOpen(i);
  };

  const close = useCallback(() => {
    setOpen(-1);
    lastFocus.current?.focus?.();
  }, []);

  const step = useCallback(
    (d) => setOpen((o) => (o + d + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (open < 0) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const key = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('keydown', key);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--rx', `${-y * 10}deg`);
    card.style.setProperty('--ry', `${x * 10}deg`);
    card.style.setProperty('--spot-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--spot-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
    card.style.removeProperty('--spot-x');
    card.style.removeProperty('--spot-y');
  };

  const cur = items[open];

  return (
    <div className="gallery-section-wrap">
      {/* Category Filter Chips Bar */}
      <div className="gallery-filter-bar">
        <div className="chips gallery-chips" role="tablist" aria-label="Gallery collections">
          {GALLERY_FILTERS.map((f) => {
            const count = f === 'All' ? GALLERY.length : GALLERY.filter((g) => g.cat === f).length;
            const iconName = FILTER_ICONS[f] || 'camera';
            const isActive = filter === f;

            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`chip gallery-chip ${isActive ? 'is-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                <span className="gallery-chip-icon">
                  <Icon name={iconName} size={15} />
                </span>
                <span className="gallery-chip-label">{f}</span>
                <span className="gallery-chip-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Collection Stats Bar */}
        <div className="gallery-stats-bar">
          <span className="gallery-stats-item">
            <span className="gallery-stats-dot" />
            Showing <strong>{items.length}</strong> photos in <em>{filter}</em>
          </span>
          <span className="gallery-stats-hint">
            <Icon name="zoom" size={14} /> Tap any image to view in full resolution
          </span>
        </div>
      </div>

      {/* Masonry Bento Gallery Grid */}
      <div className="masonry gallery-masonry" key={filter}>
        {items.map((g, i) => (
          <button
            key={g.name}
            type="button"
            className="masonry-item gallery-card"
            style={{ '--i': i }}
            onClick={() => show(i)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label={`Open photo: ${g.alt}`}
          >
            <div className="gallery-card-inner">
              <Img
                name={g.name}
                alt={g.alt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="gallery-card-img"
              />

              {/* Floating Top Elements */}
              <div className="gallery-card-topbar">
                <span className="gallery-card-badge">
                  <span className="gallery-badge-pulse" />
                  {g.cat}
                </span>
                <span className="gallery-card-zoom-btn" title="Expand view">
                  <Icon name="zoom" size={15} />
                </span>
              </div>

              {/* Frosted Glass Caption Scrim */}
              <div className="gallery-card-scrim">
                <p className="gallery-card-title">{g.alt}</p>
                <span className="gallery-card-cta">
                  <span>View Full Photo</span>
                  <Icon name="arrow" size={12} />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Cinematic High-End Lightbox Modal */}
      {cur && (
        <div
          className="lightbox gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
        >
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Lightbox Header Bar */}
            <div className="lightbox-header">
              <div className="lightbox-tag">
                <Icon name={FILTER_ICONS[cur.cat] || 'camera'} size={15} />
                <span>{cur.cat}</span>
              </div>

              <div className="lightbox-counter">
                <span>{open + 1}</span> / <span>{items.length}</span>
              </div>

              <button
                ref={closeRef}
                type="button"
                className="lb-btn lb-close"
                aria-label="Close photo viewer"
                onClick={close}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {/* Lightbox Image Viewport with Floating Prev/Next Buttons */}
            <div className="lightbox-viewport">
              <button
                type="button"
                className="lb-btn lb-prev"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
              >
                <Icon name="left" size={22} />
              </button>

              <figure className="lightbox-figure" key={cur.name}>
                <Img name={cur.name} alt={cur.alt} sizes="94vw" eager className="lightbox-main-img" />
              </figure>

              <button
                type="button"
                className="lb-btn lb-next"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
              >
                <Icon name="right" size={22} />
              </button>
            </div>

            {/* Lightbox Footer Bar with WhatsApp Inquiry Action */}
            <div className="lightbox-footer">
              <div className="lightbox-info">
                <p className="lightbox-title">{cur.alt}</p>
                <span className="lightbox-keyboard-hint">
                  Use <kbd>←</kbd> <kbd>→</kbd> keys to browse • <kbd>ESC</kbd> to close
                </span>
              </div>

              <a
                href={waLink(`Hello Sai Ranga Shores! I loved this photo ("${cur.alt}") in your gallery and would like to know more about booking a stay.`)}
                target="_blank"
                rel="noreferrer"
                className="lightbox-wa-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon name="whatsapp" size={17} />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
