import { useState, useEffect, useCallback, useRef } from 'react';
import Icon from './Icons.jsx';
import Img from './Img.jsx';
import { CurvedArrow } from './Decor.jsx';

// 6 Curated Real Photos of Sai Ranga Shores for the 3D Cylindrical Orbit
const CYLINDER_PHOTOS = [
  {
    id: 'img-9382-effects',
    name: 'img-9382-effects',
    title: 'Panoramic Dawn Sky',
    tag: 'Terrace & Ocean',
    caption: 'Golden morning light breaking over the rooftop and Bay of Bengal',
    alt: 'Panoramic morning dawn over Sai Ranga Shores white rooftop and the sea',
  },
  {
    id: 'img-4941',
    name: 'img-4941',
    title: 'Sea-View Suite',
    tag: 'Panoramic Bedroom',
    caption: 'Airy sanctuary with wraparound windows and coastal breeze',
    alt: 'Spacious suite with wraparound glass windows overlooking coconut palms and the sea',
  },
  {
    id: 'img-0125',
    name: 'img-0125',
    title: 'Sai Ranga Shores',
    tag: 'Driveway & Tower',
    caption: 'Private beachfront property with secure car parking and viewing tower',
    alt: 'Sai Ranga Shores entrance, parking driveway and viewing tower',
  },
  {
    id: 'img-3413',
    name: 'img-3413',
    title: 'Golden Sunrise',
    tag: 'Sea Horizon',
    caption: 'Watching dawn illuminate the water through swaying palms',
    alt: 'Golden morning sunrise reflecting on the ocean through coconut palms',
  },
  {
    id: 'img-0094',
    name: 'img-0094',
    title: 'Coastline Panorama',
    tag: 'Steps to Sand',
    caption: 'Unspoiled shoreline with fishing catamarans and rolling waves',
    alt: 'Sweeping coastal beach panorama with fishing boats and rolling waves',
  },
  {
    id: 'img-0243',
    name: 'img-0243',
    title: 'Moonlit Shoreline',
    tag: 'Night Ambiance',
    caption: 'Peaceful evenings listening to silver waves under the night sky',
    alt: 'Silver moonlight sparkling across gentle ocean surf at night',
  },
];

export default function CylinderShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const touchStartXRef = useRef(null);

  const total = CYLINDER_PHOTOS.length;

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Smooth auto-rotation every 4.2 seconds when not hovered and lightbox closed
  useEffect(() => {
    if (isHovered || lightboxImg) return;
    const timer = setInterval(nextCard, 4200);
    return () => clearInterval(timer);
  }, [isHovered, lightboxImg, nextCard]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    if (e.changedTouches && e.changedTouches[0]) {
      const diff = e.changedTouches[0].clientX - touchStartXRef.current;
      if (diff > 45) {
        prevCard();
      } else if (diff < -45) {
        nextCard();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      className="cylinder-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="cylinder-stage-wrap"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrow Controls */}
        <button
          type="button"
          className="cylinder-nav-btn cylinder-nav-btn--prev"
          onClick={prevCard}
          aria-label="Previous photo"
          title="Previous photo"
        >
          <Icon name="arrow" size={20} className="cylinder-nav-icon--flip" />
        </button>

        <button
          type="button"
          className="cylinder-nav-btn cylinder-nav-btn--next"
          onClick={nextCard}
          aria-label="Next photo"
          title="Next photo"
        >
          <Icon name="arrow" size={20} />
        </button>

        {/* Elliptical 3D cylindrical orbit track */}
        <div className="cylinder-orbit-ring" aria-hidden="true" />
        <div className="cylinder-orbit-ring-outer" aria-hidden="true" />

        {/* 3D Cylindrical Stage containing the rotating cards */}
        <div className="cylinder-stage">
          {CYLINDER_PHOTOS.map((item, idx) => {
            // Compute shortest relative offset from the active card
            let offset = (idx - activeIndex) % total;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isFront = offset === 0;

            // Determine 3D cylindrical position class
            let posClass = 'cylinder-card--back';
            if (offset === 0) posClass = 'cylinder-card--front';
            else if (offset === 1) posClass = 'cylinder-card--right-1';
            else if (offset === -1) posClass = 'cylinder-card--left-1';
            else if (offset === 2) posClass = 'cylinder-card--right-2';
            else if (offset === -2) posClass = 'cylinder-card--left-2';

            return (
              <div
                key={item.id}
                className={`cylinder-card ${posClass} ${isFront ? 'is-front' : ''}`}
                onClick={() => {
                  if (isFront) {
                    setLightboxImg(item);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${item.title} (${isFront ? 'Active in front, click to zoom' : 'Click to bring to front'})`}
                title={isFront ? `Click to enlarge: ${item.title}` : `Rotate to: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (isFront) setLightboxImg(item);
                    else setActiveIndex(idx);
                  }
                }}
              >
                <div className="cylinder-img-box">
                  <Img
                    name={item.name}
                    alt={item.alt}
                    sizes={isFront ? '(max-width: 768px) 70vw, 420px' : '(max-width: 768px) 40vw, 300px'}
                    eager={Math.abs(offset) <= 1}
                  />
                  {isFront && (
                    <span className="cylinder-zoom-hint" aria-hidden="true">
                      🔍 Click to zoom
                    </span>
                  )}
                </div>

                <div className="cylinder-card-footer">
                  <span className="cylinder-card-title">{item.title}</span>
                  <span className="cylinder-card-tag">{item.tag}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Handwritten Note & Arrow Accent */}
        <div className="cylinder-note-badge" aria-hidden="true">
          <span className="cylinder-note-text">
            Real Moments
            <br />
            Real Stays
          </span>
          <span className="cylinder-note-heart">♡</span>
          <CurvedArrow className="cylinder-note-arrow" />
        </div>
      </div>

      {/* Pagination Dots with Active indicator */}
      <div className="cylinder-dots" role="tablist" aria-label="Photo carousel items">
        {CYLINDER_PHOTOS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={idx === activeIndex}
            aria-label={`Slide ${idx + 1}: ${item.title}`}
            className={`cylinder-dot ${idx === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Modal when clicking front card */}
      {lightboxImg && (
        <div
          className="cylinder-lightbox-backdrop"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImg.title}
        >
          <div
            className="cylinder-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cylinder-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image popup"
            >
              ✕
            </button>
            <div className="cylinder-lightbox-img-wrap">
              <Img
                name={lightboxImg.name}
                alt={lightboxImg.alt}
                sizes="90vw"
                eager
              />
            </div>
            <div className="cylinder-lightbox-details">
              <h3 className="cylinder-lightbox-title">{lightboxImg.title}</h3>
              <p className="cylinder-lightbox-caption">{lightboxImg.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
