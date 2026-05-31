import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div
        className="w-full flex items-center justify-center"
        style={{ minHeight: '40vh', backgroundColor: '#1a1a1a' }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 6vw, 60px)',
            fontWeight: 400,
            color: 'white',
            letterSpacing: '0.08em'
          }}
        >
          OUR STORY
        </h1>
      </div>

      <div className="px-6 lg:px-32 py-20 max-w-4xl mx-auto">
        <p
          className="mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '20px',
            color: '#1a1a1a',
            lineHeight: 1.8,
            fontStyle: 'italic'
          }}
        >
          Wineskin was born from a belief that the finest leather goods should carry not just aesthetic value, but a story — a legacy of hands, time, and craft.
        </p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#555', lineHeight: 1.8, marginBottom: '24px' }}>
          Founded in 2018, we set out to create leather jackets, bags, and accessories that age like fine wine — deepening in character with every wear. Our artisans draw from generations of traditional techniques, marrying them with modern silhouettes for the discerning individual.
        </p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#555', lineHeight: 1.8, marginBottom: '24px' }}>
          Every piece is made to order in our Jaipur atelier, using only full-grain and vegetable-tanned leathers sourced from tanneries that uphold ethical and sustainable practices. We believe in slow fashion — pieces that outlast trends and become part of your personal history.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
          style={{ borderTop: '1px solid #e5e5e5', paddingTop: '48px' }}
        >
          {[
            { number: '6+', label: 'Years of Craft' },
            { number: '1200+', label: 'Pieces Crafted' },
            { number: '100%', label: 'Ethically Sourced' }
          ].map(({ number, label }) => (
            <div key={label} className="text-center">
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px' }}>{number}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
