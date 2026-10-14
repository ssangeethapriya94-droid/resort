import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icons.jsx';
import { NAV } from '../data/site.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav-inner glass">
        <Link to="/" className="nav-logo" aria-label="Sai Ranga Shores Beach Home, home">
          <Logo />
        </Link>
        <nav className="nav-links" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => 'nav-link' + (isActive ? ' is-active' : '')}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" className="btn btn--primary nav-cta">
          Book Now <Icon name="arrow" size={16} />
        </Link>
        <button className="nav-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
      <div id="mobile-menu" className="nav-drawer glass" hidden={!open}>
        {NAV.map((n, i) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => 'drawer-link' + (isActive ? ' is-active' : '')} style={{ '--i': i }}>
            {n.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn--primary" style={{ '--i': NAV.length }}>
          Book Now <Icon name="arrow" size={16} />
        </Link>
      </div>
    </header>
  );
}
