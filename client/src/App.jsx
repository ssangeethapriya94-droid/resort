import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Stay from './pages/Stay.jsx';
import Experiences from './pages/Experiences.jsx';
import Gallery from './pages/Gallery.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

const TITLES = {
  '/': 'Sai Ranga Shores Beach Home | Dancing with waves, near Pondicherry',
  '/stay': 'Stay | Sai Ranga Shores Beach Home',
  '/experiences': 'Experiences | Sai Ranga Shores Beach Home',
  '/gallery': 'Gallery | Sai Ranga Shores Beach Home',
  '/about': 'About Us | Sai Ranga Shores Beach Home',
  '/contact': 'Contact & Booking | Sai Ranga Shores Beach Home',
};

function NotFound() {
  return (
    <section className="section container" style={{ textAlign: 'center', paddingTop: '9rem' }}>
      <h1>Page not found</h1>
      <p>That page drifted out to sea.</p>
      <a className="btn btn--primary" href="/">Back to home</a>
    </section>
  );
}

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    document.title = TITLES[pathname] || TITLES['/'];
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
