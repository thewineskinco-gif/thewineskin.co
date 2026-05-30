const HeroBanner = ({ heroImage }) => {
  return (
    <section 
      className="relative w-full min-h-[75vh] flex items-end"
      style={{
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundColor: heroImage ? 'transparent' : '#2c2c2c',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)'
        }}
      />
      
      <div className="relative z-10 w-full px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-4xl">
          <p 
            className="text-lg lg:text-xl italic mb-3"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 400
            }}
          >
            It&apos;s officially
          </p>
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white uppercase leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            JACKET SEASON
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
