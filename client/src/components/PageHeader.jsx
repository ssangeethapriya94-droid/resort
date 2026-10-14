import { Frond, TornEdge } from './Decor.jsx';

export default function PageHeader({ eyebrow, title, script, children, image }) {
  return (
    <section className={'phead' + (image ? ' phead--image' : '')}>
      {image}
      <Frond className="phead-frond" seed={7} color="#1d4d3a" />
      <div className="container phead-inner">
        {eyebrow && <p className={'eyebrow hero-rise' + (image ? ' eyebrow--light' : '')}>{eyebrow}</p>}
        <h1 className="phead-title hero-rise" style={{ '--d': '150ms' }}>
          {title} {script && <span className="script">{script}</span>}
        </h1>
        {children && <p className="phead-sub hero-rise" style={{ '--d': '300ms' }}>{children}</p>}
      </div>
      <TornEdge color="var(--sand)" className="phead-torn" />
    </section>
  );
}
