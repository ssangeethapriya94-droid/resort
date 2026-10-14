import Img from './Img.jsx';
import Icon from './Icons.jsx';
import { WaveRipple } from './Decor.jsx';
import { waLink } from '../lib/whatsapp.js';

export function ExperienceCard({ item, isActive, onClick }) {
  const tagLower = item.tag?.toLowerCase() || '';
  const tagClass =
    tagLower === 'culture'
      ? 'exp-card-tag--culture'
      : tagLower === 'adventure'
      ? 'exp-card-tag--adventure'
      : 'exp-card-tag--cuisine';

  const iconClass =
    tagLower === 'culture'
      ? 'exp-card-ico--culture'
      : tagLower === 'adventure'
      ? 'exp-card-ico--adventure'
      : 'exp-card-ico--cuisine';

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--rx', `${-y * 10}deg`);
    card.style.setProperty('--ry', `${x * 10}deg`);
    card.style.setProperty('--spot-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--spot-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
    card.style.removeProperty('--spot-x');
    card.style.removeProperty('--spot-y');
  };

  return (
    <article
      className={`exp-card ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
    >
      {/* Top Image Frame with Floating Tag */}
      <div className="exp-card-media">
        <Img
          name={item.name}
          alt={item.alt || item.title}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="exp-card-img"
        />
        <span className={`exp-card-tag ${tagClass}`}>
          {item.tag}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="exp-card-body">
        {/* Circular Icon Badge */}
        <div className={`exp-card-icon-badge ${iconClass}`}>
          <Icon name={item.icon || 'sea'} size={22} />
        </div>

        <h3 className="exp-card-title">{item.title}</h3>
        <p className="exp-card-desc">{item.text}</p>

        {/* Bottom Link Row with Terracotta Arrow Button and Wave Doodle */}
        <div className="exp-card-footer">
          <a
            href={waLink(`Hello Sai Ranga Shores! I would like to know more about the ${item.title} experience.`)}
            target="_blank"
            rel="noreferrer"
            className="exp-card-cta"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Explore more about ${item.title}`}
          >
            <span className="exp-card-cta-btn">
              <Icon name="arrow" size={14} />
            </span>
            <span className="exp-card-cta-text">Explore More</span>
          </a>

          <div className="exp-card-wave" aria-hidden="true">
            <WaveRipple color="#7DC3E2" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function NearbyCard({ item }) {
  return (
    <article className="ncard">
      <span className="ncard-ico"><Icon name={item.icon} size={26} /></span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}
