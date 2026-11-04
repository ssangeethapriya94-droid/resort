import PageHeader from '../components/PageHeader.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';

export default function Gallery() {
  return (
    <div className="gallery-page">
      <PageHeader
        eyebrow="Visual Journey"
        title="Sai Ranga Shores Photos"
        script="&amp; Beach Gallery"
      >
        Explore real Sai Ranga Shores photos in our gallery, located near Pondicherry on ECR (40 kms before Pondicherry, a drive of 45 minutes to 1 hour depending on traffic and speed). Discover sea view room photos, breathtaking golden sunrise views, coastal surf, and panoramic 360° observation tower vistas overlooking the Bay of Bengal.
      </PageHeader>

      <section className="gallery-main-section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
