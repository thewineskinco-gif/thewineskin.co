import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Footer from '../components/Footer';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { addToast } = useToast();

  const shipping = cartTotal > 5000 ? 0 : 299;
  const total = cartTotal + shipping;

  const handleRemove = (item) => {
    removeFromCart(item.id);
    addToast(`${item.name} removed from cart`, 'info');
  };

  const handleCheckout = () => {
    addToast('Checkout coming soon!', 'info');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff' }}>
        <div className="flex-1 flex flex-col items-center justify-center py-24 px-6">
          <ShoppingBag size={48} strokeWidth={1} color="#ccc" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a', margin: '20px 0 10px' }}>
            Your cart is empty
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#888', marginBottom: '28px' }}>
            Discover our collections and find something you love.
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
            Shop Collections
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div className="px-6 lg:px-16 py-12">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '40px' }}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div style={{ borderTop: '1px solid #e5e5e5' }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 py-6" style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: '100px', height: '100px', backgroundColor: '#e8e4df' }}
                  >
                    {item.image && item.image !== '/placeholder.jpg' ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span style={{ color: '#aaa', fontFamily: "'Cormorant Garamond', serif", fontSize: '10px', textAlign: 'center', padding: '4px' }}>{item.name}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 400, color: '#1a1a1a', marginBottom: '4px' }}>{item.name}</h3>
                        {item.selectedSize && (
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#888', marginBottom: '12px' }}>Size: {item.selectedSize}</p>
                        )}
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#1a1a1a' }}>
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <button onClick={() => handleRemove(item)} className="hover:opacity-60 transition-opacity ml-4">
                        <X size={18} strokeWidth={1.5} color="#888" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex items-center justify-center hover:opacity-60 transition-opacity"
                        style={{ width: '32px', height: '32px', border: '1px solid #ccc' }}
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex items-center justify-center hover:opacity-60 transition-opacity"
                        style={{ width: '32px', height: '32px', border: '1px solid #ccc' }}
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div style={{ backgroundColor: '#f9f7f5', padding: '28px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 400, color: '#1a1a1a', marginBottom: '24px' }}>Order Summary</h2>

              <div className="flex justify-between mb-3">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#555' }}>Subtotal</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#1a1a1a' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#555' }}>Shipping</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: shipping === 0 ? '#3a7d44' : '#1a1a1a' }}>
                  {shipping === 0 ? 'Free' : `₹${shipping}`}
                </span>
              </div>

              <div style={{ borderTop: '1px solid #ddd', paddingTop: '16px', marginBottom: '24px' }}>
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#1a1a1a' }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#1a1a1a' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full transition-colors duration-200"
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
                Proceed to Checkout
              </button>

              {shipping > 0 && (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#888', textAlign: 'center', marginTop: '12px' }}>
                  Add ₹{(5000 - cartTotal).toLocaleString('en-IN')} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
