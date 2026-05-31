import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ id, name, price, category, image }) => {
  const [hovered, setHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isWishlisted(id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ id, name, price, category, image });
    addToast(wishlisted ? `Removed from wishlist` : `Added to wishlist`, wishlisted ? 'info' : 'success');
  };

  const formattedPrice = typeof price === 'number'
    ? `₹${price.toLocaleString('en-IN')}`
    : price;

  return (
    <Link
      to={`/product/${id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1 / 1', backgroundColor: '#e8e4df' }}
      >
        {image && image !== '/placeholder.jpg' ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
            style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
          >
            <span style={{ color: '#aaa', fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', letterSpacing: '0.08em' }}>
              {name}
            </span>
          </div>
        )}

        <button
          onClick={handleWishlist}
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            padding: '12px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '12px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: wishlisted ? '#5a3e2b' : '#1a1a1a',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            fill={wishlisted ? '#5a3e2b' : 'none'}
            color={wishlisted ? '#5a3e2b' : '#1a1a1a'}
          />
          {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </button>
      </div>

      <div className="mt-4 text-center">
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '15px',
            color: '#1a1a1a',
            marginBottom: '4px',
            fontWeight: 400
          }}
        >
          {name}
        </h3>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: '#888' }}>
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
