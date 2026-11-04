import { SITE } from '../data/site.js';

export function waLink(text = '') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function bookingMessage({ arrival, departure, guests, breakdown }) {
  const fmt = (d) => (d ? new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
  const tariffDetail = breakdown
    ? `\nStay Duration: ${breakdown.nights} Night${breakdown.nights > 1 ? 's' : ''}\nEstimated Total: ${breakdown.formattedTotal} (Free Breakfast Included)`
    : '\n(Tariff: ₹10,000 working days / ₹12,000 weekends with free breakfast)';

  return `Hello Ramesh! I would like to check availability at Sai Ranga Shores Beach Home (near Pondicherry on ECR, 40 kms before Pondicherry) for ${guests} guest${guests > 1 ? 's' : ''} (Max 6 people).\nArrival: ${fmt(arrival)} (Check-in 11 AM)\nDeparture: ${fmt(departure)} (Check-out 10 AM)${tariffDetail}\nHouse rule: No pets allowed.`;
}
