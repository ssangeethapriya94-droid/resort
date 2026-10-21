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
        Explore real Sai Ranga Shores photos in our beachfront resort Pondicherry gallery. Discover sea view room photos, breathtaking Pondicherry sunrise photos, coastal waves, and panoramic 360° observation tower views overlooking the Bay of Bengal.
      </PageHeader>

      <section className="gallery-main-section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
