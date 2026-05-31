import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { products } from '../data/products';

const categories = [
  { label: 'Women', slug: 'women', bg: '#d6cec7' },
  { label: 'Men', slug: 'men', bg: '#c9c0b6' },
  { label: 'Travel', slug: 'travel', bg: '#bfb5aa' },
  { label: 'Accessories', slug: 'accessories', bg: '#b5aa9f' }
];

const HomePage = () => {
  const featured = products.slice(0, 6);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <HeroBanner
        tagline="It's officially"
        headline="JACKET SEASON"
        ctaText="Shop Now"
        ctaLink="/collections/women"
      />

      <section className="w-full px-6 lg:px-16 py-16">
        <div className="text-center mb-10">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px' }}>
            Shop by Category
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#888', letterSpacing: '0.04em' }}>
            Discover our curated collections
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/collections/${cat.slug}`}
              className="group block"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="relative overflow-hidden flex items-end"
                style={{ aspectRatio: '3/4', backgroundColor: cat.bg }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)', opacity: 0.8 }}
                />
                <div className="relative z-10 w-full p-6">
                  <p
                    className="text-white font-medium transition-opacity group-hover:opacity-80"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 500 }}
                  >
                    {cat.label}
                  </p>
                  <p
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: '4px' }}
                  >
                    Shop Now →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProductGrid
        products={featured}
        heading="Featured Pieces"
        description="Handcrafted leather goods built to last a lifetime."
      />

      <Footer />
    </div>
  );
};

export default HomePage;
