import Img from '../components/Img.jsx';
import Icon from '../components/Icons.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { WaveRipple, CurvedArrow, Frond } from '../components/Decor.jsx';
import { SITE } from '../data/site.js';
import { waLink } from '../lib/whatsapp.js';

export default function Contact() {
  return (
    <div className="contact-page">
      {/* ─────────────────────────────────────────────────────────────
          1. INTEGRATED TROPICAL HERO SECTION WITH FLOATING CARDS
      ───────────────────────────────────────────────────────────── */}
      <section className="contact-hero-section">
        {/* Real Beach Background Image (Crisp, Sun-Drenched Coastal Scene) */}
        <div className="contact-hero-bg">
          <Img name="beach-pano" alt="Beachfront shore at Sai Ranga Shores" sizes="100vw" eager />
          <div className="contact-hero-shade" />
        </div>

        {/* Ambient Top Right Palm Frond */}
        <Frond className="contact-hero-frond" seed={11} color="#1d4d3a" />

        <div className="container contact-hero-container">
          {/* Top Header Content */}
          <div className="contact-hero-header">
            <span className="contact-hero-eyebrow">— CONTACT &amp; RESERVATIONS —</span>
            <h1 className="contact-hero-title">
              Contact Sai Ranga Shores <span className="script">Beach Home</span>
            </h1>
            <p className="contact-hero-sub">
              Planning your beach stay in Pondicherry or have questions about our sea view rooms, rates, or location? Get in touch with our team directly.
            </p>

            {/* Handwritten Note with Curved Arrow & Wave Doodle */}
            <div className="contact-hero-note-group" aria-hidden="true">
              <div className="contact-hero-wave">
                <WaveRipple color="#7DC3E2" />
              </div>
              <div className="contact-hero-note">
                <span className="contact-hero-note-text">
                  Your perfect<br />beach getaway<br />is just a message away!
                </span>
                <CurvedArrow className="contact-hero-curved-arrow" />
              </div>
            </div>
          </div>

          {/* 2 Floating Cards Directly Over Tropical Beach Background */}
          <div className="contact-cards-grid">
            {/* Left Column: Contact Info Card */}
            <div className="contact-info-card">
              {/* Tower Photo with Branded Watermark */}
              <div className="contact-info-photo-wrap">
                <Img
                  name="tower"
                  alt="Sai Ranga Shores Viewing Tower and Resort Grounds"
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className="contact-info-photo"
                />
                <div className="contact-photo-brand">
                  <span className="contact-brand-title">Sai Ranga Shores</span>
                  <span className="contact-brand-sub">BEACH HOME STAY</span>
                  <span className="contact-brand-place">PONDICHERRY</span>
                </div>
              </div>

              {/* Contact Direct Items */}
              <div className="contact-info-body">
                {/* Phone */}
                <a href="tel:+919940038363" className="contact-info-item">
                  <div className="contact-icon-badge">
                    <Icon name="phone" size={18} />
                  </div>
                  <div className="contact-item-details">
                    <span className="contact-item-val">+91 99400 38363</span>
                  </div>
                  <div className="contact-item-flourish" aria-hidden="true">
                    <WaveRipple color="#7DC3E2" />
                  </div>
                </a>

                {/* Address Item */}
                <div className="contact-info-item contact-info-item--address">
                  <div className="contact-icon-badge">
                    <Icon name="pin" size={18} />
                  </div>
                  <div className="contact-item-details">
                    <span className="contact-item-val">Beachfront, near Pondicherry</span>
                    <span className="contact-item-sub">Pondicherry, India</span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="contact-action-btns">
                  <a
                    href={waLink('Hello Sai Ranga Shores! I would like to inquire about booking a stay.')}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-btn contact-btn--wa"
                  >
                    <Icon name="whatsapp" size={18} />
                    <span>WhatsApp Enquiry</span>
                    <Icon name="arrow" size={14} />
                  </a>

                  <a
                    href={SITE.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-btn contact-btn--maps"
                  >
                    <Icon name="pin" size={16} />
                    <span>View on Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us A Message Form Card */}
            <div className="contact-form-col">
              <Frond className="contact-form-bg-frond" seed={15} color="#1d4d3a" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. WHY REACH OUT TO US — WE'RE HERE TO HELP SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="contact-why-section">
        {/* Ambient palm fronds flanking the section */}
        <Frond className="contact-why-frond contact-why-frond--left" seed={21} color="#1d4d3a" />
        <Frond className="contact-why-frond contact-why-frond--right" seed={27} color="#1d4d3a" />

        <div className="container">
          <div className="contact-why-header">
            <div className="contact-why-head-left">
              <span className="contact-why-eyebrow">WHY REACH OUT TO US</span>
              <h2 className="contact-why-title">We're Here to Help</h2>
            </div>
            <div className="contact-why-center-wave" aria-hidden="true">
              <WaveRipple color="#7DC3E2" />
            </div>
            <div className="contact-why-script-note" aria-hidden="true">
              <span className="contact-why-script-text">Your comfort matters ♡</span>
            </div>
          </div>

          <div className="contact-why-grid">
            {/* Card 1: Booking Enquiries */}
            <div className="contact-why-card">
              <div className="contact-why-icon-badge">
                <Icon name="calendar" size={24} />
              </div>
              <h3 className="contact-why-card-title">Booking Enquiries</h3>
              <p className="contact-why-card-desc">
                Check availability & rates for your preferred dates.
              </p>
            </div>

            {/* Card 2: Location Guidance */}
            <div className="contact-why-card">
              <div className="contact-why-icon-badge">
                <Icon name="pin" size={24} />
              </div>
              <h3 className="contact-why-card-title">Location Guidance</h3>
              <p className="contact-why-card-desc">
                Get the best directions and travel tips.
              </p>
            </div>

            {/* Card 3: Special Requests */}
            <div className="contact-why-card">
              <div className="contact-why-icon-badge">
                <Icon name="star" size={24} />
              </div>
              <h3 className="contact-why-card-title">Special Requests</h3>
              <p className="contact-why-card-desc">
                We'll do our best to make your stay memorable.
              </p>
            </div>

            {/* Card 4: Local Assistance */}
            <div className="contact-why-card">
              <div className="contact-why-icon-badge">
                <Icon name="headset" size={24} />
              </div>
              <h3 className="contact-why-card-title">Local Assistance</h3>
              <p className="contact-why-card-desc">
                Support during your stay for a hassle-free experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. OUR LOCATION — FIND US NEAR PONDICHERRY BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="contact-location-section">
        <div className="container">
          <div className="contact-location-banner">
            {/* Left Content */}
            <div className="contact-loc-info">
              <span className="contact-loc-eyebrow">OUR LOCATION</span>
              <h2 className="contact-loc-title">Find Us Near Pondicherry</h2>
              <p className="contact-loc-desc">
                Sai Ranga Shores is perfectly located near Pondicherry, offering easy access to
                beaches, local attractions and a peaceful coastal retreat.
              </p>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost contact-loc-btn"
              >
                <Icon name="pin" size={17} />
                <span>Get Directions</span>
                <Icon name="arrow" size={14} />
              </a>
            </div>

            {/* Middle Stylized Coastline Map Graphic */}
            <div className="contact-loc-map-wrap">
              <svg
                viewBox="0 0 340 220"
                className="contact-loc-map-svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="seaWaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A8DDEE" />
                    <stop offset="100%" stopColor="#76BED9" />
                  </linearGradient>
                  <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5F0E4" />
                    <stop offset="100%" stopColor="#ECE4D0" />
                  </linearGradient>
                </defs>
                {/* Sea (Right / East) */}
                <rect width="340" height="220" fill="url(#seaWaterGrad)" />
                {/* Coastal Land Contour (Left / West) */}
                <path
                  d="M0,0 L210,0 C195,45 180,95 160,130 C140,165 110,195 90,220 L0,220 Z"
                  fill="url(#landGrad)"
                />
                {/* Road Network Lines */}
                <path
                  d="M0,80 Q100,75 180,95"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  opacity="0.8"
                />
                <path
                  d="M50,0 Q90,110 90,220"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  opacity="0.7"
                />
                <path
                  d="M120,40 Q160,100 135,170"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  opacity="0.6"
                />
                {/* Subtle Coast Wave Ripple */}
                <path
                  d="M214,10 C199,50 184,98 164,133 C144,168 114,198 94,220"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />
                {/* Bay of Bengal Text */}
                <text
                  x="245"
                  y="125"
                  fill="#02485D"
                  opacity="0.5"
                  fontSize="12"
                  fontStyle="italic"
                  fontFamily="serif"
                >
                  Bay of Bengal
                </text>
              </svg>

              {/* Pin Marker on Map with Radar Pulse Animation */}
              <div className="contact-loc-pin-marker">
                <span className="contact-pin-radar" aria-hidden="true" />
                <div className="contact-pin-dot">
                  <Icon name="pin" size={20} />
                </div>
                <div className="contact-pin-card">
                  <strong>Sai Ranga Shores</strong>
                  <span>Beachfront Stay</span>
                </div>
              </div>
            </div>

            {/* Right Highlights & Visual Signpost Photo */}
            <div className="contact-loc-perks-wrap">
              <ul className="contact-loc-perks">
                <li>
                  <span className="contact-perk-ico">
                    <Icon name="car" size={17} />
                  </span>
                  <span>Near Pondicherry</span>
                </li>
                <li>
                  <span className="contact-perk-ico">
                    <Icon name="sea" size={17} />
                  </span>
                  <span>Beachfront Location</span>
                </li>
                <li>
                  <span className="contact-perk-ico">
                    <Icon name="pin" size={17} />
                  </span>
                  <span>Easy Access</span>
                </li>
                <li>
                  <span className="contact-perk-ico">
                    <Icon name="bell" size={17} />
                  </span>
                  <span>Peaceful Surroundings</span>
                </li>
              </ul>

              {/* Coastal Wooden Signpost Graphic with Tropical Palm Backdrop */}
              <div className="contact-loc-sign-card">
                <Frond className="contact-sign-frond" seed={33} color="#1d4d3a" />
                <div className="contact-signpost">
                  <div className="contact-sign-post-pole" aria-hidden="true" />
                  <div className="sign-board sign-board--top">
                    <span className="sign-nail sign-nail--left" />
                    <span>SEA</span>
                    <span className="sign-nail sign-nail--right" />
                  </div>
                  <div className="sign-board sign-board--mid">
                    <span className="sign-nail sign-nail--left" />
                    <span>RELAX</span>
                    <span className="sign-nail sign-nail--right" />
                  </div>
                  <div className="sign-board sign-board--bot">
                    <span className="sign-nail sign-nail--left" />
                    <span>PONDICHERRY</span>
                    <span className="sign-nail sign-nail--right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. YOUR BEACH ESCAPE AWAITS — PLAN YOUR STAY TODAY BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="contact-cta-banner">
            <div className="contact-cta-bg">
              <Img
                name="hero-sunset"
                alt="Golden sunset over ocean at Sai Ranga Shores"
                sizes="(max-width: 900px) 100vw, 90vw"
                className="contact-cta-img"
              />
              <div className="contact-cta-shade" />
            </div>

            <div className="contact-cta-content">
              <div className="contact-cta-text">
                <span className="contact-cta-eyebrow">YOUR BEACH ESCAPE AWAITS</span>
                <h2 className="contact-cta-title">Plan Your Stay Today</h2>
                <p className="contact-cta-sub">
                  Experience the charm of Sai Ranga Shores. Let us make your beach holiday special.
                </p>
              </div>

              <div className="contact-cta-action">
                <a
                  href={waLink('Hello Sai Ranga Shores! I want to plan my stay and check room availability.')}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary contact-cta-wa-btn"
                >
                  <Icon name="whatsapp" size={18} />
                  <span>WhatsApp Enquiry</span>
                  <Icon name="arrow" size={15} />
                </a>

                <div className="contact-cta-wave" aria-hidden="true">
                  <WaveRipple color="#7DC3E2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
