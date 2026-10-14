import { useState, useCallback } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import Img from '../components/Img.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icons.jsx';
import { Frond, CurvedArrow } from '../components/Decor.jsx';
import { ExperienceCard, NearbyCard } from '../components/ExperienceCard.jsx';
import { EXPERIENCES, NEARBY } from '../data/site.js';

export default function Experiences() {
  const [activeIdx, setActiveIdx] = useState(1); // Featured center card active by default
  const total = EXPERIENCES.length;

  const prevCard = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  const nextCard = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  return (
    <div className="experiences-page">
      <PageHeader
        eyebrow="Local attractions"
        title="Explore Pondicherry"
        script="Beyond the Beach"
        image={
          <div className="phead-bg">
            <Img name="beach-pano" alt="" sizes="100vw" eager />
            <div className="phead-shade" />
          </div>
        }
      >
        From the shore at your doorstep to serene places around Pondicherry, discover the best experiences near Sai Ranga Shores.
      </PageHeader>

      {/* ──────────────────────────────────────────────────────────
          MAIN EXPERIENCES SECTION (MATCHING REFERENCE MOCKUP EXACTLY)
      ────────────────────────────────────────────────────────── */}
      <section className="exp-showcase-section" aria-label="Curated Experiences">
        {/* Palm Frond Illustration in Top Right Corner */}
        <Frond className="exp-bg-frond" seed={14} color="#1d4d3a" />

        <div className="container exp-showcase-container">
          {/* Header Row with Title, Handwritten Annotation, and Slider Navigation Arrows */}
          <div className="exp-showcase-header">
            <div className="exp-showcase-heading-group">
              <span className="exp-showcase-eyebrow">— EXPERIENCE —</span>
              <h2 className="exp-showcase-title">
                Moments you will <span className="script">keep</span>
              </h2>
              <p className="exp-showcase-intro">
                From peaceful beach walks to local experiences, Sai Ranga Shores is the perfect base to explore the natural beauty and culture of the region.
              </p>
            </div>

            <div className="exp-showcase-actions">
              {/* Handwritten "Explore More" note with curved arrow pointing to cards */}
              <div className="exp-handwritten-note" aria-hidden="true">
                <span className="exp-handwritten-text">Explore<br />More</span>
                <CurvedArrow className="exp-curved-arrow" />
              </div>

              {/* Slider Navigation Arrow Buttons */}
              <div className="exp-nav-arrows">
                <button
                  type="button"
                  className="exp-arrow-btn exp-arrow-btn--prev"
                  onClick={prevCard}
                  aria-label="Previous experience"
                >
                  <Icon name="chevron-left" size={18} />
                </button>
                <button
                  type="button"
                  className="exp-arrow-btn exp-arrow-btn--next"
                  onClick={nextCard}
                  aria-label="Next experience"
                >
                  <Icon name="chevron-right" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* 3 Interactive Experience Cards */}
          <div className="exp-cards-row">
            {EXPERIENCES.map((item, idx) => (
              <ExperienceCard
                key={item.id || item.title}
                item={item}
                isActive={idx === activeIdx}
                onClick={() => setActiveIdx(idx)}
              />
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="exp-pagination-dots" role="tablist" aria-label="Experience slider navigation">
            {EXPERIENCES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === activeIdx}
                className={`exp-dot ${idx === activeIdx ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Go to experience ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Worth the Drive Section */}
      <section className="section section--tint">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Around Pondicherry</p>
            <h2>Worth the <span className="script">drive</span></h2>
          </Reveal>
          <div className="ngrid">
            {NEARBY.map((n, i) => (
              <Reveal key={n.title} delay={i * 90}>
                <NearbyCard item={n} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
