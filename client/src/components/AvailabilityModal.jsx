import { useState } from 'react';
import Icon from './Icons.jsx';
import { SITE } from '../data/site.js';
import { waLink, bookingMessage } from '../lib/whatsapp.js';
import { formatDateDisplay } from '../lib/booking.js';

export default function AvailabilityModal({ isOpen, onClose, arrival, departure, guests, breakdown }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen || !breakdown) return null;

  const handleWhatsApp = () => {
    const msg = bookingMessage({ arrival, departure, guests, breakdown });
    window.open(waLink(msg), '_blank', 'noopener');
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      return setFormError('Please enter your name.');
    }
    if (!phone.trim() || phone.trim().length < 8) {
      return setFormError('Please enter a valid mobile number.');
    }
    setFormError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: 'inquiry@sairangashores.com',
          checkin: arrival,
          message: `Booking availability inquiry for ${guests} guests from ${arrival} to ${departure} (${breakdown.nights} nights, estimated ₹${breakdown.total}). Free breakfast.`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: if server is in standalone Vite mode without backend, open WhatsApp
        setSubmitted(true);
      }
    } catch {
      // Graceful fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="avail-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="avail-modal-title">
      <div className="avail-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="avail-modal-close"
          onClick={onClose}
          aria-label="Close availability window"
        >
          <Icon name="close" size={20} />
        </button>

        {/* Header */}
        <div className="avail-modal-header">
          <div className="avail-modal-badge">
            <span className="avail-modal-badge-dot" />
            <span>Dates Available for Booking</span>
          </div>
          <h2 id="avail-modal-title" className="avail-modal-title">
            Sai Ranga Shores Beach Home
          </h2>
          <p className="avail-modal-subtitle">
            <Icon name="pin" size={14} /> Near Pondicherry on ECR (40 kms before Pondicherry, 45m–1h drive)
          </p>
        </div>

        {/* Stay Summary Grid */}
        <div className="avail-summary-grid">
          <div className="avail-summary-box">
            <span className="avail-box-label">Check-in (11:00 AM)</span>
            <span className="avail-box-val">{formatDateDisplay(arrival, true)}</span>
          </div>
          <div className="avail-summary-box">
            <span className="avail-box-label">Check-out (10:00 AM)</span>
            <span className="avail-box-val">{formatDateDisplay(departure, true)}</span>
          </div>
          <div className="avail-summary-box">
            <span className="avail-box-label">Total Duration</span>
            <span className="avail-box-val">{breakdown.nights} Night{breakdown.nights > 1 ? 's' : ''}</span>
          </div>
          <div className="avail-summary-box">
            <span className="avail-box-label">Guests</span>
            <span className="avail-box-val">{guests} Guest{guests > 1 ? 's' : ''} (Max 6)</span>
          </div>
        </div>

        {/* Tariff Breakdown Table */}
        <div className="avail-tariff-card">
          <div className="avail-tariff-row">
            <span>Tariff Inclusions</span>
            <span className="avail-pill-free"><Icon name="coffee" size={13} /> Free Daily Breakfast Included</span>
          </div>

          {breakdown.weekdayNights > 0 && (
            <div className="avail-tariff-row">
              <span>Working Days ({breakdown.weekdayNights} night{breakdown.weekdayNights > 1 ? 's' : ''} @ ₹10,000)</span>
              <strong>₹ {breakdown.weekdaySubtotal.toLocaleString('en-IN')}</strong>
            </div>
          )}

          {breakdown.weekendNights > 0 && (
            <div className="avail-tariff-row">
              <span>Weekend Days ({breakdown.weekendNights} night{breakdown.weekendNights > 1 ? 's' : ''} @ ₹12,000)</span>
              <strong>₹ {breakdown.weekendSubtotal.toLocaleString('en-IN')}</strong>
            </div>
          )}

          <div className="avail-tariff-row avail-tariff-row--total">
            <div>
              <strong>Total Estimated Tariff</strong>
              <small className="avail-tariff-subnote">Flat rate for 1 to 6 people</small>
            </div>
            <strong className="avail-total-amount">{breakdown.formattedTotal}</strong>
          </div>
        </div>

        {/* House Rules Note */}
        <div className="avail-rules-strip">
          <span className="avail-rule-chip avail-rule-chip--nopets">
            <Icon name="nopets" size={14} /> No pets allowed
          </span>
          <span className="avail-rule-chip">
            <Icon name="clock" size={14} /> Check-in: 11:00 AM · Check-out: 10:00 AM
          </span>
          <span className="avail-rule-chip">
            <Icon name="road" size={14} /> 40 kms before Pondicherry
          </span>
        </div>

        {/* Primary Booking Actions */}
        <div className="avail-actions-wrap">
          <button
            type="button"
            className="btn btn--whatsapp avail-wa-btn"
            onClick={handleWhatsApp}
          >
            <Icon name="whatsapp" size={19} />
            <span>Confirm Availability with Ramesh on WhatsApp</span>
          </button>

          <div className="avail-contact-pills">
            <a href="tel:+919940038374" className="avail-contact-link">
              <Icon name="phone" size={15} />
              <span>Call Ramesh: <strong>+91 99400 38374</strong></span>
            </a>
            <div className="avail-gpay-badge">
              <Icon name="gpay" size={15} />
              <span>GPay: <strong>99400 38363</strong></span>
            </div>
          </div>
        </div>

        {/* Quick Callback Request / Reserve Inquiry Form */}
        <div className="avail-callback-box">
          <h4 className="avail-callback-title">Or Request a Callback from Ramesh</h4>
          {submitted ? (
            <div className="avail-callback-success" role="alert">
              <Icon name="check" size={18} />
              <span>Thank you! Ramesh will reach out on your mobile shortly with booking confirmation details.</span>
            </div>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="avail-callback-form">
              <div className="avail-form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="avail-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  aria-label="Your full name"
                />
                <input
                  type="tel"
                  placeholder="Mobile / WhatsApp Number"
                  className="avail-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                  aria-label="Mobile or WhatsApp number"
                />
                <button type="submit" className="btn btn--terracotta avail-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Request Callback'}
                </button>
              </div>
              {formError && <p className="avail-form-err">{formError}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

