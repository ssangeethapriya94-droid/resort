import { useReveal } from '../hooks/useReveal.js';

// Wrap anything to fade/slide it in on scroll. anim: up | left | right | zoom | fade
export default function Reveal({ as: Tag = 'div', anim = 'up', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal reveal--${anim} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}
