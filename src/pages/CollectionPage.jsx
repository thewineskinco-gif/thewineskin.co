import { useParams } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { products, getProductsByCategory } from '../data/products';

const categoryMeta = {
  women: { label: 'Women', tagline: 'For the modern woman' },
  men: { label: 'Men', tagline: 'Crafted for distinction' },
  travel: { label: 'Travel', tagline: 'Journey in style' },
  accessories: { label: 'Accessories', tagline: 'The finishing touch' },
  all: { label: 'All Collections', tagline: 'The full range' },
  jackets: { label: 'Jackets', tagline: "It's jacket season" }
};

const CollectionPage = () => {
  const { category } = useParams();
  const key = (category || 'all').toLowerCase();
  const meta = categoryMeta[key] || { label: category, tagline: '' };

  const items = key === 'all' ? products : getProductsByCategory(key);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <HeroBanner
        tagline={meta.tagline}
        headline={meta.label.toUpperCase()}
        ctaText="View All"
        ctaLink={`/collections/${key}`}
      />

      <ProductGrid
        products={items}
        heading={meta.label}
        description={items.length === 0 ? undefined : `${items.length} pieces`}
      />

      {items.length === 0 && (
        <div className="text-center py-24">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#888' }}>
            No products found in this collection.
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CollectionPage;
