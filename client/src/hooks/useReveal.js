import { useEffect, useRef } from 'react';

// Adds the class "in" when the element scrolls into view (CSS handles the animation).
export function useReveal(options = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
