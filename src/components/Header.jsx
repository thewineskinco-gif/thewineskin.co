import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';

const Header = ({ logoSrc }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavItems = ['Women', 'Men', 'Travel', 'Accessories'];
  const rightNavItems = ['Collection', 'Gifts'];

  return (
    <header 
      className={`w-full bg-white transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-sm' : 'relative'}`}
      style={{ borderBottom: '1px solid #e5e5e5' }}
    >
      <div className="flex items-center justify-between px-6 lg:px-12" style={{ minHeight: '80px', paddingTop: '16px', paddingBottom: '16px' }}>
        <nav className="hidden md:flex items-center gap-8">
          {leftNavItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm hover:opacity-60 transition-opacity"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.05em',
                color: '#1a1a1a'
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex-1 flex justify-center items-center">
          <img 
            src={logoSrc} 
            alt="Wineskin" 
            style={{ height: '44px', width: 'auto', display: 'block' }}
          />
        </div>

        <div className="hidden md:flex items-center gap-6">
          {rightNavItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm hover:opacity-60 transition-opacity"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.05em',
                color: '#1a1a1a'
              }}
            >
              {item}
            </a>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <button className="hover:opacity-60 transition-opacity" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:opacity-60 transition-opacity" aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:opacity-60 transition-opacity" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:opacity-60 transition-opacity" aria-label="Menu">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <button className="md:hidden" aria-label="Menu">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default Header;
