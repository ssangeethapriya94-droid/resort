import PageHeader from '../components/PageHeader.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';

export default function Gallery() {
  return (
    <div className="gallery-page">
      <PageHeader eyebrow="Visual Journey" title="Moments" script="That Stay Forever">
        Explore the authentic coastal beauty, sea-view suites, sunrise horizons, and vibrant atmosphere of Sai Ranga Shores through our real resort photo gallery.
      </PageHeader>

      <section className="gallery-main-section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
