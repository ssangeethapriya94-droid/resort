import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_PAGES } from '../data/seoData.js';

function setOrUpdateMeta(attribute, nameOrProp, content) {
  let element = document.querySelector(`meta[${attribute}="${nameOrProp}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, nameOrProp);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setOrUpdateCanonical(url) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function setOrUpdateSchema(schemaObj) {
  let element = document.getElementById('schema-page-jsonld');
  if (!element) {
    element = document.createElement('script');
    element.id = 'schema-page-jsonld';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(schemaObj);
}

export default function SEO({ customConfig }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const config = customConfig || SEO_PAGES[pathname] || SEO_PAGES['/'];

    // 1. Document Title
    document.title = config.title;

    // 2. Meta Description & Robots
    setOrUpdateMeta('name', 'description', config.description);
    setOrUpdateMeta(
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 3. Canonical Link
    setOrUpdateCanonical(config.canonical);

    // 4. Open Graph Tags
    setOrUpdateMeta('property', 'og:title', config.title);
    setOrUpdateMeta('property', 'og:description', config.description);
    setOrUpdateMeta('property', 'og:url', config.canonical);
    setOrUpdateMeta('property', 'og:type', config.ogType || 'website');
    setOrUpdateMeta('property', 'og:image', config.ogImage);
    setOrUpdateMeta('property', 'og:site_name', 'Sai Ranga Shores Beach Home');
    setOrUpdateMeta('property', 'og:locale', 'en_US');

    // 5. Twitter Card Tags
    setOrUpdateMeta('name', 'twitter:card', 'summary_large_image');
    setOrUpdateMeta('name', 'twitter:title', config.title);
    setOrUpdateMeta('name', 'twitter:description', config.description);
    setOrUpdateMeta('name', 'twitter:image', config.ogImage);

    // 6. Schema.org Structured Data
    if (config.schema) {
      setOrUpdateSchema(config.schema);
    }
  }, [pathname, customConfig]);

  return null;
}
