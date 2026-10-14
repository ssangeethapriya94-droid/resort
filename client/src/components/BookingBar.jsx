import { useState } from 'react';
import Icon from './Icons.jsx';
import { waLink, bookingMessage } from '../lib/whatsapp.js';

const today = () => new Date().toISOString().slice(0, 10);

// No backend needed: opens WhatsApp with the dates pre-filled.
export default function BookingBar({ className = '' }) {
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!arrival || !departure) return setError('Please choose your arrival and departure dates.');
    if (departure <= arrival) return setError('Departure must be after arrival.');
    setError('');
    window.open(waLink(bookingMessage({ arrival, departure, guests })), '_blank', 'noopener');
  };

  return (
    <form className={`booking ${className}`} onSubmit={submit} noValidate aria-label="Check availability">
      <label className="booking-field">
        <Icon name="calendar" className="booking-ico" />
        <span className="booking-text">
          <span className="booking-label">Check-in</span>
          <span className="booking-val">{arrival ? arrival : 'Add date'}</span>
          <input
            type="date"
            className="booking-native-input"
            min={today()}
            value={arrival}
            onChange={(e) => {
              setArrival(e.target.value);
              if (departure && e.target.value >= departure) setDeparture('');
            }}
            aria-label="Check-in date"
          />
        </span>
      </label>
      <label className="booking-field">
        <Icon name="calendar" className="booking-ico" />
        <span className="booking-text">
          <span className="booking-label">Check-out</span>
          <span className="booking-val">{departure ? departure : 'Add date'}</span>
          <input
            type="date"
            className="booking-native-input"
            min={arrival || today()}
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            aria-label="Check-out date"
          />
        </span>
      </label>
      <label className="booking-field">
        <Icon name="guests" className="booking-ico" />
        <span className="booking-text">
          <span className="booking-label">Guests</span>
          <span className="booking-val">{guests} Guest{guests > 1 ? 's' : ''} ▾</span>
          <select
            className="booking-native-input"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            aria-label="Number of guests"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} Guest{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </span>
      </label>
      <button className="btn btn--primary booking-btn" type="submit">Check Availability <Icon name="arrow" size={16} /></button>
      <p className="booking-error" role="alert">{error}</p>
    </form>
  );
}
