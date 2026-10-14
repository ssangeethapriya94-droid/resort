import { SITE } from '../data/site.js';

export function waLink(text = '') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function bookingMessage({ arrival, departure, guests }) {
  const fmt = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
  return `Hello Sai Ranga Shores! I would like to check availability.\nArrival: ${fmt(arrival)}\nDeparture: ${fmt(departure)}\nGuests: ${guests}`;
}
