import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import SectionHeading from './components/SectionHeading.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import Logo from './assets/logo.png';

const CollectionPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <AnnouncementBar />
      <Header logoSrc={Logo} />
      <HeroBanner />
      <SectionHeading />
      <ProductGrid />
    </div>
  );
};

export default CollectionPage;
