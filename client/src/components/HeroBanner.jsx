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

// 4 Highlights Cards for the smooth moving horizontal scroll showcase
const HIGHLIGHT_CARDS = [
  {
    id: 'tariff',
    theme: 'tariff',
    icon: 'coffee',
    iconWrapClass: 'hero-feat-icon-wrap--coffee',
    badgeText: 'Breakfast Included',
    badgeClass: 'hero-feat-badge--green',
    kicker: 'TRANSPARENT TARIFFS',
    hasRateLine: true,
    heading: '',
    desc: 'Mon–Fri ₹10k & Sat–Sun ₹12k with complimentary morning breakfast.',
  },
  {
    id: 'villa',
    theme: 'villa',
    icon: 'home',
    iconWrapClass: 'hero-feat-icon-wrap--home',
    badgeText: 'Entire Beach House',
    badgeClass: 'hero-feat-badge--teal',
    kicker: 'PRIVATE RETREAT',
    hasRateLine: false,
    heading: 'Up to 6 Guests Max',
    desc: 'Flat tariff covers 1 to 6 people. Complete private seaside villa stay.',
  },
  {
    id: 'rules',
    theme: 'rules',
    icon: 'clock',
    iconWrapClass: 'hero-feat-icon-wrap--clock',
    badgeText: 'No Pets',
    hasNoPetsIcon: true,
    badgeClass: 'hero-feat-badge--nopets',
    kicker: 'STAY TIMINGS & RULES',
    hasRateLine: false,
    heading: 'In: 11:00 AM · Out: 10:00 AM',
    desc: 'Relaxed 11 AM check-in, 10 AM check-out. Strictly no pets on property.',
  },
  {
    id: 'location',
    theme: 'loc',
    icon: 'pin',
    iconWrapClass: 'hero-feat-icon-wrap--pin',
    badgeText: 'East Coast Road',
    badgeClass: 'hero-feat-badge--blue',
    kicker: 'COASTAL LOCATION',
    hasRateLine: false,
    heading: 'Near Pondicherry on ECR',
    desc: '40 kms before Pondicherry — a scenic 45m to 1 hour coastal drive.',
  },
];

function HighlightCardItem({ card }) {
  return (
    <div className={`hero-feat-card hero-feat-card--${card.theme}`}>
      <div className="hero-feat-top">
        <div className={`hero-feat-icon-wrap ${card.iconWrapClass}`}>
          <Icon name={card.icon} size={18} />
        </div>
        <span className={`hero-feat-badge ${card.badgeClass}`}>
          {card.hasNoPetsIcon && <Icon name="nopets" size={12} />}
          <span>{card.badgeText}</span>
        </span>
      </div>
      <div className="hero-feat-body">
        <span className="hero-feat-kicker">{card.kicker}</span>
        {card.hasRateLine ? (
          <div className="hero-feat-rate-line">
            <strong>₹10,000</strong> <span className="hero-feat-rate-sub">/ weekday</span>
            <span className="hero-feat-slash">·</span>
            <strong className="hero-feat-weekend-price">₹12,000</strong> <span className="hero-feat-rate-sub">/ weekend</span>
          </div>
        ) : (
          <h3 className="hero-feat-heading">{card.heading}</h3>
        )}
        <p className="hero-feat-desc">{card.desc}</p>
      </div>
    </div>
  );
}

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

          {/* Moving Luxury Highlights Cards (Infinite Horizontal Auto-Scroll Showcase) */}
          <div className="hero-scroll-container" aria-label="Resort Highlights and Policies">
            <div className="hero-scroll-viewport">
              <div className="hero-scroll-track">
                {/* 3 identical sets of cards for seamless, continuous infinite looping */}
                {HIGHLIGHT_CARDS.map((card) => (
                  <HighlightCardItem key={`set1-${card.id}`} card={card} />
                ))}
                {HIGHLIGHT_CARDS.map((card) => (
                  <HighlightCardItem key={`set2-${card.id}`} card={card} />
                ))}
                {HIGHLIGHT_CARDS.map((card) => (
                  <HighlightCardItem key={`set3-${card.id}`} card={card} />
                ))}
              </div>
            </div>

            {/* Subtle animated indicator hint */}
            <div className="hero-scroll-hint">
              <span className="hero-scroll-dot" />
              <span>Hover or touch cards to pause • Real-time Beach Home Highlights</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
