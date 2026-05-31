import { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinkStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  letterSpacing: '0.06em',
  color: '#1a1a1a',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'color 0.2s'
};

const Header = ({ logoSrc }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections/all?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const leftNavItems = [
    { label: 'Women', to: '/collections/women' },
    { label: 'Men', to: '/collections/men' },
    { label: 'Travel', to: '/collections/travel' },
    { label: 'Accessories', to: '/collections/accessories' }
  ];

  const rightNavItems = [
    { label: 'Collection', to: '/collections/all' },
    { label: 'Gifts', to: '/collections/accessories' }
  ];

  return (
    <>
      <header
        className={`w-full bg-white transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-[100] shadow-sm' : 'relative z-[100]'}`}
        style={{ borderBottom: '1px solid #e5e5e5' }}
      >
        <div
          className="flex items-center justify-between px-6 lg:px-12"
          style={{ minHeight: '80px', paddingTop: '16px', paddingBottom: '16px' }}
        >
          <nav className="hidden md:flex items-center gap-8">
            {leftNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="hover:text-[#5a3e2b] transition-colors duration-200"
                style={navLinkStyle}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1 flex justify-center items-center">
            <Link to="/">
              <img
                src={logoSrc}
                alt="Wineskin"
                style={{ height: '44px', width: 'auto', display: 'block' }}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {rightNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="hover:text-[#5a3e2b] transition-colors duration-200"
                style={navLinkStyle}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 ml-4">
              <button
                className="hover:text-[#5a3e2b] transition-colors duration-200"
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <Link to="/wishlist" className="relative hover:text-[#5a3e2b] transition-colors duration-200" aria-label="Wishlist">
                <Heart size={20} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center" style={{ width: '16px', height: '16px', fontSize: '9px', fontFamily: 'sans-serif' }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative hover:text-[#5a3e2b] transition-colors duration-200" aria-label="Cart">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center" style={{ width: '16px', height: '16px', fontSize: '9px', fontFamily: 'sans-serif' }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                className="hover:text-[#5a3e2b] transition-colors duration-200"
                aria-label="Menu"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <button className="md:hidden hover:text-[#5a3e2b] transition-colors" aria-label="Menu" onClick={() => setDrawerOpen(true)}>
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>

        {searchOpen && (
          <div className="w-full border-t border-[#e5e5e5] bg-white" style={{ padding: '12px 48px' }}>
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 max-w-2xl mx-auto">
              <Search size={18} strokeWidth={1.5} color="#888" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 outline-none bg-transparent"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: '#1a1a1a', letterSpacing: '0.04em' }}
              />
              <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="hover:opacity-60">
                <X size={18} strokeWidth={1.5} color="#888" />
              </button>
            </form>
          </div>
        )}
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-[200] flex">
          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setDrawerOpen(false)} />
          <div className="w-80 bg-white h-full flex flex-col shadow-xl" style={{ padding: '40px 32px' }}>
            <div className="flex justify-between items-center mb-10">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#1a1a1a', letterSpacing: '0.05em' }}>Menu</span>
              <button onClick={() => setDrawerOpen(false)} className="hover:opacity-60">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {[...leftNavItems, ...rightNavItems].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setDrawerOpen(false)}
                  className="hover:text-[#5a3e2b] transition-colors duration-200"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', letterSpacing: '0.06em', color: '#1a1a1a', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
              ))}
              <hr style={{ borderColor: '#e5e5e5', margin: '8px 0' }} />
              <Link to="/about" onClick={() => setDrawerOpen(false)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', letterSpacing: '0.06em', color: '#888', textDecoration: 'none' }}>About</Link>
              <Link to="/contact" onClick={() => setDrawerOpen(false)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', letterSpacing: '0.06em', color: '#888', textDecoration: 'none' }}>Contact</Link>
            </nav>
            <div className="mt-auto flex items-center gap-6">
              <Link to="/wishlist" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 hover:opacity-70" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#555', textDecoration: 'none' }}>
                <Heart size={18} strokeWidth={1.5} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link to="/cart" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 hover:opacity-70" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', color: '#555', textDecoration: 'none' }}>
                <ShoppingBag size={18} strokeWidth={1.5} /> Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
