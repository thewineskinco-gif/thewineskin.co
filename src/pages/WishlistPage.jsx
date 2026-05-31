import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const WishlistPage = () => {
  const { items } = useWishlist();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div className="px-6 lg:px-16 py-12">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px' }}>
          Wishlist
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#888', marginBottom: '40px' }}>
          {items.length} {items.length === 1 ? 'item' : 'items'} saved
        </p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Heart size={48} strokeWidth={1} color="#ccc" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 400, color: '#1a1a1a', margin: '20px 0 10px' }}>
              Your wishlist is empty
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#888', marginBottom: '28px' }}>
              Save pieces you love and come back to them anytime.
            </p>
            <Link
              to="/collections/all"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'white',
                backgroundColor: '#1a1a1a',
                padding: '14px 36px',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {items.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;
