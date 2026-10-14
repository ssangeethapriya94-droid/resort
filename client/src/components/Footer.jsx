import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icons.jsx';
import { Wave } from './Decor.jsx';
import { SITE, NAV, ROOMS } from '../data/site.js';
import { waLink } from '../lib/whatsapp.js';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-pro" aria-label="Site footer">
      {/* 1. Sleek Moving Waves (Color matching the Book Now button: var(--teal)) */}
      <Wave color="var(--teal)" className="footer-wave" />

      {/* 2. Main Footer Body (Compact Luxury 4-Column Layout) */}
      <div className="footer-pro-body">
        <div className="container footer-pro-container">
          <div className="footer-pro-grid">
            {/* Column 1: Brand & Bio */}
            <div className="footer-col footer-col--brand">
              <div className="footer-logo-wrap">
                <Logo light />
              </div>
              <p className="footer-brand-bio">
                A serene beachfront retreat on the quiet shores of Pondicherry.
                Experience calm sea-view rooms, a 360° rooftop viewing tower, and warm homestyle hospitality.
              </p>
              <div className="footer-badges">
                <span className="footer-badge">
                  <Icon name="beach" size={13} /> Direct Beach Access
                </span>
                <span className="footer-badge">
                  <Icon name="roof" size={13} /> 360° Viewing Tower
                </span>
                <span className="footer-badge">
                  <Icon name="parking" size={13} /> Free Parking
                </span>
                <span className="footer-badge">
                  <Icon name="wifi" size={13} /> Free Wi-Fi
                </span>
              </div>
            </div>

            {/* Column 2: Navigation / Explore */}
            <div className="footer-col">
              <h4 className="footer-col-title">Explore</h4>
              <ul className="footer-links">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="footer-link">
                      <Icon name="arrow" size={11} className="footer-link-arrow" />
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Accommodations */}
            <div className="footer-col">
              <h4 className="footer-col-title">Our Stays</h4>
              <ul className="footer-links">
                {ROOMS.map((r) => (
                  <li key={r.id}>
                    <Link to="/stay" className="footer-link">
                      <Icon name="arrow" size={11} className="footer-link-arrow" />
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="footer-timings-compact">
                <span>Check-in: <strong>12:00 PM</strong></span>
                <span className="footer-timings-dot">•</span>
                <span>Check-out: <strong>11:00 AM</strong></span>
              </div>
            </div>

            {/* Column 4: Contact & Social */}
            <div className="footer-col footer-col--contact">
              <h4 className="footer-col-title">Get In Touch</h4>
              <div className="footer-contact-items">
                <div className="footer-contact-item">
                  <Icon name="phone" size={15} className="footer-contact-ico" />
                  <div>
                    <a href="tel:+919789688048" className="footer-contact-val">
                      +91 97896 88048 <small>(Sankar)</small>
                    </a>
                    <a href="tel:+919791296043" className="footer-contact-val">
                      +91 97912 96043 <small>(Divya)</small>
                    </a>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <Icon name="pin" size={15} className="footer-contact-ico" />
                  <div>
                    <span className="footer-contact-val">{SITE.addressLine}</span>
                    <a
                      href={SITE.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-map-link"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="footer-social-row">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Follow Sai Ranga Shores on Instagram"
                  title="Instagram"
                >
                  <Icon name="instagram" size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Follow Sai Ranga Shores on Facebook"
                  title="Facebook"
                >
                  <Icon name="facebook" size={16} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Subscribe to Sai Ranga Shores on YouTube"
                  title="YouTube"
                >
                  <Icon name="youtube" size={16} />
                </a>
                <a
                  href={waLink('Hello Sai Ranga Shores! I would like to enquire about room booking.')}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn footer-social-btn--wa"
                  aria-label="Chat with Sai Ranga Shores on WhatsApp"
                  title="WhatsApp"
                >
                  <Icon name="whatsapp" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Back to Top Strip */}
        <div className="footer-bottom-wrap">
          <div className="container footer-bottom-inner">
            <small className="footer-copyright">
              © {year} {SITE.name} {SITE.sub}. All rights reserved.
            </small>

            <span className="footer-tagline-script">
              Dancing with waves <span className="footer-heart">♡</span> Pondicherry
            </span>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <span>Back to Top</span>
              <Icon name="arrow" size={13} className="footer-top-arrow" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
