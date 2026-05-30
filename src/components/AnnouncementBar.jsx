const AnnouncementBar = () => {
  return (
    <div 
      className="w-full text-center px-4 flex justify-between items-center"
      style={{ backgroundColor: '#f0f0f0', minHeight: '38px', height: '38px' }}
    >
      <div className="flex-1" />
      <p 
        className="uppercase"
        style={{ 
          color: '#555',
          fontSize: '11px',
          letterSpacing: '0.12em',
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: 1
        }}
      >
        FREE SHIPPING ON ORDERS ABOVE ₹5000 · EXCLUSIVE BESPOKE TAILORING
      </p>
      <div className="flex-1 flex justify-end gap-4">
        <a 
          href="#" 
          className="uppercase hover:opacity-70 transition-opacity"
          style={{ 
            color: '#555',
            fontSize: '11px',
            letterSpacing: '0.12em',
            fontFamily: "'Cormorant Garamond', serif"
          }}
        >
          Store Locator
        </a>
        <span style={{ color: '#ccc' }}>|</span>
        <a 
          href="#" 
          className="uppercase hover:opacity-70 transition-opacity"
          style={{ 
            color: '#555',
            fontSize: '11px',
            letterSpacing: '0.12em',
            fontFamily: "'Cormorant Garamond', serif"
          }}
        >
          My Account
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBar;
