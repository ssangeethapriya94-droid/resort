import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Img from '../components/Img.jsx';
import Icon from '../components/Icons.jsx';
import Reveal from '../components/Reveal.jsx';
import { Frond, Wave, Seashell, TropicalFlower, ScribbleUnderline } from '../components/Decor.jsx';
import { SITE } from '../data/site.js';
import { waLink } from '../lib/whatsapp.js';

export default function About() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="About Sai Ranga Shores"
        script="Beach Home"
        image={
          <div className="phead-bg">
            <Img name="tower" alt="Sai Ranga Shores Beach Home Pondicherry viewing tower" sizes="100vw" eager />
            <div className="phead-shade" />
          </div>
        }
      >
        A peaceful beach retreat and coastal escape in Pondicherry, created for travelers seeking comfort, privacy and the soothing rhythm of the waves.
      </PageHeader>

      {/* Story Section */}
      <section className="section container">
        <div className="about-story-grid">
          <Reveal className="about-story-left">
            <p className="home-eyebrow">— THE SANCTUARY —</p>
            <h2 className="home-about-title">
              Where Hospitality Meets <span className="home-script-title">the Ocean<ScribbleUnderline /></span>
            </h2>
            <p className="home-about-desc">
              Nestled along the quiet coastline near Pondicherry, Sai Ranga Shores Beach Home is a relaxing beach home in Pondicherry created for those who cherish ocean serenity. Designed as a peaceful beach retreat in Pondicherry, our property gives guests an authentic beachfront homestay experience where you can unplug from city rush and reconnect with nature.
            </p>
            <p className="home-about-desc">
              Whether you are watching the golden sunrise over the Bay of Bengal from our rooftop observation pavilion, enjoying tranquil barefoot beach walks just steps from your room, or relaxing in our comfortable sea-view suites, Sai Ranga Shores Pondicherry offers a warm coastal escape that feels just like home.
            </p>
            <div className="about-hosts-card">
              <div className="about-hosts-avatar">
                <Icon name="guests" size={24} />
              </div>
              <div className="about-hosts-info">
                <h4>Hosted with Care</h4>
                <p>Personal hospitality and local guidance by Sankar & Divya to ensure your stay is comfortable and memorable.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="about-story-right" delay={120}>
            <div className="about-photo-stack">
              <div className="about-photo-main">
                <Img name="img-0125" alt="Sai Ranga Shores tower, driveway and entrance" sizes="(max-width: 768px) 100vw, 500px" />
                <button
                  type="button"
                  className="home-about-video-btn"
                  onClick={() => setShowVideo(true)}
                  aria-label="Watch resort video tour"
                  title="Watch resort video tour"
                >
                  <span className="home-about-play-icon">
                    <Icon name="play" size={18} />
                  </span>
                  <span className="home-about-play-text">Watch Video Tour</span>
                </button>
              </div>
              <div className="about-photo-sub">
                <Img name="img-3413" alt="Sunrise through palms at Sai Ranga Shores" sizes="(max-width: 768px) 50vw, 260px" />
              </div>
              <TropicalFlower className="about-flower-accent" size={48} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars of our Beach Home */}
      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Why Guests Choose Us</p>
            <h2>What Makes Sai Ranga Shores <span className="script">Special</span></h2>
          </Reveal>

          <div className="about-pillars-grid">
            <Reveal className="about-pillar-card" delay={50}>
              <div className="about-pillar-icon"><Icon name="sea" size={30} /></div>
              <h3>Direct Beach Access</h3>
              <p>Step directly from the property onto the soft shoreline. No long walks or busy roads—just the open sea.</p>
            </Reveal>

            <Reveal className="about-pillar-card" delay={100}>
              <div className="about-pillar-icon"><Icon name="roof" size={30} /></div>
              <h3>Rooftop Sea Pavilion</h3>
              <p>Our elevated observation pavilion offers panoramic horizon views, ideal for sunrise coffee and evening breezes.</p>
            </Reveal>

            <Reveal className="about-pillar-card" delay={150}>
              <div className="about-pillar-icon"><Icon name="wind" size={30} /></div>
              <h3>Spacious Sea-View Rooms</h3>
              <p>Thoughtfully designed rooms wrapped with large windows, modern AC, plush beds and sparkling sea vistas.</p>
            </Reveal>

            <Reveal className="about-pillar-card" delay={200}>
              <div className="about-pillar-icon"><Icon name="food" size={30} /></div>
              <h3>Warm Homestyle Hospitality</h3>
              <p>Attentive, friendly service with authentic local coastal cuisine recommendations and Pondicherry travel tips.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-ocean">
        <Wave color="var(--teal)" flip />
        <div className="cta-ocean-body">
          <Seashell className="cta-ocean-shell" color="rgba(254,254,255,0.7)" />
          <div className="container cta-ocean-inner">
            <p className="home-eyebrow eyebrow--light">— VISIT US IN PONDICHERRY —</p>
            <h2 className="cta-ocean-title">Experience the Ocean Calm</h2>
            <p className="cta-ocean-desc">Book direct with us on WhatsApp for the best seasonal rates and room selection.</p>
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
                Contact & Booking <Icon name="arrow" size={15} />
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
