import { useState } from 'react';
import Icon from './Icons.jsx';
import { WaveRipple } from './Decor.jsx';
import { sendContact } from '../lib/api.js';
import { waLink } from '../lib/whatsapp.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s-]{7,16}$/;

export default function ContactForm() {
  const [v, setV] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    guests: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: 'idle', msg: '' });

  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (v.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!EMAIL.test(v.email.trim())) e.email = 'Enter a valid email address.';
    if (!PHONE.test(v.phone.trim())) e.phone = 'Enter a valid phone number.';
    if (!v.checkin) e.checkin = 'Please select a check-in date.';
    if (v.message.trim().length < 5) e.message = 'Tell us a little about your stay.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setState({ status: 'sending', msg: '' });
    try {
      await sendContact(v);
      setState({
        status: 'ok',
        msg: 'Thank you! Your message has reached us. We will get back to you shortly.',
      });
      setV({ name: '', email: '', phone: '', checkin: '', guests: '', message: '', website: '' });
    } catch (err) {
      if (err.fields) setErrors(err.fields);
      setState({
        status: 'error',
        msg:
          err.message === 'Failed to fetch' || !err.fields
            ? 'We could not send your message right now. Please message us on WhatsApp instead.'
            : err.message,
      });
    }
  };

  return (
    <div className="contact-form-card">
      <div className="contact-form-head">
        <span className="contact-form-eyebrow">SEND US A MESSAGE</span>
        <div className="contact-form-title-row">
          <h2 className="contact-form-title">Let's Plan Your Stay</h2>
          <div className="contact-form-wave" aria-hidden="true">
            <WaveRipple color="#7DC3E2" />
          </div>
        </div>
        <p className="contact-form-sub">
          Fill in the details below and we'll get back to you with all the information you need.
        </p>
      </div>

      <form className="cform contact-form-grid" onSubmit={submit} noValidate>
        {/* Name Input */}
        <div className={`cform-field ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor="cform-name">Name *</label>
          <div className="cform-input-wrap">
            <span className="cform-icon">
              <Icon name="user" size={17} />
            </span>
            <input
              id="cform-name"
              type="text"
              placeholder="Your full name"
              value={v.name}
              onChange={set('name')}
              autoComplete="name"
              aria-invalid={!!errors.name}
            />
          </div>
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        {/* Email Input */}
        <div className={`cform-field ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="cform-email">Email *</label>
          <div className="cform-input-wrap">
            <span className="cform-icon">
              <Icon name="mail" size={17} />
            </span>
            <input
              id="cform-email"
              type="email"
              placeholder="you@example.com"
              value={v.email}
              onChange={set('email')}
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        {/* Phone Input */}
        <div className={`cform-field ${errors.phone ? 'has-error' : ''}`}>
          <label htmlFor="cform-phone">Phone *</label>
          <div className="cform-input-wrap">
            <span className="cform-icon">
              <Icon name="phone" size={17} />
            </span>
            <input
              id="cform-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={v.phone}
              onChange={set('phone')}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
            />
          </div>
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        {/* Check-in Date Input */}
        <div className={`cform-field ${errors.checkin ? 'has-error' : ''}`}>
          <label htmlFor="cform-checkin">Check-in Date *</label>
          <div className="cform-input-wrap">
            <span className="cform-icon">
              <Icon name="calendar" size={17} />
            </span>
            <input
              id="cform-checkin"
              type="date"
              value={v.checkin}
              onChange={set('checkin')}
              min={new Date().toISOString().slice(0, 10)}
              aria-invalid={!!errors.checkin}
            />
          </div>
          {errors.checkin && <span className="field-error">{errors.checkin}</span>}
        </div>

        {/* Guests Dropdown (Full Width) */}
        <div className="cform-field cform-field--full">
          <label htmlFor="cform-guests">Guests *</label>
          <div className="cform-input-wrap">
            <span className="cform-icon">
              <Icon name="guests" size={17} />
            </span>
            <select
              id="cform-guests"
              value={v.guests}
              onChange={set('guests')}
              className="cform-select"
            >
              <option value="">Select number of guests</option>
              <option value="1 Guest">1 Guest</option>
              <option value="2 Guests">2 Guests (Couple)</option>
              <option value="3 Guests">3 Guests</option>
              <option value="4 Guests">4 Guests (Family)</option>
              <option value="5+ Guests">5+ Guests / Large Group</option>
            </select>
          </div>
        </div>

        {/* Message Input (Full Width) */}
        <div className={`cform-field cform-field--full ${errors.message ? 'has-error' : ''}`}>
          <label htmlFor="cform-message">Message *</label>
          <div className="cform-input-wrap cform-input-wrap--textarea">
            <span className="cform-icon cform-icon--top">
              <Icon name="mail" size={17} />
            </span>
            <textarea
              id="cform-message"
              rows="4"
              placeholder="Your message here... (e.g. number of days, special requests, arrival time)"
              value={v.message}
              onChange={set('message')}
              aria-invalid={!!errors.message}
            />
          </div>
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>

        {/* Honeypot hidden input */}
        <input
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          name="website"
          value={v.website}
          onChange={set('website')}
        />

        {/* Submit Button */}
        <button
          className="btn btn--primary cform-submit-btn"
          type="submit"
          disabled={state.status === 'sending'}
        >
          {state.status === 'sending' ? (
            'Sending…'
          ) : (
            <>
              <Icon name="send" size={17} />
              <span>Send Message</span>
              <Icon name="arrow" size={15} />
            </>
          )}
        </button>

        {/* Status Message */}
        {state.msg && (
          <p className={`cform-status ${state.status}`} role="status" aria-live="polite">
            {state.msg}{' '}
            {state.status === 'error' && (
              <a
                href={waLink(`Hello Sai Ranga Shores! I tried contacting via the site: ${v.message}`)}
                target="_blank"
                rel="noreferrer"
                className="cform-wa-fallback"
              >
                Send via WhatsApp instead
              </a>
            )}
          </p>
        )}
      </form>

      {/* Trust & Reassurance Badges */}
      <div className="contact-trust-bar">
        <div className="contact-trust-item">
          <span className="contact-trust-icon">
            <Icon name="lightning" size={17} />
          </span>
          <div className="contact-trust-text">
            <strong>Quick Response</strong>
            <span>Within 24 hours</span>
          </div>
        </div>

        <div className="contact-trust-divider" aria-hidden="true" />

        <div className="contact-trust-item">
          <span className="contact-trust-icon">
            <Icon name="user" size={17} />
          </span>
          <div className="contact-trust-text">
            <strong>Personal Replies</strong>
            <span>From our team</span>
          </div>
        </div>

        <div className="contact-trust-divider" aria-hidden="true" />

        <div className="contact-trust-item">
          <span className="contact-trust-icon">
            <Icon name="heart" size={17} />
          </span>
          <div className="contact-trust-text">
            <strong>Special Requests</strong>
            <span>Always welcome</span>
          </div>
        </div>
      </div>
    </div>
  );
}
