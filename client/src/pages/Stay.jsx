import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icons.jsx';
import Img from '../components/Img.jsx';
import { ROOMS } from '../data/site.js';
import { waLink } from '../lib/whatsapp.js';
import { useParallax } from '../hooks/useParallax.js';

function StayRoomCard({ room }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImg = room.images[activeIdx] || room.images[0];
  const priceDisplay = room.price ? `₹ ${Number(room.price).toLocaleString('en-IN')}` : 'On Request';

  return (
    <article className="stay-room-card">
      {/* Main Large Image */}
      <div className="stay-room-main-frame">
        <Img
          name={activeImg.name}
          alt={activeImg.alt || room.title}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="stay-room-main-img"
        />
        <div className="stay-room-overlay-glare" />
      </div>

      {/* 4 Mini Thumbnails Row */}
      <div className="stay-room-thumbs" role="tablist" aria-label={`${room.title} photo gallery`}>
        {room.images.slice(0, 4).map((img, idx) => (
          <button
            key={img.name + idx}
            type="button"
            role="tab"
            aria-selected={idx === activeIdx}
            className={`stay-room-thumb-btn ${idx === activeIdx ? 'is-active' : ''}`}
            onClick={() => setActiveIdx(idx)}
            aria-label={`View photo ${idx + 1} of ${room.title}`}
          >
            <Img name={img.name} alt="" sizes="100px" className="stay-room-thumb-img" />
          </button>
        ))}
      </div>

      {/* Card Body */}
      <div className="stay-room-body">
        <h3 className="stay-room-title">{room.title}</h3>
        <p className="stay-room-blurb">{room.blurb}</p>

        {/* Specs Row */}
        <div className="stay-room-specs">
          <div className="stay-room-spec-pill">
            <Icon name="bed" size={17} className="stay-room-spec-ico" />
            <span>{room.bed}</span>
          </div>
          <div className="stay-room-spec-pill">
            <Icon name="guests" size={17} className="stay-room-spec-ico" />
            <span>{room.guests}</span>
          </div>
        </div>

        {/* Price Row */}
        <div className="stay-room-pricing">
          <span className="stay-room-price-val">{priceDisplay}</span>
          <span className="stay-room-price-sub">/ night</span>
        </div>

        {/* WhatsApp Booking Button */}
        <a
          href={waLink(`Hello Sai Ranga Shores! I would like to enquire about booking the ${room.title}.`)}
          target="_blank"
          rel="noreferrer"
          className="stay-room-wa-btn"
        >
          <Icon name="whatsapp" size={18} className="stay-room-wa-ico" />
          <span>WhatsApp Enquiry</span>
        </a>
      </div>
    </article>
  );
}

