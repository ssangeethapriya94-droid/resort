/**
 * Booking, Calendar & Tariff Calculation Utilities for Sai Ranga Shores
 * 
 * Tariff Rules:
 *  - Working days (Mon - Fri): ₹10,000 / night with free breakfast
 *  - Weekends (Sat - Sun): ₹12,000 / night with free breakfast
 *  - Maximum capacity: 6 guests (flat rate covers 1 to 6 people)
 *  - Check-in: 11:00 AM | Check-out: 10:00 AM
 *  - Pets: No pets allowed
 *  - Location: Near Pondicherry on ECR (40 kms before Pondicherry, 45m-1h drive)
 */

export function parseDate(str) {
  if (!str) return null;
  const parts = str.split('-').map(Number);
  if (parts.length !== 3) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export function toDateStr(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayStr() {
  return toDateStr(new Date());
}

export function formatDateDisplay(str, includeYear = false) {
  if (!str) return '';
  const date = parseDate(str);
  if (!date) return str;
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    ...(includeYear ? { year: 'numeric' } : {}),
  });
}

/**
 * Calculates tariff breakdown:
 * Weekdays: ₹10,000 / night
 * Weekends (Saturday & Sunday nights): ₹12,000 / night
 */
export function calculateTariff(arrivalStr, departureStr) {
  const start = parseDate(arrivalStr);
  const end = parseDate(departureStr);
  if (!start || !end || end <= start) return null;

  let total = 0;
  let weekdayNights = 0;
  let weekendNights = 0;
  let nights = 0;

  const cur = new Date(start);
  while (cur < end) {
    nights++;
    const day = cur.getDay(); // 0 is Sun, 6 is Sat
    const isWeekend = day === 0 || day === 6;
    if (isWeekend) {
      weekendNights++;
      total += 12000;
    } else {
      weekdayNights++;
      total += 10000;
    }
    cur.setDate(cur.getDate() + 1);
  }

  return {
    nights,
    weekdayNights,
    weekendNights,
    weekdayRate: 10000,
    weekendRate: 12000,
    weekdaySubtotal: weekdayNights * 10000,
    weekendSubtotal: weekendNights * 12000,
    total,
    formattedTotal: `₹ ${total.toLocaleString('en-IN')}`,
  };
}

/**
 * Quick date helpers for weekend getaways
 */
export function getUpcomingWeekend() {
  const now = new Date();
  const day = now.getDay();
  // Saturday of this week or next
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  const sat = new Date(now);
  sat.setDate(now.getDate() + daysUntilSat);
  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);
  return {
    arrival: toDateStr(sat),
    departure: toDateStr(sun),
  };
}

export function getNextWeekend() {
  const weekend = getUpcomingWeekend();
  const sat = parseDate(weekend.arrival);
  sat.setDate(sat.getDate() + 7);
  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);
  return {
    arrival: toDateStr(sat),
    departure: toDateStr(sun),
  };
}

/**
 * Calendar month grid generator
 */
export function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sun
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const days = [];
  // Empty leading cells
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  // Days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    days.push({
      day: d,
      dateStr: toDateStr(date),
      dayOfWeek: date.getDay(),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    });
  }
  return days;
}

