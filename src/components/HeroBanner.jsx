import { Link } from 'react-router-dom';

const HeroBanner = ({ backgroundImage, tagline, headline, ctaText, ctaLink }) => {
  return (
    <section
      className="relative w-full flex items-end"
      style={{
        minHeight: '75vh',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: backgroundImage ? 'transparent' : '#2c2c2c',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }}
      />

      <div className="relative z-10 w-full px-8 lg:px-16 pb-16 lg:pb-24">
        <div className="max-w-3xl">
          {tagline && (
            <p
              className="mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 400,
                fontSize: '18px'
              }}
            >
              {tagline}
            </p>
          )}
          <h1
            className="font-bold text-white uppercase leading-none mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(40px, 8vw, 72px)'
            }}
          >
            {headline || 'JACKET SEASON'}
          </h1>
          {ctaText && ctaLink && (
            <Link
              to={ctaLink}
              className="inline-block group"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '13px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.7)',
                padding: '14px 36px',
                textDecoration: 'none',
                transition: 'background 0.25s, color 0.25s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#1a1a1a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
