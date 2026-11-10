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
                A serene beachfront retreat on the quiet shores near Pondicherry.
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
                <span>Check-in: <strong>11:00 AM</strong></span>
                <span className="footer-timings-dot">•</span>
                <span>Check-out: <strong>10:00 AM</strong></span>
              </div>
              <div className="footer-rules-compact">
                <span className="footer-no-pets-tag">
                  <Icon name="nopets" size={13} /> No Pets Allowed
                </span>
              </div>
              <div className="footer-tariff-compact">
                <div className="footer-tariff-row">
                  <span>Mon–Fri: <strong>₹10,000</strong></span>
                  <span className="footer-timings-dot">•</span>
                  <span>Sat–Sun: <strong>₹12,000</strong></span>
                </div>
                <small className="footer-tariff-sub">Max 6 Guests • Free Breakfast</small>
              </div>
            </div>

            {/* Column 4: Contact & Social */}
            <div className="footer-col footer-col--contact">
              <h4 className="footer-col-title">Get In Touch</h4>
              <div className="footer-contact-items">
                {/* 1. Ramesh Cell & WhatsApp */}
                <div className="footer-contact-item">
                  <Icon name="phone" size={15} className="footer-contact-ico" />
                  <div>
                    <a href={`tel:${SITE.phones[0].tel}`} className="footer-contact-val">
                      {SITE.phones[0].display}
                    </a>
                    <small className="footer-contact-note">Ramesh (Cell &amp; WhatsApp)</small>
                  </div>
                </div>

                {/* 2. GPay / UPI */}
                <div className="footer-contact-item">
                  <Icon name="gpay" size={15} className="footer-contact-ico" />
                  <div>
                    <span className="footer-contact-val">{SITE.gpay}</span>
                    <small className="footer-contact-note">Google Pay / UPI</small>
                  </div>
                </div>

                {/* 3. Email */}
                <div className="footer-contact-item">
                  <Icon name="mail" size={15} className="footer-contact-ico" />
                  <div>
                    <a href={`mailto:${SITE.email}`} className="footer-contact-val">
                      {SITE.email}
                    </a>
                  </div>
                </div>

                {/* 4. Address */}
                <div className="footer-contact-item">
                  <Icon name="pin" size={15} className="footer-contact-ico" />
                  <div>
                    <span className="footer-contact-val">{SITE.addressLine}</span>
                    <small className="footer-contact-note" style={{ display: 'block', color: 'rgba(254,254,255,0.85)', marginTop: '2px' }}>
                      40 kms before Pondicherry (45m – 1h drive)
                    </small>
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
                  href={waLink('Hello Ramesh! I would like to enquire about booking a stay at Sai Ranga Shores.')}
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
