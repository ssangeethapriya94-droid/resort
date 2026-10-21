import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner.jsx';
import Img from '../components/Img.jsx';
import Icon from '../components/Icons.jsx';
import { Frond, Wave, Seashell, LighthouseDoodle, WaveRipple, TropicalFlower, ScribbleUnderline } from '../components/Decor.jsx';
import { ROOMS, FACILITIES, EXPERIENCES, SITE } from '../data/site.js';
import { waLink } from '../lib/whatsapp.js';

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      {/* 1. Hero Banner (Includes 3D cylindrical rotating showcase & floating booking bar) */}
      <HeroBanner />

      {/* 2. About Our Resort Section — Elevated Luxury Coastal Design */}
      <section id="about" className="home-about-section">
        {/* Coastal ambient botanical flourishes */}
        <Frond className="home-about-frond--left" seed={11} color="#1d4d3a" />
        <Frond className="home-about-frond--tr" seed={15} color="#1d4d3a" />

        <div className="container home-about-container">
          {/* Left Column: Narrative, Interactive Highlights, Stats & CTAs */}
          <div className="home-about-left">
            <div className="home-about-badge">
              <span className="home-about-badge-dot" />
              <span>About Our Resort</span>
            </div>

            <h2 className="home-about-title">
              A Peaceful Beach Home{' '}
              <span className="home-script-title">
                by the Sea
                <ScribbleUnderline className="home-about-scribble" />
              </span>
            </h2>

            <p className="home-about-lead">
              Sai Ranga Shores Beach Home is a peaceful beach resort near Pondicherry on ECR nestled along the quiet coastline. Designed for travelers seeking an authentic beachfront resort near Pondicherry on ECR, a private beach house near Pondicherry on ECR, or a relaxing coastal beach stay, our property offers spacious sea view rooms, warm homestyle hospitality, and direct steps to virgin sands.
            </p>

            {/* 4 Interactive Feature Highlights */}
            <div className="home-about-features-grid">
              <div className="home-about-feature-item">
                <div className="home-about-feat-icon home-about-feat-icon--sea">
                  <Icon name="beach" size={20} />
                </div>
                <div className="home-about-feat-text">
                  <h4 className="home-about-feat-title">Direct Beach Access</h4>
                  <p className="home-about-feat-desc">Step directly onto uncrowded sands & gentle surf.</p>
                </div>
              </div>

              <div className="home-about-feature-item">
                <div className="home-about-feat-icon home-about-feat-icon--tower">
                  <Icon name="roof" size={20} />
                </div>
                <div className="home-about-feat-text">
                  <h4 className="home-about-feat-title">Observation Tower</h4>
                  <p className="home-about-feat-desc">360° panoramic observatory for sunrise & ocean views.</p>
                </div>
              </div>

              <div className="home-about-feature-item">
                <div className="home-about-feat-icon home-about-feat-icon--grove">
                  <Icon name="garden" size={20} />
                </div>
                <div className="home-about-feat-text">
                  <h4 className="home-about-feat-title">Coconut Palm Grove</h4>
                  <p className="home-about-feat-desc">Peaceful private garden shaded by towering palms.</p>
                </div>
              </div>

              <div className="home-about-feature-item">
                <div className="home-about-feat-icon home-about-feat-icon--care">
                  <Icon name="heart" size={20} />
                </div>
                <div className="home-about-feat-text">
                  <h4 className="home-about-feat-title">Homestyle Hospitality</h4>
                  <p className="home-about-feat-desc">Dedicated caretakers ensuring personalized, peaceful stays.</p>
                </div>
              </div>
            </div>

            {/* Quick Stats Counter Chips */}
            <div className="home-about-stats-ribbon">
              <div className="home-about-stat-chip">
                <span className="home-about-stat-num">0<small>m</small></span>
                <span className="home-about-stat-lbl">To Beachfront</span>
              </div>
              <div className="home-about-stat-divider" />
              <div className="home-about-stat-chip">
                <span className="home-about-stat-num">360<small>°</small></span>
                <span className="home-about-stat-lbl">Tower Panorama</span>
              </div>
              <div className="home-about-stat-divider" />
              <div className="home-about-stat-chip">
                <span className="home-about-stat-num">4.9<small>★</small></span>
                <span className="home-about-stat-lbl">Guest Serenity</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="home-about-actions">
              <Link to="/about" className="btn btn--terracotta home-about-btn-primary">
                Our Story <Icon name="arrow" size={16} />
              </Link>
              <Link to="/stay" className="btn btn--outline-teal home-about-btn-secondary">
                Explore Rooms <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>

          {/* Right Visual Column: Refined 3-Card Curated Coastal Collage */}
          <div className="home-about-right">
            <div className="home-about-visual-stage">
              {/* Ambient radial watercolor / sunbeam glow */}
              <div className="home-about-ambient-glow" aria-hidden="true" />

              {/* Floating Trust Rating Badge (Top Header Position) */}
              <div className="home-about-float-badge home-about-float-badge--rating">
                <span className="home-about-stars">★★★★★</span>
                <span className="home-about-rating-text">4.9 • Coastal Serenity</span>
              </div>

              {/* Handwritten "Feel The Ocean Vibes ♡" note with animated wave */}
              <div className="home-about-vibe-badge" aria-hidden="true">
                <span className="home-about-vibe-text">
                  Feel
                  <br />
                  The Ocean
                  <br />
                  Vibes
                </span>
                <span className="home-about-vibe-heart">♡</span>
                <WaveRipple className="home-about-vibe-wave" color="#7DC3E2" />
              </div>

              {/* Card 2: Secondary Overlapping Card (Sea-View Suite - Top Right) */}
              <div className="home-about-photo-secondary">
                <div className="home-about-tape home-about-tape--sec" aria-hidden="true" />
                <div className="home-about-sec-inner">
                  <Img
                    name="img-4941"
                    alt="Panoramic suite with floor-to-ceiling glass windows facing coconut palms and sea"
                    sizes="(max-width: 768px) 50vw, 240px"
                  />
                  <div className="home-about-sec-caption">
                    <span className="home-about-sec-title">Sea-View Suite</span>
                    <small className="home-about-sec-sub">Wake to waves 🌊</small>
                  </div>
                </div>
              </div>

              {/* Card 3: Third Accent Card (Golden Sunrise Sands - Bottom Right) */}
              <div className="home-about-photo-tertiary">
                <div className="home-about-tape home-about-tape--ter" aria-hidden="true" />
                <div className="home-about-ter-inner">
                  <Img
                    name="img-0094"
                    alt="Golden morning sunrise reflecting on the gentle waves and virgin sandy beach"
                    sizes="(max-width: 768px) 45vw, 190px"
                  />
                  <div className="home-about-sec-caption">
                    <span className="home-about-sec-title">Sunrise Shore</span>
                    <small className="home-about-sec-sub">Steps to sand 🌅</small>
                  </div>
                </div>
              </div>

              {/* Card 1: Primary Center Feature Card (Resort Tower & Gardens) */}
              <div className="home-about-photo-primary">
                <div className="home-about-tape" aria-hidden="true" />
                <div className="home-about-card-frame">
                  <Img
                    name="tower"
                    alt="Sai Ranga Shores observation tower framed by coconut palms and sea breeze"
                    sizes="(max-width: 768px) 85vw, 420px"
                    eager
                  />

                  {/* Sleek Frosted Glass Video Tour Trigger */}
                  <button
                    type="button"
                    className="home-about-video-trigger"
                    onClick={() => setShowVideo(true)}
                    aria-label="Watch resort video tour"
                    title="Watch resort video tour"
                  >
                    <span className="home-about-play-btn-circle">
                      <Icon name="play" size={17} />
                    </span>
                    <span className="home-about-play-btn-labels">
                      <span className="home-about-play-btn-title">Watch Video Tour</span>
                      <span className="home-about-play-btn-sub">1:30 min • 360° Walkthrough</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Floating Stat Badge (Direct Beachfront - Bottom Left) */}
              <div className="home-about-float-badge home-about-float-badge--beach">
                <div className="home-about-float-ico">
                  <Icon name="beach" size={20} />
                </div>
                <div className="home-about-float-info">
                  <strong>0m Beachfront</strong>
                  <span>Direct Sand Access</span>
                </div>
              </div>

              {/* Tropical Hibiscus Flower with subtle breathing animation */}
              <TropicalFlower className="home-about-flower" size={54} />

              {/* Botanical Palm Frond with breeze sway */}
              <Frond className="home-about-frond-bottom" seed={7} color="#1d4d3a" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stay In Comfort — Our Rooms Section */}
      <section id="rooms" className="home-rooms-section">
        <Frond className="home-rooms-frond--right" seed={13} color="#1d4d3a" />
        <div className="container">
          <div className="home-section-header">
            <div>
              <p className="home-eyebrow">— COASTAL BEACH STAY ON ECR —</p>
              <h2 className="home-section-title">Sea View Rooms &amp; Suites</h2>
              <p className="home-section-sub">
                Thoughtfully designed sea view rooms near Pondicherry on ECR with modern amenities and stunning ocean vistas.
              </p>
            </div>
            <Link to="/stay" className="home-section-link">
              View All Rooms <Icon name="arrow" size={15} />
            </Link>
          </div>

          <div className="home-rooms-grid">
            {ROOMS.map((room) => (
              <div key={room.id} className="home-room-card">
                <div className="home-room-img-box">
                  <Img
                    name={room.image}
                    alt={room.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="home-room-content">
                  <h3 className="home-room-title">{room.title}</h3>

                  <div className="home-room-features">
                    <span className="home-room-feat">
                      <Icon name="guests" size={13} /> {room.guests}
                    </span>
                    <span className="home-room-feat-pipe">|</span>
                    <span className="home-room-feat">
                      <Icon name="bed" size={13} /> {room.bed}
                    </span>
                    <span className="home-room-feat-pipe">|</span>
                    <span className="home-room-feat">
                      <Icon name="sea" size={13} /> {room.view}
                    </span>
                    <span className="home-room-feat-pipe">|</span>
                    <span className="home-room-feat">
                      <Icon name="wind" size={13} /> {room.ac}
                    </span>
                    <span className="home-room-feat-pipe">|</span>
                    <span className="home-room-feat">
                      <Icon name="wifi" size={13} /> {room.wifi}
                    </span>
                  </div>

                  <div className="home-room-bottom">
                    <div className="home-room-price">
                      <span className="home-price-from">From </span>
                      <strong className="home-price-amount">₹{room.price.toLocaleString()}</strong>
                      <span className="home-price-unit"> / night</span>
                    </div>

                    <a
                      href={waLink(`Hello Sai Ranga Shores! I would like to book the ${room.title}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn--primary home-room-btn"
                    >
                      Book Now <Icon name="arrow" size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Resort Facilities Section */}
      <section id="facilities" className="home-facilities-section">
        <Frond className="home-facilities-frond home-facilities-frond--left" seed={4} color="#1d4d3a" />
        <Frond className="home-facilities-frond home-facilities-frond--right" seed={8} color="#1d4d3a" />

        <div className="container home-facilities-container">
          <div className="home-facilities-header">
            <p className="home-eyebrow">— RESORT FACILITIES —</p>
            <h2 className="home-section-title">Everything You Need for a Perfect Stay</h2>
            <Seashell className="home-facilities-shell" color="#02485D" />
          </div>

          <div className="home-facilities-grid">
            {FACILITIES.map((facility, idx) => (
              <div key={idx} className="home-facility-card">
                <div className="home-facility-icon">
                  <Icon name={facility.icon} size={28} />
                </div>
                <h4 className="home-facility-title">{facility.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Local Experiences Section */}
      <section id="experiences" className="home-experiences-section">
        <Frond className="home-experiences-frond home-experiences-frond--left" seed={9} color="#1d4d3a" />
        <Frond className="home-experiences-frond home-experiences-frond--right" seed={5} color="#1d4d3a" />

        <LighthouseDoodle className="home-exp-lighthouse" color="#02485D" />
        <WaveRipple className="home-exp-wave" color="#7DC3E2" />

        <div className="container">
          <div className="home-section-header">
            <div>
              <p className="home-eyebrow">— THINGS TO DO IN PONDICHERRY —</p>
              <h2 className="home-section-title">Explore Coastal &amp; Heritage Experiences</h2>
            </div>
            <Link to="/experiences" className="home-section-link">
              View All Experiences <Icon name="arrow" size={15} />
            </Link>
          </div>

          <div className="home-experiences-grid">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="home-exp-card">
                <div className="home-exp-img-box">
                  <Img
                    name={exp.name}
                    alt={exp.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="home-exp-body">
                  <h3 className="home-exp-title">{exp.title}</h3>
                  <p className="home-exp-desc">{exp.text}</p>
                  <Link to="/experiences" className="home-exp-link">
                    Explore <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call To Action Banner (Deep Ocean Teal) */}
      <section className="cta-ocean">
        <Wave color="var(--teal)" flip />
        <div className="cta-ocean-body">
          <Seashell className="cta-ocean-shell" color="rgba(254,254,255,0.7)" />
          <div className="cta-ocean-vibe-note" aria-hidden="true">
            <span className="cta-ocean-vibe-text">Good<br />Vibes<br />Only</span>
            <span className="cta-ocean-vibe-heart">♡</span>
          </div>

          <div className="container cta-ocean-inner">
            <p className="home-eyebrow eyebrow--light">— YOUR COASTAL GETAWAY —</p>
            <h2 className="cta-ocean-title">Ready for your seaside escape?</h2>
            <p className="cta-ocean-desc">Unwind, relax and create beautiful memories at Sai Ranga Shores.</p>
            <div className="cta-ocean-btns">
              <a
                className="btn btn--whatsapp"
                href={waLink('Hello Sai Ranga Shores! I would like to plan a stay.')}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" size={19} /> WhatsApp Us
              </a>
              <Link className="btn btn--ghost-light" to="/contact">
                Book Now <Icon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tour Modal */}
      {showVideo && (
        <div className="video-modal-backdrop" onClick={() => setShowVideo(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              ✕
            </button>
            <video
              controls
              autoPlay
              playsInline
              className="video-modal-player"
              src="/video/hero.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
