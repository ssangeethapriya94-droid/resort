import { useState, useRef, useEffect } from 'react';
import Icon from './Icons.jsx';
import AvailabilityModal from './AvailabilityModal.jsx';
import {
  getTodayStr,
  formatDateDisplay,
  calculateTariff,
  getUpcomingWeekend,
  getNextWeekend,
  getMonthDays,
  parseDate,
  toDateStr,
} from '../lib/booking.js';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function BookingBar({ className = '' }) {
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');

  // Calendar popover state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState('arrival'); // 'arrival' | 'departure'
  const today = getTodayStr();

  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());

  // Availability modal state
  const [isAvailModalOpen, setIsAvailModalOpen] = useState(false);

  const containerRef = useRef(null);

  // Close calendar popover on outside click or Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCalendarOpen(false);
        setIsAvailModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Compute live tariff breakdown when both dates exist
  const breakdown = arrival && departure ? calculateTariff(arrival, departure) : null;

  // Month navigation
  const prevMonth = () => {
    const now = new Date();
    if (currentYear === now.getFullYear() && currentMonth <= now.getMonth()) return;
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Open calendar for specific field
  const openCalendarFor = (step) => {
    setError('');
    setActiveStep(step);
    setIsCalendarOpen(true);
    // Align view month to selected date if already chosen
    const targetDate = step === 'arrival' ? arrival : (departure || arrival);
    if (targetDate) {
      const d = parseDate(targetDate);
      if (d) {
        setCurrentYear(d.getFullYear());
        setCurrentMonth(d.getMonth());
      }
    }
  };

  // Day selection logic
  const handleDateClick = (dateStr) => {
    setError('');
    if (activeStep === 'arrival') {
      setArrival(dateStr);
      // If departure is before or equal to new arrival, clear it
      if (departure && departure <= dateStr) {
        setDeparture('');
      }
      setActiveStep('departure');
    } else {
      // Selecting departure
      if (!arrival || dateStr <= arrival) {
        // User clicked a date before arrival, reset arrival to this date
        setArrival(dateStr);
        setDeparture('');
        setActiveStep('departure');
      } else {
        setDeparture(dateStr);
        setIsCalendarOpen(false);
      }
    }
  };

  // Quick preset shortcuts
  const selectWeekend = (weekendFunc) => {
    const { arrival: a, departure: d } = weekendFunc();
    setArrival(a);
    setDeparture(d);
    setError('');
  };

  const selectLongWeekend = () => {
    const now = new Date();
    const day = now.getDay();
    const daysUntilFri = (5 - day + 7) % 7 || 7;
    const fri = new Date(now);
    fri.setDate(now.getDate() + daysUntilFri);
    const mon = new Date(fri);
    mon.setDate(fri.getDate() + 3);
    setArrival(toDateStr(fri));
    setDeparture(toDateStr(mon));
    setError('');
  };

  const clearDates = () => {
    setArrival('');
    setDeparture('');
    setActiveStep('arrival');
    setError('');
  };

  // Form submit / Check availability
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!arrival) {
      setError('Please choose your check-in date.');
      openCalendarFor('arrival');
      return;
    }
    if (!departure) {
      setError('Please choose your check-out date.');
      openCalendarFor('departure');
      return;
    }
    if (departure <= arrival) {
      setError('Departure must be after arrival date.');
      openCalendarFor('departure');
      return;
    }

    setError('');
    setIsCalendarOpen(false);
    setIsAvailModalOpen(true);
  };

  const daysGrid = getMonthDays(currentYear, currentMonth);

  return (
    <div className="booking-widget-wrapper" ref={containerRef}>
      <form
        className={`booking ${className}`}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Check availability for Sai Ranga Shores Beach Home"
      >
        {/* 1. Check-in Field */}
        <div
          className={`booking-field ${isCalendarOpen && activeStep === 'arrival' ? 'is-active' : ''}`}
          onClick={() => openCalendarFor('arrival')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openCalendarFor('arrival')}
          aria-label="Check-in date (Check-in time 11:00 AM)"
          title="Click to choose check-in date"
        >
          <Icon name="calendar" className="booking-ico" />
          <span className="booking-text">
            <span className="booking-label">Check-in</span>
            <span className={`booking-val ${!arrival ? 'booking-val--empty' : ''}`}>
              {arrival ? formatDateDisplay(arrival) : 'Add date'}
            </span>
            <span className="booking-sub-timing">From 11:00 AM</span>
          </span>
        </div>

        {/* 2. Check-out Field */}
        <div
          className={`booking-field ${isCalendarOpen && activeStep === 'departure' ? 'is-active' : ''}`}
          onClick={() => openCalendarFor('departure')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openCalendarFor('departure')}
          aria-label="Check-out date (Check-out time 10:00 AM)"
          title="Click to choose check-out date"
        >
          <Icon name="calendar" className="booking-ico" />
          <span className="booking-text">
            <span className="booking-label">Check-out</span>
            <span className={`booking-val ${!departure ? 'booking-val--empty' : ''}`}>
              {departure ? formatDateDisplay(departure) : 'Add date'}
            </span>
            <span className="booking-sub-timing">By 10:00 AM</span>
          </span>
        </div>

        {/* 3. Guests Selector (Max 6) */}
        <label className="booking-field booking-field--guests" title="Select number of guests (max 6)">
          <Icon name="guests" className="booking-ico" />
          <span className="booking-text">
            <span className="booking-label">Guests</span>
            <span className="booking-val">{guests} Guest{guests > 1 ? 's' : ''} ▾</span>
            <span className="booking-sub-timing">Max 6 People</span>
            <select
              className="booking-native-input"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              aria-label="Number of guests (up to 6 people)"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} Guest{n > 1 ? 's' : ''} {n === 6 ? '(Max)' : ''}
                </option>
              ))}
            </select>
          </span>
        </label>

        {/* 4. Action Button with live rate preview */}
        <div className="booking-btn-wrap">
          <button className="btn btn--primary booking-btn" type="submit">
            <span>Check Availability</span>
            <Icon name="arrow" size={16} />
          </button>
        </div>
      </form>

      {/* Inline gentle error notice (does NOT overlap external pills) */}
      {error && (
        <div className="booking-inline-error" role="alert">
          <Icon name="close" size={14} />
          <span>{error}</span>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          EXPANDABLE IN-FLOW CALENDAR DRAWER (No Clipping, No Overlap)
      ────────────────────────────────────────────────────────── */}
      {isCalendarOpen && (
        <div className="booking-calendar-drawer" role="dialog" aria-label="Interactive Date Picker">
          {/* Drawer Top Header */}
          <div className="cal-drawer-header">
            <div className="cal-drawer-title-group">
              <h4 className="cal-drawer-title">Choose Your Stay Dates</h4>
              <p className="cal-drawer-subtitle">
                Tariffs: ₹10,000 / weekday · ₹12,000 / weekend with free breakfast for up to 6 guests
              </p>
            </div>

            <button
              type="button"
              className="cal-close-btn"
              onClick={() => setIsCalendarOpen(false)}
              aria-label="Close calendar"
            >
              ✕ Close
            </button>
          </div>

          {/* Step Selection Tabs */}
          <div className="cal-tabs-row">
            <button
              type="button"
              className={`cal-tab-btn ${activeStep === 'arrival' ? 'is-active' : ''}`}
              onClick={() => setActiveStep('arrival')}
            >
              <span className="cal-tab-label">1. Check-in</span>
              <strong className="cal-tab-val">{arrival ? formatDateDisplay(arrival) : 'Select Date'}</strong>
              <small className="cal-tab-sub">11:00 AM</small>
            </button>

            <span className="cal-tab-sep">→</span>

            <button
              type="button"
              className={`cal-tab-btn ${activeStep === 'departure' ? 'is-active' : ''}`}
              onClick={() => setActiveStep('departure')}
            >
              <span className="cal-tab-label">2. Check-out</span>
              <strong className="cal-tab-val">{departure ? formatDateDisplay(departure) : 'Select Date'}</strong>
              <small className="cal-tab-sub">10:00 AM</small>
            </button>
          </div>

          {/* Quick Weekend Getaway Presets */}
          <div className="cal-presets-row">
            <button
              type="button"
              className="cal-preset-btn"
              onClick={() => selectWeekend(getUpcomingWeekend)}
            >
              ⚡ This Weekend (Sat–Sun)
            </button>
            <button
              type="button"
              className="cal-preset-btn"
              onClick={() => selectWeekend(getNextWeekend)}
            >
              ⚡ Next Weekend
            </button>
            <button
              type="button"
              className="cal-preset-btn"
              onClick={selectLongWeekend}
            >
              ⚡ Long Weekend (Fri–Mon)
            </button>
            {(arrival || departure) && (
              <button type="button" className="cal-preset-btn cal-preset-btn--clear" onClick={clearDates}>
                Clear
              </button>
            )}
          </div>

          {/* Month Bar */}
          <div className="cal-month-nav">
            <button
              type="button"
              className="cal-nav-btn"
              onClick={prevMonth}
              aria-label="Previous month"
            >
              ‹
            </button>
            <span className="cal-month-title">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button
              type="button"
              className="cal-nav-btn"
              onClick={nextMonth}
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          {/* Weekday Names Header */}
          <div className="cal-weekdays-grid">
            {WEEKDAYS.map((wd) => (
              <span key={wd} className="cal-weekday-name">
                {wd}
              </span>
            ))}
          </div>

          {/* Month Days Grid */}
          <div className="cal-days-grid">
            {daysGrid.map((item, idx) => {
              if (!item) {
                return <div key={`empty-${idx}`} className="cal-day-cell cal-day-cell--empty" />;
              }

              const isPast = item.dateStr < today;
              const isArrival = item.dateStr === arrival;
              const isDeparture = item.dateStr === departure;
              const inRange = arrival && departure && item.dateStr > arrival && item.dateStr < departure;

              let cellClass = 'cal-day-cell';
              if (isPast) cellClass += ' is-past';
              if (isArrival) cellClass += ' is-arrival';
              if (isDeparture) cellClass += ' is-departure';
              if (inRange) cellClass += ' in-range';
              if (item.isWeekend) cellClass += ' is-weekend';

              return (
                <button
                  key={item.dateStr}
                  type="button"
                  className={cellClass}
                  disabled={isPast}
                  onClick={() => handleDateClick(item.dateStr)}
                  title={`${item.dateStr} (${item.isWeekend ? '₹12k Weekend' : '₹10k Working Day'})`}
                >
                  <span className="cal-day-num">{item.day}</span>
                  {!isPast && (
                    <span className="cal-day-rate">
                      {item.isWeekend ? '₹12k' : '₹10k'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Drawer Footer with Summary and Action Button */}
          <div className="cal-drawer-footer">
            <div className="cal-footer-info">
              {breakdown ? (
                <>
                  <span className="cal-footer-duration">
                    <strong>{breakdown.nights} Night{breakdown.nights > 1 ? 's' : ''} Stay:</strong> {breakdown.formattedTotal}
                  </span>
                  <span className="cal-footer-sub">
                    ({breakdown.weekdayNights} weekday + {breakdown.weekendNights} weekend) • Free Breakfast Included
                  </span>
                </>
              ) : (
                <span className="cal-footer-prompt">
                  {arrival ? 'Now choose your departure date (by 10:00 AM)' : 'Choose your arrival date (from 11:00 AM)'}
                </span>
              )}
            </div>

            <div className="cal-footer-actions">
              {arrival && departure ? (
                <button
                  type="button"
                  className="btn btn--primary cal-confirm-btn"
                  onClick={handleSubmit}
                >
                  <span>Check Availability</span>
                  <Icon name="arrow" size={15} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--outline-teal cal-done-btn"
                  onClick={() => setIsCalendarOpen(false)}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          AVAILABILITY & TARIFF MODAL (Opens on Check Availability)
      ────────────────────────────────────────────────────────── */}
      <AvailabilityModal
        isOpen={isAvailModalOpen}
        onClose={() => setIsAvailModalOpen(false)}
        arrival={arrival}
        departure={departure}
        guests={guests}
        breakdown={breakdown}
      />
    </div>
  );
}
