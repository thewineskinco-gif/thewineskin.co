import { useState } from 'react';
import { X } from 'lucide-react';

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const linkStyle = {
    color: '#555',
    fontSize: '11px',
    letterSpacing: '0.12em',
    fontFamily: "'Cormorant Garamond', serif"
  };

  return (
    <div
      className="w-full px-4 flex justify-between items-center"
      style={{ backgroundColor: '#f0f0f0', minHeight: '38px', height: '38px' }}
    >
      <div className="flex-1" />
      <p className="uppercase" style={{ color: '#555', fontSize: '11px', letterSpacing: '0.12em', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>
        FREE SHIPPING ON ORDERS ABOVE ₹5000 · EXCLUSIVE BESPOKE TAILORING
      </p>
      <div className="flex-1 flex justify-end items-center gap-4">
        <a href="#" className="uppercase hover:opacity-70 transition-opacity" style={linkStyle}>Store Locator</a>
        <span style={{ color: '#ccc' }}>|</span>
        <a href="#" className="uppercase hover:opacity-70 transition-opacity" style={linkStyle}>My Account</a>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 hover:opacity-60 transition-opacity flex items-center"
          aria-label="Dismiss"
        >
          <X size={13} color="#888" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
