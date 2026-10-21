import { useState, useEffect, useCallback, useRef } from 'react';
import Icon from './Icons.jsx';
import Img from './Img.jsx';
import { Frond, CurvedArrow, ScribbleUnderline, Seagulls } from './Decor.jsx';
import BookingBar from './BookingBar.jsx';

// 6 Curated Real Photos of Sai Ranga Shores for the 3D Cylindrical Orbit
const CYLINDER_PHOTOS = [
  {
    id: 'img-9382-effects',
    name: 'img-9382-effects',
    title: 'Panoramic Dawn Sky',
    tag: 'Terrace & Ocean',
    alt: 'Panoramic morning dawn over Sai Ranga Shores white rooftop and the sea',
  },
  {
    id: 'img-4941',
    name: 'img-4941',
    title: 'Sea-View Suite',
    tag: 'Panoramic Bedroom',
    alt: 'Spacious suite with wraparound glass windows overlooking coconut palms and the sea',
  },
  {
    id: 'img-0125',
    name: 'img-0125',
    title: 'Sai Ranga Shores',
    tag: 'Driveway & Tower',
    alt: 'Sai Ranga Shores entrance, parking driveway and viewing tower',
  },
  {
    id: 'img-3413',
    name: 'img-3413',
    title: 'Golden Sunrise',
    tag: 'Sea Horizon',
    alt: 'Golden morning sunrise reflecting on the ocean through coconut palms',
  },
  {
    id: 'img-0094',
    name: 'img-0094',
    title: 'Coastline Panorama',
    tag: 'Steps to Sand',
    alt: 'Sweeping coastal beach panorama with fishing boats and rolling waves',
  },
  {
    id: 'img-0243',
    name: 'img-0243',
    title: 'Moonlit Shoreline',
    tag: 'Night Ambiance',
    alt: 'Silver moonlight sparkling across gentle ocean surf at night',
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = CYLINDER_PHOTOS.length;
  const touchStartXRef = useRef(null);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Smooth automatic rotation: moves to next card every 3.5 seconds
  // Zooming in the active card and rotating continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  // Touch swipe handling for mobile devices
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    if (e.changedTouches && e.changedTouches[0]) {
      const diff = e.changedTouches[0].clientX - touchStartXRef.current;
      if (diff > 40) {
        prevCard();
      } else if (diff < -40) {
        nextCard();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section className="hero-modern" aria-labelledby="hero-title">
      {/* Botanical Palm Fronds in Corners */}
      <Frond className="hero-decor-frond hero-decor-frond--tl" seed={5} color="#1d4d3a" />
      <Frond className="hero-decor-frond hero-decor-frond--tr" seed={9} color="#1d4d3a" />

      <div className="container hero-modern-container">
        {/* Coastal Seagulls in Sky */}
        <Seagulls className="hero-seagulls" color="#02485D" />

        {/* Main 2-Column Grid */}
        <div className="hero-modern-grid">
          {/* Left Column: Heading, Cursive Title, Description & Button */}
          <div className="hero-modern-left">
            <p className="hero-eyebrow">— BEACHFRONT RESORT NEAR PONDICHERRY ON ECR —</p>

            <h1 id="hero-title" className="hero-main-title">
              <span>Sai Ranga Shores</span>
              <span className="hero-title-script">
                Beach Home
                <ScribbleUnderline className="hero-scribble" />
              </span>
            </h1>

            <p className="hero-main-desc">
              Wake up to the sound of waves, enjoy warm hospitality and create unforgettable memories at our beach resort near Pondicherry on ECR. Experience a peaceful seaside beach house retreat just steps from virgin sands.
            </p>

            <div className="hero-cta-wrap">
              <a href="#about" className="btn btn--terracotta hero-primary-btn">
                Explore Our Resort <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Cylindrical Rotating Photo Showcase */}
          <div className="hero-modern-right">
            <div
              className="cylinder-stage-wrap"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Elliptical 3D cylindrical orbit track rings */}
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
                      onClick={() => setActiveIndex(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${item.title} (${isFront ? 'Active in front' : 'Click to rotate to front'})`}
                      title={`Rotate to: ${item.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveIndex(idx);
                        }
                      }}
                    >
                      <div className="cylinder-img-box">
                        <Img
                          name={item.name}
                          alt={item.alt}
                          sizes={isFront ? '(max-width: 768px) 70vw, 380px' : '(max-width: 768px) 40vw, 280px'}
                          eager={Math.abs(offset) <= 1}
                        />
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
                  More
                  <br />
                  than just
                  <br />
                  a stay
                </span>
                <span className="cylinder-note-heart">♡</span>
                <CurvedArrow className="cylinder-note-arrow" />
              </div>
            </div>

            {/* 6 Pagination Dots with Active indicator */}
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
          </div>
        </div>

        {/* Floating Booking Bar directly below the hero grid */}
        <div className="hero-modern-booking-wrap">
          <BookingBar />
        </div>
      </div>
    </section>
  );
}
