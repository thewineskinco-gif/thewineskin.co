const SectionHeading = () => {
  return (
    <section 
      className="w-full flex flex-col items-center justify-center py-16 lg:py-20 px-6"
      style={{ backgroundColor: '#ffffff' }}
    >
      <h2 
        className="text-3xl lg:text-4xl text-center mb-6"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          fontWeight: 400,
          color: '#1a1a1a'
        }}
      >
        Jackets
      </h2>
      <p 
        className="text-base lg:text-lg text-center max-w-[600px]"
        style={{ 
          fontFamily: "'Cormorant Garamond', serif",
          color: '#555',
          lineHeight: '1.8'
        }}
      >
        Handcrafted from our finest full-grain leather, each piece is built to age beautifully — warm, effortless, and made to outlast every season.
      </p>
    </section>
  );
};

export default SectionHeading;
