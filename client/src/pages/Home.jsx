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
  const [tariffHighlight, setTariffHighlight] = useState('all'); // 'all' | 'weekday' | 'weekend'

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
              Sai Ranga Shores Beach Home is a peaceful beach resort near Pondicherry on ECR nestled along the quiet coastline—situated 40 kms before Pondicherry, a drive of 45 minutes to 1 hour depending on traffic and speed. Designed for travelers seeking an authentic beachfront resort near Pondicherry on ECR, a private beach house, or a relaxing coastal stay, our property offers spacious sea view rooms, warm homestyle hospitality by Ramesh, and direct steps to virgin sands.
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

      {/* 3. Stay In Comfort — Entire 2 BHK Beach Villa Homestay */}
      <section id="rooms" className="home-rooms-section">
        <Frond className="home-rooms-frond--right" seed={13} color="#1d4d3a" />
        <div className="container">
          <div className="home-section-header">
            <div>
              <p className="home-eyebrow">— ENTIRE 2 BHK BEACH VILLA HOMESTAY —</p>
              <h2 className="home-section-title">2 BHK Villa Spaces &amp; Bedrooms</h2>
              <p className="home-section-sub">
                We offer the entire 2 BHK beach villa as a private homestay near Pondicherry on ECR (we do not rent individual rooms). Enjoy exclusive access to all bedrooms, sea-view lounge, and observation tower for up to 6 guests with complimentary breakfast.
              </p>
            </div>
            <Link to="/stay" className="home-section-link">
              View All Details <Icon name="arrow" size={15} />
            </Link>
          </div>

          {/* The 3 Villa Spaces Appear Immediately — No Per-Room Rates */}
          <div className="home-rooms-grid">
            {ROOMS.map((room) => (
              <div key={room.id} className="home-room-card">
                <div className="home-room-img-box">
                  <Img
                    name={room.image}
                    alt={room.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="home-room-breakfast-badge">Entire Villa Stay</span>
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
                    <div className="home-room-villa-pill">
                      <span className="home-room-villa-scope">✓ Part of Entire 2 BHK Villa</span>
                      <span className="home-room-villa-note">All rooms included in your private booking (up to 6 guests)</span>
                    </div>

                    <a
                      href={waLink(`Hello Ramesh! I would like to book the Entire 2 BHK Beach Villa at Sai Ranga Shores for up to 6 guests.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn--primary home-room-btn"
                    >
                      Book Entire 2 BHK Villa <Icon name="arrow" size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3B. Dedicated Tariffs, Timings & Stay Guidelines Section (New Location & Luxury 2-Column Design) */}
      <section id="tariffs" className="home-tariffs-section" aria-label="Official Tariffs and Stay Rules">
        <Frond className="home-tariffs-frond home-tariffs-frond--left" seed={9} color="#1d4d3a" />
        <Frond className="home-tariffs-frond home-tariffs-frond--right" seed={14} color="#1d4d3a" />

        <div className="container">
          <div className="home-section-header home-section-header--center">
            <p className="home-eyebrow">— TRANSPARENT ALL-INCLUSIVE RATES —</p>
            <h2 className="home-section-title">Entire 2 BHK Villa Tariffs &amp; Stay Rules</h2>
            <p className="home-section-sub home-section-sub--center">
              Clear, honest pricing with zero hidden fees. Flat tariff covers the entire 2 BHK private beach villa homestay for 1 to 6 people with complimentary breakfast (we do not let individual rooms). Situated near Pondicherry on ECR (40 kms before Pondicherry, 45m–1h scenic coastal drive).
            </p>
          </div>

          {/* Interactive Day Filter Tabs */}
          <div className="home-tariffs-toggle-bar" role="tablist" aria-label="Tariff day filter">
            <button
              type="button"
              role="tab"
              aria-selected={tariffHighlight === 'all'}
              className={`home-tariffs-toggle-btn ${tariffHighlight === 'all' ? 'is-active' : ''}`}
              onClick={() => setTariffHighlight('all')}
            >
              <span>All Rates &amp; Guidelines</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tariffHighlight === 'weekday'}
              className={`home-tariffs-toggle-btn ${tariffHighlight === 'weekday' ? 'is-active' : ''}`}
              onClick={() => setTariffHighlight('weekday')}
            >
              <Icon name="coffee" size={15} />
              <span>Working Days: ₹10,000 / nt</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tariffHighlight === 'weekend'}
              className={`home-tariffs-toggle-btn ${tariffHighlight === 'weekend' ? 'is-active' : ''}`}
              onClick={() => setTariffHighlight('weekend')}
            >
              <Icon name="sun" size={15} />
              <span>Weekends: ₹12,000 / nt</span>
            </button>
          </div>

          {/* 2-Column Luxury Presentation Grid */}
          <div className="home-tariffs-split-grid">
            {/* Left Column: Side-by-Side Dual Rate Showcase */}
            <div className="home-tariffs-rates-col">
              {/* Card 1: Working Days (Mon–Fri) */}
              <div
                className={`home-rate-card home-rate-card--weekday ${tariffHighlight === 'weekend' ? 'is-dimmed' : ''
                  } ${tariffHighlight === 'weekday' ? 'is-focused' : ''}`}
              >
                <div className="home-rate-card-head">
                  <div className="home-rate-badge home-rate-badge--green">
                    <span className="home-rate-pulse home-rate-pulse--green" /> Free Breakfast Included
                  </div>
                  <span className="home-rate-capacity-pill">1 to 6 Guests</span>
                </div>

                <div className="home-rate-pricing">
                  <span className="home-rate-kicker">WORKING DAYS (MON–FRI)</span>
                  <div className="home-rate-figure">
                    <span className="home-rate-currency">₹</span>
                    <strong className="home-rate-num">10,000</strong>
                    <span className="home-rate-period">/ night</span>
                  </div>
                  <p className="home-rate-summary">
                    Peaceful midweek escape. Flat rate covers entire beach home for 1 to 6 people.
                  </p>
                </div>

                <ul className="home-rate-perks">
                  <li><Icon name="check" size={15} /> Complimentary morning breakfast</li>
                  <li><Icon name="check" size={15} /> Accommodates up to 6 people maximum</li>
                  <li><Icon name="check" size={15} /> Direct steps onto uncrowded beach sands</li>
                  <li><Icon name="check" size={15} /> Private lawn garden &amp; sea view bedrooms</li>
                </ul>

                <div className="home-rate-card-foot">
                  <span className="home-rate-foot-tag">Best Midweek Value</span>
                </div>
              </div>

              {/* Card 2: Weekends (Sat & Sun) */}
              <div
                className={`home-rate-card home-rate-card--weekend ${tariffHighlight === 'weekday' ? 'is-dimmed' : ''
                  } ${tariffHighlight === 'weekend' ? 'is-focused' : ''}`}
              >
                <div className="home-rate-card-head">
                  <div className="home-rate-badge home-rate-badge--gold">
                    <span className="home-rate-pulse home-rate-pulse--gold" /> Breakfast Included
                  </div>
                  <span className="home-rate-capacity-pill">1 to 6 Guests</span>
                </div>

                <div className="home-rate-pricing">
                  <span className="home-rate-kicker">WEEKENDS (SAT &amp; SUN)</span>
                  <div className="home-rate-figure">
                    <span className="home-rate-currency">₹</span>
                    <strong className="home-rate-num home-rate-num--gold">12,000</strong>
                    <span className="home-rate-period">/ night</span>
                  </div>
                  <p className="home-rate-summary">
                    Rejuvenating weekend escape. Flat rate covers entire beach home for 1 to 6 people.
                  </p>
                </div>

                <ul className="home-rate-perks">
                  <li><Icon name="check" size={15} /> Complimentary weekend breakfast</li>
                  <li><Icon name="check" size={15} /> Accommodates up to 6 people maximum</li>
                  <li><Icon name="check" size={15} /> 360° Sunrise observatory viewing tower</li>
                  <li><Icon name="check" size={15} /> Private coconut palm garden pavilion</li>
                </ul>

                <div className="home-rate-card-foot">
                  <span className="home-rate-foot-tag home-rate-foot-tag--gold">Weekend Retreat</span>
                </div>
              </div>
            </div>

            {/* Right Column: Stay Rules, Timings & Direct Host Ramesh Contact */}
            <div className="home-tariffs-policy-col">
              {/* Card A: Stay Timings & Capacity */}
              <div className="home-policy-card home-policy-card--timing">
                <div className="home-pcard-icon home-pcard-icon--blue">
                  <Icon name="clock" size={22} />
                </div>
                <div className="home-pcard-content">
                  <span className="home-pcard-kicker">STAY TIMINGS &amp; CAPACITY</span>
                  <div className="home-timing-blocks">
                    <div className="home-timing-block">
                      <span className="home-timing-lbl">CHECK-IN</span>
                      <strong className="home-timing-val">11:00 AM</strong>
                    </div>
                    <div className="home-timing-divider" />
                    <div className="home-timing-block">
                      <span className="home-timing-lbl">CHECK-OUT</span>
                      <strong className="home-timing-val">10:00 AM</strong>
                    </div>
                  </div>
                  <div className="home-pcard-subnote">
                    <Icon name="guests" size={14} />
                    <span><strong>Max 6 people capacity</strong> (1 to 6 guests covered under flat tariff)</span>
                  </div>
                </div>
              </div>

              {/* Card B: House Policy & Location */}
              <div className="home-policy-card home-policy-card--rules">
                <div className="home-pcard-icon home-pcard-icon--red">
                  <Icon name="nopets" size={22} />
                </div>
                <div className="home-pcard-content">
                  <span className="home-pcard-kicker">HOUSE POLICY &amp; LOCATION</span>
                  <div className="home-policy-status">
                    <span className="home-policy-pill--nopets">
                      <Icon name="nopets" size={13} /> Strictly No Pets Allowed
                    </span>
                  </div>
                  <div className="home-loc-note">
                    <div className="home-loc-pin">
                      <Icon name="pin" size={14} />
                      <strong>Near Pondicherry on ECR</strong>
                    </div>
                    <p className="home-loc-desc">
                      Situated 40 kms before Pondicherry — a scenic drive of 45 minutes to 1 hour depending on traffic and speed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card C: Direct Host Booking & GPay Verification */}
              <div className="home-policy-card home-policy-card--host">
                <div className="home-host-card-top">
                  <div className="home-host-avatar">
                    <span>R</span>
                  </div>
                  <div className="home-host-info">
                    <span className="home-host-name">Direct Booking with Host Ramesh</span>
                    <span className="home-host-role">Attentive On-Site Caretaker &amp; Host</span>
                  </div>
                </div>

                <div className="home-host-details-list">
                  <div className="home-hdetail-item">
                    <Icon name="phone" size={14} />
                    <span>Cell &amp; WhatsApp: <a href="tel:+919940038374"><strong>+91 99400 38374</strong></a></span>
                  </div>
                  <div className="home-hdetail-item">
                    <Icon name="gpay" size={14} />
                    <span>Google Pay / UPI: <strong>99400 38363</strong></span>
                  </div>
                  <div className="home-hdetail-item">
                    <Icon name="mail" size={14} />
                    <span>Email: <a href="mailto:rameshadiant@gmail.com"><strong>rameshadiant@gmail.com</strong></a></span>
                  </div>
                </div>

                <div className="home-host-btns">
                  <a
                    href={waLink('Hello Ramesh! I want to check availability and book a stay at Sai Ranga Shores.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-hbtn home-hbtn--wa"
                  >
                    <Icon name="whatsapp" size={17} />
                    <span>WhatsApp Ramesh</span>
                  </a>
                  <a href="tel:+919940038374" className="home-hbtn home-hbtn--call">
                    <Icon name="phone" size={15} />
                    <span>Call Host</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Continuous Gliding Wave Ticker Tape at bottom of section */}
          <div className="home-tariffs-ticker-wrap">
            <div className="home-tariffs-ticker-track">
              {[1, 2].map((k) => (
                <div key={k} className="home-tariffs-ticker-items" aria-hidden={k === 2}>
                  <span className="htt-item htt-item--green">
                    <Icon name="coffee" size={14} /> Mon–Fri: <strong>₹10,000 / nt</strong> (Free Breakfast)
                  </span>
                  <span className="htt-dot">✦</span>
                  <span className="htt-item htt-item--gold">
                    <Icon name="sun" size={14} /> Sat–Sun: <strong>₹12,000 / nt</strong> (Breakfast Included)
                  </span>
                  <span className="htt-dot">✦</span>
                  <span className="htt-item">
                    <Icon name="guests" size={14} /> <strong>1 to 6 Guests Flat Rate</strong>
                  </span>
                  <span className="htt-dot">✦</span>
                  <span className="htt-item">
                    <Icon name="clock" size={14} /> Check-in: <strong>11:00 AM</strong> · Check-out: <strong>10:00 AM</strong>
                  </span>
                  <span className="htt-dot">✦</span>
                  <span className="htt-item htt-item--red">
                    <Icon name="nopets" size={14} /> <strong>Strictly No Pets Allowed</strong>
                  </span>
                  <span className="htt-dot">✦</span>
                  <span className="htt-item">
                    <Icon name="road" size={14} /> <strong>Near Pondicherry on ECR</strong> (40 kms before, ~45m drive)
                  </span>
                  <span className="htt-dot">✦</span>
                  <span className="htt-item htt-item--host">
                    <Icon name="user" size={14} /> Host Ramesh: <strong>+91 99400 38374</strong> · GPay: <strong>99400 38363</strong>
                  </span>
                  <span className="htt-dot">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3B. Private Swimming Pool Showcase */}
      <section className="villa-pool-section" id="pool">
        <div className="container">
          <div className="villa-pool-header">
            <p className="home-eyebrow">— EXCLUSIVE VILLA AMENITY —</p>
            <h2 className="home-section-title">Private Swimming Pool &amp; Plunge Deck</h2>
            <p className="villa-pool-sub">
              Cool off, splash, and unwind in your private swimming pool — reserved exclusively for your booking (never shared). Whether relaxing on floating loungers beneath the sunshade canopy by day or enjoying an illuminated evening swim under ambient lighting, your private oasis awaits.
            </p>
          </div>

          <div className="villa-pool-grid">
            {/* Daytime Card */}
            <div className="villa-pool-card">
              <div className="villa-pool-img-wrap">
                <Img
                  name="pool-day"
                  alt="Private sheltered swimming pool at Sai Ranga Shores with colorful sunshade canopy and floating lounger"
                  sizes="(max-width: 860px) 100vw, 50vw"
                />
                <span className="villa-pool-tag villa-pool-tag--day">
                  <Icon name="sun" size={14} /> Daytime Splash &amp; Lounging
                </span>
              </div>
              <div className="villa-pool-card-body">
                <h3 className="villa-pool-card-title">Sheltered Day Plunge</h3>
                <p className="villa-pool-card-text">
                  Vibrant blue sheltered canopy protects you from direct noon sun so you can swim comfortably throughout the day. Includes relaxing water floats and poolside sun deck.
                </p>
                <div className="villa-pool-chips">
                  <span>✓ Sunshade Canopy</span>
                  <span>✓ Pool Floats &amp; Loungers</span>
                  <span>✓ 100% Private Access</span>
                </div>
              </div>
            </div>

            {/* Night-time Card */}
            <div className="villa-pool-card">
              <div className="villa-pool-img-wrap">
                <Img
                  name="pool-night"
                  alt="Illuminated private swimming pool at night with ambient underwater lighting at Sai Ranga Shores"
                  sizes="(max-width: 860px) 100vw, 50vw"
                />
                <span className="villa-pool-tag villa-pool-tag--night">
                  <Icon name="spark" size={14} /> Night Ambient Illumination
                </span>
              </div>
              <div className="villa-pool-card-body">
                <h3 className="villa-pool-card-title">Illuminated Evening Swims</h3>
                <p className="villa-pool-card-text">
                  Take a serene, refreshing dip after sunset with ambient underwater lighting, surrounded by coastal breezes and tranquil night ambiance under the stars.
                </p>
                <div className="villa-pool-chips">
                  <span>✓ Underwater Night Lights</span>
                  <span>✓ Stainless Steel Ladder</span>
                  <span>✓ Included with Villa Stay</span>
                </div>
              </div>
            </div>
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