export default function Stay() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const heroParallax = useParallax(0.12);
  const ctaParallax = useParallax(0.1);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div className="stay-page-wrapper">
      {/* ──────────────────────────────────────────────────────────
          1. FULL-WIDTH HERO SECTION (WITH HIGH-QUALITY AUTOPLAY VIDEO)
      ────────────────────────────────────────────────────────── */}
      <section className="stay-hero" aria-label="Welcome to Sai Ranga Shores">
        <div className="stay-hero-bg" ref={heroParallax}>
          <video
            ref={videoRef}
            src="/video/stay.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="stay-hero-video"
          />
          <Img
            name="palms-sea"
            alt="Sai Ranga Shores Beach Home Stay"
            sizes="100vw"
            eager
            className="stay-hero-img stay-hero-img--fallback"
          />
          <div className="stay-hero-scrim" />
        </div>

        {/* Ambient Video Sound Control Badge */}
        <button
          type="button"
          className="stay-hero-sound-toggle"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          <Icon name={isMuted ? 'mute' : 'sound'} size={18} />
          <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>

        <div className="container stay-hero-container">
          <div className="stay-hero-content">
            <span className="stay-hero-eyebrow">— WELCOME TO —</span>
            <h1 className="stay-hero-heading">
              Sai Ranga Shores
              <span className="stay-hero-heading-sub">Beach Home Stay</span>
            </h1>
            <p className="stay-hero-subtext">
              Wake up to the sound of waves, unwind by the shore, and experience the perfect beach holiday.
            </p>
            <a
              href={waLink('Hello Sai Ranga Shores! I would like to enquire about room booking and availability.')}
              target="_blank"
              rel="noreferrer"
              className="stay-hero-cta"
            >
              <Icon name="whatsapp" size={20} className="stay-hero-wa-ico" />
              <span>WhatsApp Enquiry</span>
              <Icon name="arrow" size={16} className="stay-hero-arrow-ico" />
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. ABOUT OUR PROPERTY SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="stay-property-section">
        <div className="container stay-property-grid">
          {/* Left: Artistic painterly masked resort visual */}
          <Reveal className="stay-property-visual">
            <div className="stay-painterly-mask-wrapper">
              <Img
                name="img-0125"
                alt="Sai Ranga Shores Beachside Retreat"
                sizes="(max-width: 900px) 100vw, 50vw"
                className="stay-painterly-photo"
              />
              <div className="stay-painterly-edge-effect" />
            </div>
          </Reveal>

          {/* Right: Copy & 4 Feature Badges */}
          <Reveal delay={120} className="stay-property-info">
            <span className="stay-sub-eyebrow">ABOUT OUR PROPERTY</span>
            <h2 className="stay-property-title">A Serene Beachside Retreat</h2>
            <p className="stay-property-text">
              Sai Ranga Shores Beach Home Stay offers a peaceful and comfortable stay just steps away from the beach. Surrounded by nature and the calming sound of the waves, it's the perfect place to relax, recharge and create lasting memories.
            </p>

            <div className="stay-prop-features-grid">
              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="beach" size={26} />
                </div>
                <span className="stay-prop-feat-name">Beachside Location</span>
              </div>

              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="leaf" size={26} />
                </div>
                <span className="stay-prop-feat-name">Peaceful Environment</span>
              </div>

              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="home" size={26} />
                </div>
                <span className="stay-prop-feat-name">Comfortable Stay</span>
              </div>

              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="heart" size={26} />
                </div>
                <span className="stay-prop-feat-name">Warm Hospitality</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          3. OUR ROOMS SECTION (3 CARDS WITH 4 THUMBNAILS EACH)
      ────────────────────────────────────────────────────────── */}
      <section className="stay-rooms-section" id="rooms">
        <div className="container">
          <Reveal className="stay-rooms-head">
            <span className="stay-eyebrow-accent">— OUR ROOMS —</span>
            <h2 className="stay-rooms-title">Comfortable Stays for Every Guest</h2>
            <p className="stay-rooms-desc">
              Choose from our well-appointed rooms, designed for comfort and a relaxing beachside experience.
            </p>
          </Reveal>

          <div className="stay-rooms-grid">
            {ROOMS.map((room, idx) => (
              <Reveal key={room.id} delay={idx * 140}>
                <StayRoomCard room={room} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. MOMENTS AT SAI RANGA SHORES (GALLERY STRIP)
      ────────────────────────────────────────────────────────── */}
      <section className="stay-gallery-strip-section" aria-label="Moments Gallery">
        <div className="container stay-gallery-strip-container">
          {/* 4 Panoramic Photos Side-by-Side */}
          <Reveal className="stay-gallery-photos-row">
            <div className="stay-strip-photo-item">
              <Img name="palms-sea" alt="Pondicherry coastal beach and palm trees" sizes="(max-width: 900px) 50vw, 25vw" className="stay-strip-img" />
              <div className="stay-strip-overlay" />
            </div>
            <div className="stay-strip-photo-item">
              <Img name="img-4941" alt="Sea view suite room interior and panoramic windows" sizes="(max-width: 900px) 50vw, 25vw" className="stay-strip-img" />
              <div className="stay-strip-overlay" />
            </div>
            <div className="stay-strip-photo-item">
              <Img name="img-2784" alt="Golden sunset silhouette on the shore" sizes="(max-width: 900px) 50vw, 25vw" className="stay-strip-img" />
              <div className="stay-strip-overlay" />
            </div>
            <div className="stay-strip-photo-item">
              <Img name="tower" alt="Sai Ranga Shores resort tower framed by coconut palms" sizes="(max-width: 900px) 50vw, 25vw" className="stay-strip-img" />
              <div className="stay-strip-overlay" />
            </div>
          </Reveal>

          {/* Centered Typography & Action */}
          <Reveal delay={120} className="stay-gallery-content">
            <span className="stay-gallery-eyebrow">— GALLERY —</span>
            <h2 className="stay-gallery-heading">Moments at Sai Ranga Shores</h2>
            <p className="stay-gallery-subtext">
              Explore the beauty, comfort and serenity of our beach home stay.
            </p>
            <Link to="/gallery" className="stay-gallery-link-btn">
              <span>View Gallery</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. LOCATION & EXPERIENCES SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="stay-exp-section">
        <div className="container stay-exp-grid">
          {/* Left Column: Heading, intro, and 4 circular icon badge cards */}
          <Reveal className="stay-exp-left">
            <span className="stay-sub-eyebrow">LOCATION & EXPERIENCES</span>
            <h2 className="stay-exp-title">More Than Just a Stay</h2>
            <p className="stay-exp-intro">
              From peaceful beach walks to local explorations, Sai Ranga Shores is the perfect base to explore the natural beauty and culture of the region.
            </p>

            <div className="stay-exp-pills-row">
              <div className="stay-exp-pill-card">
                <div className="stay-exp-pill-circle">
                  <Icon name="beach" size={24} />
                </div>
                <h3 className="stay-exp-pill-name">Beach Walks</h3>
                <p className="stay-exp-pill-desc">Feel the sand between your toes</p>
              </div>

              <div className="stay-exp-pill-card">
                <div className="stay-exp-pill-circle">
                  <Icon name="camera" size={24} />
                </div>
                <h3 className="stay-exp-pill-name">Photography</h3>
                <p className="stay-exp-pill-desc">Capture beautiful moments</p>
              </div>

              <div className="stay-exp-pill-card">
                <div className="stay-exp-pill-circle">
                  <Icon name="sun" size={24} />
                </div>
                <h3 className="stay-exp-pill-name">Sunrise & Sunset</h3>
                <p className="stay-exp-pill-desc">Witness nature's best views</p>
              </div>

              <div className="stay-exp-pill-card">
                <div className="stay-exp-pill-circle">
                  <Icon name="compass" size={24} />
                </div>
                <h3 className="stay-exp-pill-name">Local Exploration</h3>
                <p className="stay-exp-pill-desc">Discover nearby attractions and culture</p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Scenic painterly framed beach visual */}
          <Reveal delay={140} className="stay-exp-right">
            <div className="stay-exp-painterly-frame">
              <Img
                name="boat"
                alt="Sai Ranga Shores Beach and Coastal Sea View"
                sizes="(max-width: 900px) 100vw, 50vw"
                className="stay-exp-painterly-photo"
              />
              <div className="stay-exp-edge-glow" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          6. PLAN YOUR STAY TODAY (CTA BANNER)
      ────────────────────────────────────────────────────────── */}
      <section className="stay-cta-section">
        <div className="container">
          <Reveal className="stay-cta-banner">
            <div className="stay-cta-bg" ref={ctaParallax}>
              <Img name="beach-pano" alt="" sizes="100vw" className="stay-cta-bg-img" />
              <div className="stay-cta-scrim" />
            </div>

            <div className="stay-cta-content">
              <div className="stay-cta-text">
                <span className="stay-cta-eyebrow">YOUR BEACH ESCAPE AWAITS</span>
                <h2 className="stay-cta-heading">Plan Your Stay Today</h2>
                <p className="stay-cta-subtext">
                  Experience the charm of Sai Ranga Shores. Let us make your beach holiday special.
                </p>
              </div>

              <div className="stay-cta-action">
                <a
                  href={waLink('Hello Sai Ranga Shores! I would like to plan my stay and check room availability.')}
                  target="_blank"
                  rel="noreferrer"
                  className="stay-cta-wa-btn"
                >
                  <Icon name="whatsapp" size={20} className="stay-cta-wa-ico" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
