import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Footer from '../components/Footer';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductPage = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#888' }}>Product not found.</p>
        <Link to="/" style={{ marginTop: '16px', fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: '#5a3e2b' }}>← Back to Home</Link>
      </div>
    );
  }

  const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize });
    addToast(`${product.name} added to cart`, 'success');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    addToast(wishlisted ? 'Removed from wishlist' : `${product.name} added to wishlist`, wishlisted ? 'info' : 'success');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div className="px-6 lg:px-16 py-8">
        <Link
          to={`/collections/${product.category}`}
          className="inline-flex items-center gap-2 hover:opacity-60 transition-opacity mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', letterSpacing: '0.08em', color: '#888', textDecoration: 'none', textTransform: 'uppercase' }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to {product.category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div
            className="w-full flex items-center justify-center"
            style={{ aspectRatio: '1/1', backgroundColor: '#e8e4df' }}
          >
            {product.image && product.image !== '/placeholder.jpg' ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span style={{ color: '#aaa', fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', letterSpacing: '0.08em' }}>
                {product.name}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', letterSpacing: '0.16em', color: '#888', textTransform: 'uppercase', marginBottom: '12px' }}>
              {product.category}
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '12px' }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: '#1a1a1a', marginBottom: '28px' }}>
              {formattedPrice}
            </p>

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#555', lineHeight: 1.7, marginBottom: '32px' }}>
              {product.description}
            </p>

            <div className="mb-8">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>
                Select Size
              </p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '48px',
                      height: '48px',
                      border: selectedSize === size ? '1px solid #1a1a1a' : '1px solid #ccc',
                      backgroundColor: selectedSize === size ? '#1a1a1a' : 'transparent',
                      color: selectedSize === size ? 'white' : '#1a1a1a',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 transition-colors duration-200 mb-4"
              style={{
                backgroundColor: '#1a1a1a',
                color: 'white',
                border: 'none',
                padding: '16px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className="w-full flex items-center justify-center gap-3 transition-colors duration-200"
              style={{
                backgroundColor: 'transparent',
                color: wishlisted ? '#5a3e2b' : '#1a1a1a',
                border: `1px solid ${wishlisted ? '#5a3e2b' : '#ccc'}`,
                padding: '14px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '13px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Heart size={16} strokeWidth={1.5} fill={wishlisted ? '#5a3e2b' : 'none'} />
              {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
