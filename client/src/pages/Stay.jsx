import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icons.jsx';
import Img from '../components/Img.jsx';
import { ROOMS, SITE, TARIFFS } from '../data/site.js';
import { waLink } from '../lib/whatsapp.js';
import { useParallax } from '../hooks/useParallax.js';

function StayRoomCard({ room }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImg = room.images[activeIdx] || room.images[0];
  const priceDisplay = room.price ? `₹ ${Number(room.price).toLocaleString('en-IN')}` : '₹ 10,000';

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
        <span className="stay-room-badge-pill">Free Breakfast</span>
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
            <span>Up to 6 Guests</span>
          </div>
        </div>

        {/* Price Row */}
        <div className="stay-room-pricing">
          <div className="stay-room-price-stack">
            <span className="stay-room-price-val">{priceDisplay}</span>
            <span className="stay-room-price-sub">/ nt (Mon–Fri)</span>
          </div>
          <span className="stay-room-price-weekend">₹ 12,000 / nt (Sat–Sun)</span>
        </div>
        <p className="stay-room-tariff-note">Flat tariff covers 1 to 6 people with free breakfast</p>

        {/* WhatsApp Booking Button */}
        <a
          href={waLink(`Hello Ramesh! I would like to enquire about staying at Sai Ranga Shores (${room.title}). We have 1 to 6 guests.`)}
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
            <span className="stay-hero-eyebrow">— COASTAL ACCOMMODATIONS NEAR PONDICHERRY ON ECR —</span>
            <h1 className="stay-hero-heading">
              Sea View Rooms
              <span className="stay-hero-heading-sub">near Pondicherry on ECR</span>
            </h1>
            <p className="stay-hero-subtext">
              Wake up to panoramic ocean views, soothing surf, and gentle sea breezes. Explore our spacious rooms near the beach on ECR, near Pondicherry at Sai Ranga Shores.
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
              Sai Ranga Shores Beach Home Stay offers a peaceful and comfortable stay just steps away from the beach near Pondicherry on ECR. Located 40 kms before Pondicherry (a drive of 45 minutes to 1 hour depending on traffic and speed), our private beach home is surrounded by nature and the calming sound of waves—ideal for relaxing and recharging for up to 6 guests.
            </p>

            <div className="stay-prop-features-grid">
              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="beach" size={26} />
                </div>
                <span className="stay-prop-feat-name">Near Pondicherry on ECR</span>
              </div>

              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="road" size={26} />
                </div>
                <span className="stay-prop-feat-name">40 kms Before Pondicherry</span>
              </div>

              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="clock" size={26} />
                </div>
                <span className="stay-prop-feat-name">In: 11 AM | Out: 10 AM</span>
              </div>

              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="nopets" size={26} />
                </div>
                <span className="stay-prop-feat-name">No Pets Allowed</span>
              </div>

              <div className="stay-prop-feat">
                <div className="stay-prop-feat-ico">
                  <Icon name="coffee" size={26} />
                </div>
                <span className="stay-prop-feat-name">Free Breakfast</span>
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
            <span className="stay-eyebrow-accent">— OUR ACCOMMODATIONS &amp; TARIFFS —</span>
            <h2 className="stay-rooms-title">Beach Home Stays &amp; Sea View Rooms</h2>
            <p className="stay-rooms-desc">
              Experience the tranquility of a private beachfront retreat near Pondicherry on ECR. Sai Ranga Shores offers transparent tariffs with complimentary breakfast, accommodating up to 6 guests comfortably.
            </p>
          </Reveal>

          {/* Official Transparent Tariff Card */}
          <Reveal delay={60} className="stay-tariff-banner">
            <div className="stay-tariff-header">
              <div className="stay-tariff-title-group">
                <span className="stay-tariff-badge">OFFICIAL TARIFF &amp; RATES</span>
                <h3 className="stay-tariff-title">Clear, Transparent Beach Home Rates</h3>
                <p className="stay-tariff-subtitle">
                  Both weekday and weekend tariffs accommodate <strong>1 to 6 people</strong> with <strong>complimentary breakfast</strong> included.
                </p>
                <div className="stay-location-badge-strip">
                  <span className="stay-loc-chip">
                    <Icon name="pin" size={14} /> Near Pondicherry on ECR
                  </span>
                  <span className="stay-loc-chip stay-loc-chip--dist">
                    <Icon name="road" size={14} /> 40 kms before Pondicherry (45m–1h drive)
                  </span>
                </div>
              </div>
              <div className="stay-tariff-cap-group">
                <div className="stay-tariff-cap-pill">
                  <Icon name="guests" size={18} />
                  <span>Max Capacity: <strong>6 People</strong></span>
                </div>
                <div className="stay-rules-mini-pills">
                  <span className="stay-rule-pill">
                    <Icon name="clock" size={14} /> Check-in: <strong>11:00 AM</strong>
                  </span>
                  <span className="stay-rule-pill">
                    <Icon name="clock" size={14} /> Check-out: <strong>10:00 AM</strong>
                  </span>
                  <span className="stay-rule-pill stay-rule-pill--nopets">
                    <Icon name="nopets" size={14} /> <strong>No Pets Allowed</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="stay-tariff-grid">
              {/* Working Days Card */}
              <div className="stay-tariff-card stay-tariff-card--weekday">
                <div className="stay-tariff-top">
                  <span className="stay-tariff-tag">Working Days (Mon – Fri)</span>
                  <div className="stay-tariff-price">
                    <span className="stay-tariff-currency">₹</span>
                    <strong className="stay-tariff-amount">10,000</strong>
                    <span className="stay-tariff-period">/ night</span>
                  </div>
                </div>
                <ul className="stay-tariff-features">
                  <li>
                    <Icon name="coffee" size={16} className="stay-tariff-ico" />
                    <span><strong>Free Breakfast</strong> included</span>
                  </li>
                  <li>
                    <Icon name="guests" size={16} className="stay-tariff-ico" />
                    <span>Flat rate for <strong>1 to 6 people</strong></span>
                  </li>
                  <li>
                    <Icon name="clock" size={16} className="stay-tariff-ico" />
                    <span>Check-in: <strong>11:00 AM</strong> | Check-out: <strong>10:00 AM</strong></span>
                  </li>
                  <li>
                    <Icon name="sea" size={16} className="stay-tariff-ico" />
                    <span>Full beach home &amp; sea-view rooms</span>
                  </li>
                </ul>
              </div>

              {/* Weekend Card */}
              <div className="stay-tariff-card stay-tariff-card--weekend">
                <div className="stay-tariff-top">
                  <span className="stay-tariff-tag stay-tariff-tag--popular">Saturday &amp; Sunday (Weekends)</span>
                  <div className="stay-tariff-price">
                    <span className="stay-tariff-currency">₹</span>
                    <strong className="stay-tariff-amount">12,000</strong>
                    <span className="stay-tariff-period">/ night</span>
                  </div>
                </div>
                <ul className="stay-tariff-features">
                  <li>
                    <Icon name="coffee" size={16} className="stay-tariff-ico" />
                    <span><strong>Breakfast Included</strong> on weekends</span>
                  </li>
                  <li>
                    <Icon name="guests" size={16} className="stay-tariff-ico" />
                    <span>Flat rate for <strong>1 to 6 people</strong></span>
                  </li>
                  <li>
                    <Icon name="clock" size={16} className="stay-tariff-ico" />
                    <span>Check-in: <strong>11:00 AM</strong> | Check-out: <strong>10:00 AM</strong></span>
                  </li>
                  <li>
                    <Icon name="roof" size={16} className="stay-tariff-ico" />
                    <span>360° observation tower pavilion</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Crucial Contact & GPay Quick Strip */}
            <div className="stay-tariff-footer">
              <a href="tel:+919940038374" className="stay-tariff-contact-pill">
                <Icon name="phone" size={16} />
                <span>Ramesh: <strong>+91 99400 38374</strong> (Cell &amp; WhatsApp)</span>
              </a>
              <div className="stay-tariff-contact-pill">
                <Icon name="gpay" size={16} />
                <span>GPay / UPI: <strong>99400 38363</strong></span>
              </div>
              <a href="mailto:rameshadiant@gmail.com" className="stay-tariff-contact-pill">
                <Icon name="mail" size={16} />
                <span><strong>rameshadiant@gmail.com</strong></span>
              </a>
              <div className="stay-tariff-contact-pill stay-tariff-contact-pill--pets">
                <Icon name="nopets" size={16} />
                <span>Strict Policy: <strong>No Pets Allowed</strong></span>
              </div>
            </div>
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
