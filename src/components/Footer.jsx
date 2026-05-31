import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

const colHeadingStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '12px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#1a1a1a',
  marginBottom: '20px',
  fontWeight: 600
};

const linkStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '15px',
  letterSpacing: '0.04em',
  color: '#555',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '10px',
  transition: 'color 0.2s'
};

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.563 0-2.387-1.716-4.056-4.164-4.056-2.837 0-4.502 2.128-4.502 4.328 0 .857.33 1.775.741 2.277a.3.3 0 0 1 .069.285c-.076.315-.246 1.002-.279 1.14-.044.184-.147.223-.34.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer style={{ backgroundColor: '#f5f0eb', paddingTop: '60px', paddingBottom: '40px' }}>
      <div className="px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <p style={colHeadingStyle}>My Account</p>
            {['Profile', 'Track Order', 'My Order', 'Return Order'].map((item) => (
              <a key={item} href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#5a3e2b'} onMouseLeave={(e) => e.target.style.color = '#555'}>{item}</a>
            ))}
          </div>

          <div>
            <p style={colHeadingStyle}>Explore</p>
            <Link to="/about" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#5a3e2b'} onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>About Us</Link>
            {['Our Story', 'Sustainability', 'Craftsmanship'].map((item) => (
              <a key={item} href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#5a3e2b'} onMouseLeave={(e) => e.target.style.color = '#555'}>{item}</a>
            ))}
            <Link to="/contact" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#5a3e2b'} onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>Contact Us</Link>
          </div>

          <div>
            <p style={colHeadingStyle}>Quick Links</p>
            {['Store Locator', 'Careers', 'Shipping Policy', 'Returns & Exchanges', 'FAQ'].map((item) => (
              <a key={item} href="#" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#5a3e2b'} onMouseLeave={(e) => e.target.style.color = '#555'}>{item}</a>
            ))}
          </div>

          <div>
            <p style={colHeadingStyle}>Newsletter</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: '#666', marginBottom: '20px', lineHeight: 1.6 }}>
              Stay updated on new collections and exclusive launches.
            </p>
            <form onSubmit={handleNewsletter} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '14px',
                  backgroundColor: 'white',
                  color: '#1a1a1a'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: '1px solid #ddd6ce' }}>
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Follow us
            </span>
            {[
              { icon: <Facebook size={16} strokeWidth={1.5} />, label: 'Facebook' },
              { icon: <Instagram size={16} strokeWidth={1.5} />, label: 'Instagram' },
              { icon: <PinterestIcon />, label: 'Pinterest' },
              { icon: <Youtube size={16} strokeWidth={1.5} />, label: 'YouTube' },
              { icon: <Linkedin size={16} strokeWidth={1.5} />, label: 'LinkedIn' }
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="hover:border-[#5a3e2b] hover:text-[#5a3e2b] transition-colors duration-200"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  border: '1px solid #bbb',
                  color: '#666'
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            All rights reserved 2026 © THE BESPOKE MASTER
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
