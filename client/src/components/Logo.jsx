import { SITE } from '../data/site.js';

// Placeholder wave-mark logo. Swap for the client's real logo by replacing this component
// with <img src="/logo.svg" alt="..." />.
// Official Sai Ranga Shores Beach Home brand logo
export function LogoMark({ size = 48, className = '' }) {
  return (
    <picture>
      <source srcSet="/img/logo-mark.webp" type="image/webp" />
      <img
        src="/img/logo-mark.png"
        alt="Sai Ranga Shores Emblem"
        width={size}
        height={size}
        className={`logo-mark-img ${className}`}
        loading="eager"
      />
    </picture>
  );
}

export default function Logo({ light = false, className = '' }) {
  if (light) {
    return (
      <div className={`footer-logo-badge ${className}`}>
        <picture>
          <source srcSet="/img/logo.webp" type="image/webp" />
          <img
            src="/img/logo.png"
            alt="Sai Ranga Shores Beach Home"
            className="logo-img logo-img--footer"
            loading="lazy"
          />
        </picture>
      </div>
    );
  }

  return (
    <span className={`logo ${className}`}>
      <picture>
        <source srcSet="/img/logo.webp" type="image/webp" />
        <img
          src="/img/logo.png"
          alt="Sai Ranga Shores Beach Home"
          className="logo-img logo-img--nav"
          loading="eager"
        />
      </picture>
    </span>
  );
}
